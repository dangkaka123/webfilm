const params = new URLSearchParams(window.location.search);
const id_film = parseInt(params.get('id'))-1
const film = FILM[id_film]
const itemInStorage = JSON.parse(localStorage.getItem('cart')) || []
let classIcon = 'fa-plus item__icon--add'
const index = itemInStorage.findIndex((e) => e.id === film.id);
console.log(index)
if( index !== -1){
    classIcon = 'fa-minus item__icon--remove'
}

if (film['type_film']=='chiếu rạp'){
    src_film = '../public/assets/img/movie/'+film['pic']
} else {
    src_film = '../public/assets/img/cartoon/'+film['pic']
}

const detailFilm = document.querySelector('.detail_film')

const innderDetailFilm = `
    <div class="col l-3 detail_film_img_box ">
    <img src="${src_film}" alt="" class="detail_film_img">
    </div>

    <div class="col l-9 detail_film_info_box">
        <div class="detail_film_info_box--title">${film.name}</div>

        <div class="detail_film_info_box--text">
            <div class="info--title">  Đạo diễn: </div>
            <div class="info--subtitle">${film.director}</div>
        </div>
        <div class="detail_film_info_box--text">
            <div class="info--title"> Diễn viên: </div>
            <div class="info--subtitle">${film.main_charactor}</div>
        </div>
        <div class="detail_film_info_box--text">
            <div class="info--title"> Mô tả: </div>
            <div class="info--subtitle">${film.describe}</div>
        </div>
        <div class="detail_film_info_box--text">
            <div class="info--title"> Thời gian:  </div>
            <div class="info--subtitle">${film.time}</div>
        </div>
        <div class="detail_film_info_box--text">
            <div class="info-text info--title"> Đánh giá:  </div>
            <div class="info--subtitle">${film.rating} <i class="fa-solid fa-star"></i> </div>
        </div>

        <div class="detail_film_info_box--check">
            <a href="#video_iframe" class="detail_film_info_box--check-watchnow">
                <i class="fa-solid fa-play watchnow-icon"></i>
                <span class="watchnow-text">Watch Now</span> 
            </a>
            <i data-id="${film.id}" class="fa-solid item__icon ${classIcon}"></i>
        </div>
    </div>

    <div class="col l-12 detail_film-video">
        <iframe id="video_iframe" src="${film.src}" allowfullscreen frameborder="0" width="1200" height="600" >
        </iframe>                    
    </div>
`
detailFilm.innerHTML = innderDetailFilm

////////////////
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