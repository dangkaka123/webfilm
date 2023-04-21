
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

window.addEventListener("load",() =>{
    const sliderContainer = $('.slider__container')
    const sliderItems = $$('.slider__item')
    const sliderMain = $('.slider__main')
    const sliderDots = $$('.slider__dot-icon')
    const sliderNext = $('.slider__next')
    const sliderPrev = $('.slider__prev')
    const sliderLength = sliderItems.length
    let index = 0
    let positionItem = 0

    Array.from(sliderDots).forEach(dot=> {
        dot.addEventListener('click',(e)=>{
            ($('.slider__dot-icon.active')).classList.remove('active')
            e.target.classList.add('active')
            const sliderIndex = parseInt(e.target.dataset.index)
            index = sliderIndex
            positionItem = (index * 25) + '%'
            sliderMain.style = `transform: translateX(-${positionItem})`
        })
    })
    
    sliderNext.addEventListener('click', () => {
        index++
        if(index === sliderLength){
            index = 0;
        }
        positionItem = (index * 25) + '%'
        sliderMain.style = `transform: translateX(-${positionItem})`
        $('.slider__dot-icon.active').classList.remove('active')
        sliderDots[index].classList.add('active')
    })

    sliderPrev.addEventListener('click', () => {
        index--
        if(index === -1){
            index = sliderLength-1;
        }
        positionItem = (index * 25) + '%'
        sliderMain.style = `transform: translateX(-${positionItem})`
        $('.slider__dot-icon.active').classList.remove('active')
        sliderDots[index].classList.add('active')
    })

    setInterval(()=>{
        sliderNext.click()
    }, 3000)
})