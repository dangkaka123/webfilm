const params = new URLSearchParams(window.location.search)
const page = params.get('page') || 1
let pageCol = 4
let pageRow = 3
let classCol = 'l-'+ (12/pageCol).toString().replace(".", "-");
const numberItem = pageCol*pageRow
const pageSize = Math.ceil(FILM.length/numberItem) 
let startId = (page - 1)*numberItem + 1
let endId = startId + numberItem
const element__product_item_box = document.querySelector('.product-item-box')

const itemInStorage = JSON.parse(localStorage.getItem('cart')) || []
let all_product = ''
FILM.slice(startId-1,endId-1).forEach(element => {
    let name_film = element['name']
    let year_film = element['year']
    let time_film = element['time']
    let rate_film = element['rating']
    let id_film = element['id']
    let src_film

    if (element['type_film']=='chiếu rạp'){
        src_film = './public/assets/img/movie/'+element['pic']
    } else {
        src_film = './public/assets/img/cartoon/'+element['pic']
    }

    let classIcon = 'fa-plus item__icon--add'
    const index = itemInStorage.findIndex((e) => e.id === element.id);
    if( index !== -1){
        classIcon = 'fa-minus item__icon--remove'
    }

    all_product += 
    `<div class="col ${classCol} m-4 c-1 product-item-box">
        <div class="product-item">
            <i data-id="${id_film}" class="fa-solid item__icon ${classIcon}"></i>
            <a href="pages/product_detail.html?id=${id_film}">
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

    // all_product += '<div class="col l-3 m-4 c-1 product-item-box"><div class="product-item"><span data-info="'+id_film+'" class="material-symbols-outlined material-symbols-outlined--add">add</span><a href="../pages/product_detail.html'+'?id='+id_film+'"><img src="'+src_film+'" alt="" class="product-item-pic"></a><div class="product-item-name"><span class="name_film">'+name_film+'</span><span class="year_film">'+year_film+'</span></div><div class="product-item-info"><span class="quanlity-film">HD</span><span class="longtime-film--star-film"><span class="material-symbols-outlined material-symbols-outlined--clock_loader_20">clock_loader_20</span><span class="longtime-film">'+time_film+'</span><span class="material-symbols-outlined material-symbols-outlined--star">star</span><span class="star-film">'+rate_film+'</span></span></div></div></div>'
})

element__product_item_box.outerHTML = all_product


//////////////

const iconActions = document.querySelectorAll(".item__icon")


iconActions.forEach((item) =>{
    item.addEventListener('click',(element)=>{
        const addClass = 'item__icon--add';
        const isAdd = element.target.classList.contains(addClass);
        if(isAdd){
            loadingItemToStorage(element)
        } else {
            removeItemFromStorage(element)
        }
        renderToCart() // Render lại trong  giỏ hàng
    })
})


function loadingItemToStorage(element) {
    const  item = FILM[element.target.dataset.id - 1]
    let cartItems = []
    element.target.classList.remove('item__icon--add', 'fa-plus')
    element.target.classList.add('item__icon--remove', 'fa-minus')

    if(JSON.parse(localStorage.getItem('cart')) === null){
        cartItems.push(item)
        localStorage.setItem('cart', JSON.stringify(cartItems))
    } else {
        cartItems = JSON.parse(localStorage.getItem('cart'))
        cartItems.unshift(item)
        localStorage.setItem('cart',JSON.stringify(cartItems))
    }
}

function removeItemFromStorage(element) {
    const  item = FILM[element.target.dataset.id - 1]
    let cartItems = []
    element.target.classList.remove('item__icon--remove', 'fa-minus')
    element.target.classList.add('item__icon--add', 'fa-plus')

    cartItems = JSON.parse(localStorage.getItem('cart'))
    const index = cartItems.findIndex((e) => e.id === item.id);
    cartItems.splice(index,1)
    localStorage.setItem('cart',JSON.stringify(cartItems))
}


window.addEventListener('storage', function(event) {
    if (event.key === null) {
        window.location.reload();
    }
  });
  
function renderRemoveItems(element){
    const productRemoveds = document.querySelectorAll('.item__icon--remove')
    productRemoveds.forEach((item)=>{
        if(item.dataset.id === element.target.dataset.id){
            item.classList.remove('item__icon--remove', 'fa-minus')
            item.classList.add('item__icon--add', 'fa-plus')
        }
    })
}



