import { TThuCung, TPhuKien, TMenuItem, TThucAn, CartItem, HistoryCart } from './data2.js'
import { thucung_arr, menuitem_arr, phukien_arr, thucan_arr } from './data2.js'



const hien1ThuCung = (pet: TThuCung) => {
    return `
    <div class="sanpham" >
    <a href="#" >
        <div class="image-container" >
            <img src="${pet.anh}" alt = "" >
            <button class="buy-button" > Mua ngay </button>
        </div>
    </a>
        <div class="info" data-type="${pet.loai}">
            <span>ID: ${pet.id}</span>
            <span> ${pet.ten} </span>
            <span> ${pet.gia.toLocaleString('vi')}đ</span>
        </div>
    </div>
    `;
}

const show1menu = (item: TMenuItem) => {
    return `
        <a href="#${item.url}">
            <li class="menu-item">${item.ten}</li>
        </a>
        `;
}
const show1phukien = (pk: TPhuKien) => {
    return `
    <div class="sanpham" >
    <a href="#" >
        <div class="image-container" >
            <img src="${pk.anh}" alt = "" >
            <button class="buy-button" > Mua ngay </button>
        </div>
    </a>
        <div class="info" data-type="${pk.loai}">
            <span>ID: ${pk.id}</span>
            <span> ${pk.ten} </span>
            <span> ${pk.gia.toLocaleString('vi')}đ</span>
        </div>
    </div>
    `;
};

const show1thucan = (ta: TThucAn) => {
    return `
    <div class="sanpham" >
    <a href="#" >
        <div class="image-container" >
            <img src="${ta.anh}" alt = "" >
            <button class="buy-button" > Mua ngay </button>
        </div>
    </a>
        <div class="info" data-type="${ta.loai}">
            <span>ID: ${ta.id}</span>
            <span> ${ta.ten} </span>
            <span> ${ta.gia.toLocaleString('vi')}đ</span>
        </div>
    </div>
    `;
};

let cart: CartItem[] = JSON.parse(localStorage.getItem('gioHang')) || [];
let historyCart: HistoryCart[] = JSON.parse(localStorage.getItem('lichsu')) || [];

function addToCart(id: number, loai: string): void {
    let ten: string, gia: number, anh: string;
    if (loai === 'thucung') {
        const item = thucung_arr.find(item => item.id === id);
        ten = item.ten;
        gia = item.gia;
        anh = item.anh;
    } else if (loai === 'phukien') {
        const item = phukien_arr.find(item => item.id === id);
        ten = item.ten;
        gia = item.gia;
        anh = item.anh;
    } else {
        const item = thucan_arr.find(item => item.id === id);
        ten = item.ten;
        gia = item.gia;
        anh = item.anh;
    }

    const existingItem = cart.find(item => item.id === id && item.loai === loai);

    if (existingItem) {
        existingItem.soluong += 1;
    } else {
        const newItem: CartItem = { id, ten, gia, anh, loai, soluong: 1 };
        cart.push(newItem);
    }

    localStorage.setItem('gioHang', JSON.stringify(cart));
    getTong();
}

const show1cart = (item: CartItem) => {
    if (item == null || item.gia == null || item.gia == undefined) {
        return ``;
    };
    const tamtinh = item.soluong * item.gia;
    return `
     <tr data-type="${item.loai}" data-item-id="${item.id}" class="cart-item">
        <td>
            <button class="remove-item">&times;</button>
            <img src="${item.anh}" alt="Product Image">
            <span>[ID: ${item.id}]${item.ten}</span>
        </td>
        <td>${item.gia.toLocaleString('vi')}₫</td>
        <td>
            <input type="number" class="soluong-input" value="${item.soluong}" min="1">
        </td>
        <td class="tamtinh">${tamtinh.toLocaleString('vi')}đ</td>
    </tr>
    `;
}

