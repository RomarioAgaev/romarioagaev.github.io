import requestData from './request'
import initWindowBlocker from './blocker'
import initNav from './nav'
import initPortfolioSwiper from './portfolio'

import 'swiper/swiper-bundle.css'

window.addEventListener('load', () => {
    requestData()
    initWindowBlocker()
    initNav()
    initPortfolioSwiper()
})