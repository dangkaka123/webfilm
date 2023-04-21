const menuIcon = document.querySelector('.navbar__menu-icon')

menuIcon.addEventListener('click',()=>{
    ableMenu()
})

function ableMenu(){
    const menu = document.querySelector('.navbar__menu-content-wrapper')
    menu.classList.remove('menu--hidden')
}

const exitIcon = document.querySelector('.navbar__menu-exit')

exitIcon.addEventListener('click', () => {
    disibleMenu()
})

function disibleMenu(){
    const menu = document.querySelector('.navbar__menu-content-wrapper')
    menu.classList.add('menu--hidden')
}

const exitBg = document.querySelector('.navbar__menu-content-wrapper')

exitBg.addEventListener('click', (e)=>{
    const isContenMenu = e.target.classList.contains('navbar__menu-content')
    const isInput = e.target.tagName.toLowerCase() === 'input' || e.target.classList.contains('menu__search-icon');
    if (isContenMenu || isInput){
        return
    }
    disibleMenu()
})


