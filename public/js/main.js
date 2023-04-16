element__navbar__main_trangchu = document.querySelector(".navbar__main-trangchu")

element__navbar__main_trangchu.addEventListener("click",()=>{
    window.location.href = "http://127.0.0.1:5500/"
})

element__navbar__main_phimchieurap = document.querySelector(".navbar__main-phimchieurap")

element__navbar__main_phimchieurap.addEventListener("click",()=>{
    window.location.href = "http://127.0.0.1:5500/pages/phimchieurap.html"
})

element__navbar__main_anime = document.querySelector(".navbar__main-anime")

element__navbar__main_anime.addEventListener("click",()=>{
    window.location.href = "http://127.0.0.1:5500/pages/hoathinh.html"
})

element__navbar__main_myfilm = document.querySelector(".navbar__main-myfilm")

element__navbar__main_myfilm.addEventListener("click",()=>{
    window.location.href = "http://127.0.0.1:5500/pages/myfilm.html"
})

element__navbar__cart_img = document.querySelector(".navbar__cart-img")

element__navbar__cart_img.addEventListener('click',()=>{
    window.location.href = "http://127.0.0.1:5500/pages/myfilm.html"
})


//////////////// set local mylist

// localStorage.setItem('username', 'John');