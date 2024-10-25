const API_KEY = "o0eeyrS8FrE2wSn75ykZhfRUkmuHjcBm0KpnfTn67y7PcE99dZdek3ZD";
const BASE_URL = "https://api.pexels.com/v1";
const searchImages = async (query, perPage = 10) => {
    try {
        const response = await fetch(`${BASE_URL}/search?query=${query}&per_page=${perPage}`, {
            headers: { Authorization: API_KEY }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch images.");
        }
        const data = await response.json();
        return data.photos;
    }
    catch (error) {
        console.error(error);
        return [];
    }
};
const show1hinhanh = (item) => {
    return `
    <img src="${item.src.medium}" alt="${item.photographer}">
    `;
};
export const showlisthinhanh = async (query, per_page = 5) => {
    try {
        const data = await searchImages(query, per_page);
        const api = data.map(show1hinhanh);
        document.getElementById("imageGallery").innerHTML = api.join("");
    }
    catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
};
export const showrandom = async (per_page = 5) => {
    try {
        const data = await getRandomImages(per_page);
        const api = data.map(show1hinhanh);
        document.getElementById("imageGallery").innerHTML = api.join("");
    }
    catch (error) {
        console.error("Error fetching images:", error);
        return [];
    }
};
export const getRandomImages = async (perPage = 10) => {
    try {
        const response = await fetch(`${BASE_URL}/curated?per_page=${perPage}`, {
            headers: { Authorization: API_KEY }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch random images.");
        }
        const data = await response.json();
        return data.photos;
    }
    catch (error) {
        console.error(error);
        return [];
    }
};
