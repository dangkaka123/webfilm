// Tải film vào box
const params = new URLSearchParams(window.location.search)
const page = params.get('page') || 1
let pageCol = 4
let pageRow = 2
const numberItem = pageCol*pageRow
let classCol = 'l-'+ (12/pageCol).toString().replace(".", "-");
const itemInStorage = JSON.parse(localStorage.getItem('cart')) || []
let pageSize = Math.ceil(itemInStorage.length/numberItem) 
renderToMyFilm(itemInStorage)

function renderToMyFilm(items){
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
        `<div class="col ${classCol} m-4 c-1 product-item-box">
            <div class="product-item">
                <i data-id="${id_film}" class="fa-solid item__icon ${classIcon}"></i>
                <a href="../pages/product_detail.html?id=${id_film}">
                    <img src="${src_film}" alt="" class="product-item-pic">
                </a>
                <div class="product-item-name">
                    <span class="name_film">${name_film}</span>
                    <span class="year_film">${year_film}</span>
                </div>
                <div class="product-item-info">
                    <span class="quanlity-film">HD</span>
                    <span class="longtime-film--star-film">
                            <span class="material-symbols-outlined material-symbols-outlined--clock_loader_20">clock_loader_20</span>
                            <span class="longtime-film">${time_film}</span>
                            <span class="material-symbols-outlined material-symbols-outlined--star">star</span>
                            <span class="star-film">${rate_film}</span>
                    </span>
                </div>
            </div>
        </div>`
    })
    element__product_item_box.innerHTML = all_product
    const iconActions = document.querySelectorAll(".item__icon--remove")
    
    iconActions.forEach((item) =>{
        item.addEventListener('click',(element)=>{
            removeItemFromStorage(element) 
        })
    })
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


window.addEventListener('storage', function(event) {
    if (event.key === null) {
        window.location.reload();
    }
  });