const show1historynobtn = (item: CartItem) => {
    if (item == null || item.gia == null || item.gia == undefined) {
        return ``;
    };
    const tamtinh = item.soluong * item.gia;
    return `
     <tr data-type="${item.loai}" data-item-id="${item.id}" class="cart-item">
        <td>
        
            <img src="${item.anh}" alt="Product Image">
            <span>[ID: ${item.id}]${item.ten}</span>
        </td>
        <td>${item.gia.toLocaleString('vi')}₫</td>
        <td>
        <span>${item.soluong}</span>
         
        </td>
        <td>${tamtinh.toLocaleString('vi')}đ</td>
    </tr>
    `;
}

const show1lichsu = (item: HistoryCart) => {
    const test = showlistcartonhistory();


    return `
    <div style="border: 1px solid black;">
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tạm tính</th>
                    
                </tr>
            </thead>
            <tbody>
                ${test}
            </tbody>
        </table>
        <div style="text-align: right; padding:5px;">
        
        
        <span style="font-size: 20px;font-weight: bold;">${item.time}</span>
        <br>
        <span style="font-size: 20px;font-weight: bold;">Tổng tiền:${item.tonggia.toLocaleString('vi')}đ</span>
        </div>
    </div>
    `;
}

const updateCart = () => {
    const el = document.querySelector("body > div > table > tbody");
    el.innerHTML = showlistcart();
    updateCartDisplay();
    getTong();
}

function getCurrentDateTimeInVietnam() {

    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; 
    const year = now.getFullYear(); 

  
    const hours = now.getHours(); 
    const minutes = now.getMinutes(); 
    const seconds = now.getSeconds(); 

    return `Ngày ${day}-${month}-${year} | ${hours}h:${minutes}p:${seconds}s`
}




export const thanhtoan = () => {

    let his: HistoryCart = {
        items: cart,
        time: getCurrentDateTimeInVietnam(),
        tonggia: getTong(),
    }
    historyCart = [];
    historyCart.push(his);
    localStorage.setItem('lichsu', JSON.stringify(historyCart));
    let ls: HistoryCart[] = JSON.parse(localStorage.getItem('lichsu')) || [];


    //xoa cart
    let arr = [];
    localStorage.setItem('gioHang', JSON.stringify(arr));
    updateCart();
    document.querySelector("body > div > div.data").innerHTML = showlistlichsu();
}

export const updateTamTinh = (id: number, soluong: number, loai: string) => {

    let gioHang: CartItem[] = JSON.parse(localStorage.getItem('gioHang')) || [];


    let item = gioHang.find(item => item.id == id && loai === item.loai);

    const item_arr = Array.from(document.querySelectorAll('.cart-item'));
    const item_f = item_arr.find(item => {
        const loai2 = item.getAttribute('data-type');
        const id2 = item.getAttribute('data-item-id');
        //console.log(loai2,id2);

        return id == Number(id2) && loai === loai2;
    })


    if (item) {

        item.soluong = soluong;

        localStorage.setItem('gioHang', JSON.stringify(gioHang));



        const tamtinhElement = item_f.querySelector('.tamtinh');

        //console.log(tamtinhElement);

        const tamtinh = item.soluong * item.gia;
        tamtinhElement.textContent = `${tamtinh.toLocaleString('vi')}đ`;
    }

    getTong();



};

const updateCartDisplay = () => {

    const updatedBtnXoa = document.querySelectorAll('.remove-item');
    updatedBtnXoa.forEach(el => {
        el.addEventListener('click', (event) => {
            const btnel = event.target as HTMLElement;
            const productel = btnel.closest('tr');
            const loai = productel.getAttribute('data-type');
            const id = productel.getAttribute('data-item-id');
            xoagiohang(Number(id), loai);
        });
    });
};


