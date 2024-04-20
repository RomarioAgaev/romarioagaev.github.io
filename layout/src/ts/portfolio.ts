import Swiper from 'swiper'
import { Scrollbar, Mousewheel } from 'swiper/modules'

const initPortfolioSwiper = (): void => {
    Swiper.use([Scrollbar, Mousewheel])

    new Swiper('.portfolio__slider .swiper', {
        speed: 300,
        slidesPerView: 'auto',
        loop: false,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        watchOverflow: true,
        // grabCursor: true,
        mousewheel: true,

        // freeMode: {
        //     enabled: true
        // },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
            // draggable: true,
        },
    })
}

export default initPortfolioSwiper