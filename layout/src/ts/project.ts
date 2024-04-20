import Swiper from 'swiper'
import { Navigation,  } from 'swiper/modules'

interface CustomSwiper extends Swiper {
    slides: HTMLElement[]
}

const showProject = (project: HTMLDivElement) => {
    const projectList: HTMLDivElement | null = document
        .querySelector('.project__list')

    const projectName: string = project.dataset.projectName as string

    const projectItem: HTMLDivElement | null = document
        .querySelector(`[data-project='${projectName}']`)

    if (!projectList || !projectItem) return

    projectList.classList.add('show')
    projectItem.classList.add('show')
}

const hideProject = (buttonClose: HTMLButtonElement) => {
    const projectItem: HTMLDivElement | null = buttonClose
            .closest('.project__item')
    const projectList: HTMLDivElement | null = buttonClose
        .closest('.project__list')

    if (!projectItem || !projectList) return

    projectItem.classList.remove('show')
    setTimeout(() => projectList.classList.remove('show'), 750)
}

const initProjects = () => {
    // Show projects
    const projects: HTMLDivElement[] = Array.from(document
        .querySelectorAll('[data-project-name]'))

    if (projects.length === 0) return

    projects.forEach(project =>
        project.addEventListener(
            'click',
            () => showProject(project)
        ))

    // Hide projects
    const closeButtons: HTMLButtonElement[] = Array.from(document
        .querySelectorAll('.project__close'))

    if (closeButtons.length === 0) return

    closeButtons.forEach(buttonClose =>
        buttonClose.addEventListener(
            'click',
            () => hideProject(buttonClose)
        ))
}

const initProjectSwipers = () => {

    const projectSwipers: HTMLDivElement[] = Array.from(document
        .querySelectorAll('.project__slider-body .swiper'))

    if (projectSwipers.length === 0) return

    projectSwipers.forEach(swiper => {
        Swiper.use([Navigation])

        const buttonNext: HTMLSpanElement | null | undefined = swiper
            .closest('.project__item')?.querySelector('.project__nav_next')
        const buttonPrev: HTMLSpanElement | null | undefined = swiper
            .closest('.project__item')?.querySelector('.project__nav_prev')

        const currentSlideNumber: HTMLElement | null | undefined = swiper
            .closest('.project__item')?.querySelector('.project__pagination_current')
        const countSlides: HTMLElement | null | undefined = swiper
            .closest('.project__item')?.querySelector('.project__pagination_all')

        const projectControllers: HTMLElement | null | undefined = swiper
            .closest('.project__item')?.querySelector('.project__controllers')


        new Swiper(swiper, {
            speed: 300,
            slidesPerView: 'auto',
            loop: false,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            watchOverflow: true,
            grabCursor: true,

            navigation: {
                nextEl: buttonNext,
                prevEl: buttonPrev,
            },

            on: {
                init: function(this: CustomSwiper) {
                    if (this.slides.length > 1 && countSlides) {
                        countSlides.innerText = (this.slides.length).toString()
                    } else {
                        projectControllers?.classList.add('hide')
                        swiper.classList.add('single-slide')
                    }
                },

                slideChange: function(this: CustomSwiper) {
                    if (currentSlideNumber) {
                        currentSlideNumber.innerText = (this.activeIndex + 1).toString();
                    }
                },

                reachEnd: function(this: CustomSwiper) {
                    if (currentSlideNumber) {
                        currentSlideNumber.innerText = (this.slides.length).toString();
                    }
                },

                fromEdge: function(this: CustomSwiper) {
                    if (this.activeIndex !== 0 && currentSlideNumber) {
                        currentSlideNumber.innerText = (this.slides.length - 1).toString();
                    }
                },
            }
        })
    })
}

export { initProjects, initProjectSwipers }