export const xoagiohang = (id: number, loai: string) => {
    const items: CartItem[] = JSON.parse(localStorage.getItem('gioHang')) || [];
    //console.log(id,loai);

    const itemremoved = items.filter(item => !(item.id == id && item.loai === loai));
    //console.log(itemremoved);
    localStorage.setItem('gioHang', JSON.stringify(itemremoved));


    updateCart();
};

export const getTong = () => {
    let tong = 0.0;
    const tong_arr = Array.from(document.querySelectorAll('.tamtinh'));
    if (tong_arr.length == 0) {
        const eTonggia = document.getElementById('tonggia');
        if (eTonggia) {
            eTonggia.textContent = tong.toLocaleString('vi');
        }
        return tong;
    } else {
        tong_arr.map(item => {
            // console.log(item.textContent.replace('đ','').replace(/\./g, ''));
            if (item.textContent != null) {
                tong += Number(String(item.textContent).replace('đ', '').replace('.', ''));
            }

        })
    }








    const eTonggia = document.getElementById('tonggia');
    if (eTonggia) {
        eTonggia.textContent = tong.toLocaleString('vi');
    }



    return tong;
}


export const showtest = (event: any) => {

    const productElement = (event.target as HTMLElement).closest('.sanpham');
    const info_arr = productElement.getElementsByTagName('span');

    const id = info_arr[0].textContent.replace('ID:', '').trim();


    const loai = productElement.getElementsByTagName('div')[1].getAttribute('data-type');
    addToCart(Number(id), loai);

}


export const giohangtb = () => {

    const cart_arr = JSON.parse(localStorage.getItem('gioHang')) || [];
    return `GIỎ HÀNG[${cart_arr.length}]`;
}

export const showlistphukien = (sort: boolean, check: number) => {
    if (sort == true) {
        
        const html_arr = sort_phukien_arr(check).map(show1phukien);
        return html_arr.join("");
    }
    const html_arr = phukien_arr.map(show1phukien);
    return html_arr.join("");
};
export const showlistthucung = (sort: boolean, check: number) => {
    if (sort == true) {
        
        const html_arr = sort_thucung_arr(check).map(hien1ThuCung);
        return html_arr.join("");
    }

    const html_arr = thucung_arr.map(hien1ThuCung);
    return html_arr.join("");

}
export const showlistmenuitem = () => {
    const html_arr = menuitem_arr.map(show1menu);
    return html_arr.join("");
};
export const showlistthucan = (sort:boolean,check:number) => {
    if (sort == true) {
        
        const html_arr = sort_thucan_arr(check).map(show1thucan);
        return html_arr.join("");
    }
    const html_arr = thucan_arr.map(show1thucan);
    return html_arr.join("");
};
export const showlistcart = () => {
    const cart_arr = JSON.parse(localStorage.getItem('gioHang')) || [];
    const html_arr = cart_arr.map(show1cart);


    return html_arr.join("");
};
const showlistcartonhistory = () => {
    const arr: HistoryCart = JSON.parse(localStorage.getItem('lichsu')) || [];


    const html_arr: CartItem[] = arr[0].items.map(show1historynobtn);



    return html_arr.join("");
};
export const showlistlichsu = () => {
    const ls_arr = JSON.parse(localStorage.getItem('lichsu')) || [];


    const html_arr = ls_arr.map(show1lichsu);
    return html_arr.join("");
}

const sort_arr = (data_arr: any[], check: number) => {

    const data: TThuCung[] = data_arr.sort((a, b) => {
        if (check == 1) {
            return a.gia - b.gia;
        } else if(check == 0) {
            return b.gia - a.gia;
        }

    });

    return data;

}

export const sort_thucung_arr = (check: number) => {
    const data: TThuCung[] = sort_arr(thucung_arr, check);

    return data;
}
export const sort_thucan_arr = (check: number) => {
    const data: TThucAn[] = sort_arr(thucan_arr, check);

    return data;
}
export const sort_phukien_arr = (check: number) => {
    const data: TPhuKien[] = sort_arr(phukien_arr, check);

    return data;
}
