////// Xuất item trong local storage ra giỏ hàng
renderToCart()

// Hàm xuất item từ trong localStroge
function renderToCart(){
    const itemInCarts = JSON.parse(localStorage.getItem('cart')) || []
    const contentCart = document.querySelector('.content__cart')
    contentCart.innerHTML =  ''
    if(itemInCarts.length === 0) {
        const divNoCart = document.createElement('div')
        divNoCart.classList.add('no-item')
        
        const imgNoCart = document.createElement('img')
        imgNoCart.classList.add('no-item-img')
        imgNoCart.setAttribute('src', './public/assets/navbar/no_cart.png')

        divNoCart.appendChild(imgNoCart)
        contentCart.appendChild(divNoCart)
    } else {
        itemInCarts.forEach(item => {
            let name_film = item['name']
            let id_film = item['id']
            let src_film
          
            if (item['type_film'] == 'chiếu rạp') {
              src_film = './public/assets/img/movie/' + item['pic']
            } else {
              src_film = './public/assets/img/cartoon/' + item['pic']
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

            // Thêm sự kiện click vào nút xóa
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

// Hàm xóa item khỏi giỏ hàng
function removeCart(element){
    removeItemFromCart(element)// Gọi xóa item trong localStorage
    renderToCart()// Xuất lại item
}

// Hàm xóa item trong localStorage
function removeItemFromCart(element){
    const  item = FILM[element.target.dataset.id - 1]
    let cartItems = JSON.parse(localStorage.getItem('cart')) || []
    const index = cartItems.findIndex((e) => e.id === item.id);
    cartItems.splice(index,1)
    localStorage.setItem('cart',JSON.stringify(cartItems))

    // Cập nhật lại class cho item film trong product-list
    const productRemoveds = document.querySelectorAll('.item__icon--remove')
    productRemoveds.forEach((item)=>{
        if(item.dataset.id === element.target.dataset.id){
            item.classList.remove('item__icon--remove', 'fa-minus')
            item.classList.add('item__icon--add', 'fa-plus')
        }
    })
}

//////// Chức năng tìm kiếm
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
                const newUrl = 'pages/search.html' + '?' + `search=${valueInput}`
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
            const newUrl = 'pages/search.html' + '?' + `search=${valueInput}`
            window.location.href = newUrl
        } else{
            evt.preventDefault()
        }
    })
}else if (window.innerWidth < 740){
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
                const newUrl = 'pages/search.html' + '?' + `search=${valueInput}`
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
            const newUrl = 'pages/search.html' + '?' + `search=${valueInput}`
            window.location.href = newUrl
        } else{
            evt.preventDefault()
        }
    })
}

function searchFilmByName(name) {
    const result = FILM.filter(film => film.name.toLowerCase().includes(name.toLowerCase()));
    return result
  }
