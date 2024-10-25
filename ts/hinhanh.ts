

const API_KEY = "o0eeyrS8FrE2wSn75ykZhfRUkmuHjcBm0KpnfTn67y7PcE99dZdek3ZD"; 
const BASE_URL = "https://api.pexels.com/v1";


interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

interface ApiResponse {
  photos: Photo[];
  total_results: number;
  page: number;
  per_page: number;
  next_page: string;
}

const searchImages = async (query: string, perPage: number = 10): Promise<Photo[]> => {
  try {
        const response = await fetch(`${BASE_URL}/search?query=${query}&per_page=${perPage}`, {
            headers: { Authorization: API_KEY }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch images.");
        }
        const data = await (response.json() as Promise<ApiResponse>);
        return data.photos;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const show1hinhanh = (item:Photo) =>{
    return`
    <img src="${item.src.medium}" alt="${item.photographer}">
    `;
}

export const showlisthinhanh = async (query: string, per_page: number = 5) => {
    try {
        const data = await searchImages(query, per_page);  
        const api = data.map(show1hinhanh);  
        document.getElementById("imageGallery").innerHTML = api.join("");
    } catch (error) {
        console.error("Error fetching images:", error);
        return []; 
    }
};

export const showrandom = async (per_page: number = 5) => {
    try {
        const data = await getRandomImages(per_page);  
        const api = data.map(show1hinhanh);  
        document.getElementById("imageGallery").innerHTML = api.join("");
    } catch (error) {
        console.error("Error fetching images:", error);
        return []; 
    }
};




export const getRandomImages = async (perPage: number = 10): Promise<Photo[]> => {
  try {
        const response = await fetch(`${BASE_URL}/curated?per_page=${perPage}`, {
            headers: { Authorization: API_KEY }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch random images.");
        }
        const data = await (response.json() as Promise<ApiResponse>);
        return data.photos;
    } catch (error) {
        console.error(error);
        return [];
    }
};
