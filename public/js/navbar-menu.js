const menuIcon = document.querySelector('.navbar__menu-icon')

// Mở menu
menuIcon.addEventListener('click',()=>{
    ableMenu()
})

// Hàm hiện menu
function ableMenu(){
    const menu = document.querySelector('.navbar__menu-content-wrapper')
    menu.classList.remove('menu--hidden')
}

const exitIcon = document.querySelector('.navbar__menu-exit')

// Thoát menu
exitIcon.addEventListener('click', () => {
    disibleMenu()
})

// Hàm ẩn menu
function disibleMenu(){
    const menu = document.querySelector('.navbar__menu-content-wrapper')
    menu.classList.add('menu--hidden')
}

const exitBg = document.querySelector('.navbar__menu-content-wrapper')

// Thoái menu khi click ra ngoài
exitBg.addEventListener('click', (e)=>{
    const isContenMenu = e.target.classList.contains('navbar__menu-content')
    const isInput = e.target.tagName.toLowerCase() === 'input' || e.target.classList.contains('menu__search-icon');
    if (isContenMenu || isInput){
        return
    }
    disibleMenu()
})


