// Lấy trang hiện tại từ query params
const params = new URLSearchParams(window.location.search)
const page = params.get('page') || 1

/////////// Cập nhật item film tại product list
// Khởi tạo cột, hàng và class mặc định cho item
let pageCol = 4
let pageRow = 2
let classCol = 'l-'+ (12/pageCol).toString().replace(".", "-")

// Tải lại trang nếu kích thước thay đổi
let lastWidth = window.innerWidth;

window.addEventListener('resize',  () => {
    if (window.innerWidth !== lastWidth) {
        if(window.innerWidth < 740 && classCol !==  'c-'+ (12/pageCol).toString().replace(".", "-")){
            window.location.reload()
        }
        if(window.innerWidth < 1024 && classCol !== 'm-'+ (12/pageCol).toString().replace(".", "-")){
            window.location.reload()
        }
        if(window.innerWidth >= 1024 && classCol !== 'l-'+ (12/pageCol).toString().replace(".", "-")){
            window.location.reload()
        }
        lastWidth = window.innerWidth;
    }
})

// Các cột, hàng và class sẽ thay đổi theo kích thước màn hình
if(window.innerWidth < 740){
    pageCol = 2
    pageRow = 3
    classCol = 'c-'+ (12/pageCol).toString().replace(".", "-")
} else if(window.innerWidth >= 740 && window.innerWidth  < 1024){
    pageCol = 3
    pageRow = 3
    classCol = 'm-'+ (12/pageCol).toString().replace(".", "-")
} else if(window.innerWidth >= 1024) {
    pageCol = 4
    pageRow = 2
    classCol = 'l-'+ (12/pageCol).toString().replace(".", "-")
}

// Tính số lượng item sẽ xuất hiện tại product list
const numberItem = pageCol*pageRow
let startId = (page - 1)*numberItem + 1
let endId = startId + numberItem
const itemInStorage = JSON.parse(localStorage.getItem('cart')) || []
let pageSize = Math.ceil(itemInStorage.length/numberItem) 

renderToMyFilm(itemInStorage)

function renderToMyFilm(items){
    if(items.length === 0){
        const element__product_item_box = document.querySelector('.product-item-box')
        console.log(element__product_item_box)
        element__product_item_box.innerHTML = '<div class="no-product"> <p> Danh sách phim của bạn hiện đang trống! Bạn có thể thêm phim yêu thích của mình <a class="no-product__link" href="../index.html">tại đây</a></p></div>'
        
    } else {
        pageSize = Math.ceil(items.length/numberItem)
        let startId = (page - 1)*numberItem + 1
        let endId = startId + numberItem
    
        const element__product_item_box = document.querySelector('.product-item-box')
        element__product_item_box.innerHTML = ''
        let all_product = ''
        items.slice(startId-1,endId-1).forEach(element => {
            let name_film = element['name']
            let year_film = element['year']
            let time_film = element['time']
            let rate_film = element['rating']
            let id_film = element['id']
            let classIcon = 'fa-minus item__icon--remove'
            let src_film
        
            if (element['type_film']=='chiếu rạp'){
                src_film = '../public/assets/img/movie/'+element['pic']
            } else {
                src_film = '../public/assets/img/cartoon/'+element['pic']
            }
        
            all_product += 
            `<a href="product_detail.html?id=${id_film}" class="col ${classCol} product-item-box">
                <div class="product-item">
                    <i data-id="${id_film}" class="fa-solid item__icon ${classIcon}"></i>
                    <img src="${src_film}" alt="" class="product-item-pic">
                    <div class="product-item-name">
                        <span class="name_film">${name_film}</span>
                        <span class="year_film ">${year_film}</span>
                    </div>
                    <div class="product-item-info ">
                        <span class="quanlity-film">HD</span>
                        <span class="longtime-film--star-film">
                                <span class="material-symbols-outlined material-symbols-outlined--clock_loader_20 hidden-on-mobile-tablet">clock_loader_20</span>
                                <span class="longtime-film hidden-on-mobile-tablet">${time_film}</span>
                                <span class="material-symbols-outlined material-symbols-outlined--star">star</span>
                                <span class="star-film">${rate_film}</span>
                        </span>
                    </div>
                </div>
            </a>`
        })
        element__product_item_box.innerHTML = all_product
        
        ///// Thêm sự kiện click vào nút xóa
        const iconActions = document.querySelectorAll(".item__icon--remove")
        iconActions.forEach((item) =>{
            item.addEventListener('click',(element)=>{
                element.preventDefault()
                removeItemFromStorage(element) 
            })
        })
    }
}

// Thao tác xóa

function removeItemFromStorage(element) {
    const  item = FILM[element.target.dataset.id - 1]
    let cartItems = []

    cartItems = JSON.parse(localStorage.getItem('cart'))
    const index = cartItems.findIndex((e) => e.id === item.id);
    cartItems.splice(index,1)
    localStorage.setItem('cart',JSON.stringify(cartItems))
    renderPageDivice(pageSize)
    hiddenNextPre(pageSize)
    renderToMyFilm(cartItems)
}

///////// Chức năng tìm kiếm
if(window.innerWidth >= 740){
    const input = document.querySelector(".navbar__main-searchbar")
    input.addEventListener("keydown", (evt) => {
        if(evt.key === "Enter"){
            evt.preventDefault()
        }
    })
    input.addEventListener("keyup", (evt) => {
        if(evt.key === "Enter"){
            const valueInput = evt.target.value
            if(valueInput !== ""){
                const newUrl = 'search.html' + '?' + `search=${valueInput}`
                window.location.href = newUrl
            } else{
                evt.preventDefault()
            }
        }
    })

    const btnSearch = document.querySelector(".loopicon_box")

    btnSearch.addEventListener('click', (evt) => {
        const input = document.querySelector(".navbar__main-searchbar")
        const valueInput = input.value
        if(valueInput !== ""){
            const newUrl = 'search.html' + '?' + `search=${valueInput}`
            window.location.href = newUrl
        } else{
            evt.preventDefault()
        }
    })
} else if (window.innerWidth < 740){
    const input = document.querySelector(".menu__search-input")
    input.addEventListener("keydown", (evt) => {
        if(evt.key === "Enter"){
            evt.preventDefault()
        }
    })
    input.addEventListener("keyup", (evt) => {
        if(evt.key === "Enter"){
            const valueInput = evt.target.value
            if(valueInput !== ""){
                const newUrl = 'search.html' + '?' + `search=${valueInput}`
                window.location.href = newUrl
            } else{
                evt.preventDefault()
            }
        }
    })

    const btnSearch = document.querySelector(".menu__search-icon")

    btnSearch.addEventListener('click', (evt) => {
        const input = document.querySelector(".menu__search-input")
        const valueInput = input.value
        if(valueInput !== ""){
            const newUrl = 'search.html' + '?' + `search=${valueInput}`
            window.location.href = newUrl
        } else{
            evt.preventDefault()
        }
    })
}

function searchFilmByName(name) {
    const result = FILM.filter(film => film.name.toLowerCase().includes(name.toLowerCase()));
    return result;
  }


window.addEventListener('storage', function(event) {
    if (event.key === null) {
        window.location.reload();
    }
  });



