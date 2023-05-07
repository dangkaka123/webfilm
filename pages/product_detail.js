// Xuất nội dung main
const params = new URLSearchParams(window.location.search);
const id_film = parseInt(params.get('id'))-1
const film = FILM[id_film]
const itemInStorage = JSON.parse(localStorage.getItem('cart')) || []
let classIcon = 'fa-plus item__icon--add'
const index = itemInStorage.findIndex((e) => e.id === film.id);
if( index !== -1){
    classIcon = 'fa-minus item__icon--remove'
}

let src_film
if (film['type_film']=='chiếu rạp'){
    src_film = '../public/assets/img/movie/'+film['pic']
} else {
    src_film = '../public/assets/img/cartoon/'+film['pic']
}

const detailFilm = document.querySelector('.detail_film-box')
detailFilm.style.backgroundImage = `url('${src_film}')`

const innderDetailFilm = `
    <div class="grid wide" >
        <div class="row detail_film">

            <div class="col l-3 c-12 detail_film_img_box ">
            <img src="${src_film}" alt="" class="detail_film_img">
            </div>

            <div class="col l-9 c-12 detail_film_info_box">
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
                    <div class="info--subtitle">${film.rating} <i class="fa-solid fa-star icon__start"></i> </div>
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
                <iframe id="video_iframe" src="${film.src}" allowfullscreen frameborder="0" >
                </iframe>                    
            </div>
        </div>
    </div>
`
detailFilm.innerHTML = innderDetailFilm

//////////////// Thao tác thêm xóa
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

// Xuất item trong local storage ra giỏ hàng
renderToCart()

function renderToCart(){
    const itemInCarts = JSON.parse(localStorage.getItem('cart')) || []
    const contentCart = document.querySelector('.content__cart')
    contentCart.innerHTML =  ''
    if(itemInCarts.length === 0) {
        const divNoCart = document.createElement('div')
        divNoCart.classList.add('no-item')
        
        const imgNoCart = document.createElement('img')
        imgNoCart.classList.add('no-item-img')
        imgNoCart.setAttribute('src', '../public/assets/navbar/no_cart.png')

        divNoCart.appendChild(imgNoCart)
        contentCart.appendChild(divNoCart)
    } else {
        itemInCarts.forEach(item => {
            let name_film = item['name']
            let id_film = item['id']
            let src_film
          
            if (item['type_film'] == 'chiếu rạp') {
              src_film = '../public/assets/img/movie/' + item['pic']
            } else {
              src_film = '../public/assets/img/cartoon/' + item['pic']
            }
          
            const cartItem = document.createElement('a')
            cartItem.setAttribute('data-id', id_film)
            cartItem.style.backgroundImage = `url(${src_film})`
            cartItem.classList.add('cart__item')
            cartItem.setAttribute('href', `pages/product_detail.html?id=${id_film}`)
          
            const img = document.createElement('img')
            img.setAttribute('src', src_film)
            img.setAttribute('alt', '')
            img.classList.add('cart__item-img')
          
            const title = document.createElement('div')
            title.classList.add('cart__item-title')
            const titleText = document.createElement('span')
            titleText.classList.add('cart__item-title-text')
            titleText.innerText = name_film
            title.appendChild(titleText)
          
            const remove = document.createElement('i')
            remove.classList.add('cart__item-remove', 'fa-solid', 'fa-trash')
            remove.setAttribute('data-id', id_film)

            
            remove.addEventListener('click',  (element) => {
                element.preventDefault();
                removeCart(element)
            })
          
            cartItem.appendChild(img)
            cartItem.appendChild(title)
            cartItem.appendChild(remove)
          
            contentCart.appendChild(cartItem)
          })
    }
}

function removeCart(element){
    removeItemFromCart(element)
    renderToCart()
}

function removeItemFromCart(element){
    const  item = FILM[element.target.dataset.id - 1]
    let cartItems = JSON.parse(localStorage.getItem('cart')) || []
    const index = cartItems.findIndex((e) => e.id === item.id);
    cartItems.splice(index,1)
    localStorage.setItem('cart',JSON.stringify(cartItems))


    const productRemoveds = document.querySelectorAll('.item__icon--remove')
    productRemoveds.forEach((item)=>{
        if(item.dataset.id === element.target.dataset.id){
            item.classList.remove('item__icon--remove', 'fa-minus')
            item.classList.add('item__icon--add', 'fa-plus')
        }
    })
}

///// Chức năng tìm kiếm
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