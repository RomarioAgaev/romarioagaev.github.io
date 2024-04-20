import { initLoading, hideLoading } from "./loading"
import { initProjects, initProjectSwipers } from "../ts/project"

interface Contacts {
    address: string
    title?: string
    message?: string
    instructions?: string
    phone?: string
    mail?: string
    socials?: {[key: string]: string}
}

interface About {
    title?: string
    message?: string
    photo?: string
    skills?: string[]
}

interface Portfolio {
    id: string | number
    name: string
    img: string
    number?: string
    year?: number
    project?: Project
}

interface Project {
    title?: string
    description?: string
    contacts?: {[key: string]: string}
    items?: {description: string, img: string}[]
}

interface Data {
    portfolio: Portfolio[]
    about: About
    contacts: Contacts
}

const getProject = (project: Project, id: string): HTMLElement => {
    const projectItem = document.createElement('div')
    projectItem.classList.add('project__item')
    projectItem.setAttribute('data-project', id)

    let item = `
<div class="container">
    <div class="row">
        <div class="col-4 col-lg-3 offset-lg-1">
            <div class="project__content">
                <button class="project__close" type="button"><span></span></button>
                <div class="project__desc">
                    <h2 class="project__title">${project.title}</h2>
                    <p class="project__text">${project.description}</p>
                    <div class="project__controllers">
                        <span class="project__nav project__nav_prev"><i></i></span>
                        <div class="project__pagination">
                            <mark class="project__pagination_current">1</mark>
                            <span>&nbsp;</span>
                            <i></i>
                            <span>&nbsp;</span>
                            <mark class="project__pagination_all">${project?.items?.length}</mark>
                        </div>
                        <span class="project__nav project__nav_next"><i></i></span>
                    </div>
                </div>
                <ul class="project__socials">`

    if (project.contacts) {
        for (const contact in project.contacts) {
            item += `<li><a href="${project.contacts[contact]}" target="_blank">${contact}</a></li>`
        }
    }

    item += `
                </ul>
            </div>
        </div>
        <div class="col-8 col-lg-8 project__slider-container">
            <div class="project__slider-wrap">
                <div class="project__slider">
                    <div class="project__slider-body">
                        <div class="swiper">
                            <div class="swiper-wrapper">`

    if (project.items) {
        for (const slide of project.items) {
            item += `
                                <div class="swiper-slide">
                                    <div class="project__slide">
                                        <img src="${slide.img}" alt="${slide.description}">
                                    </div>
                                </div>`
        }
    }

    item += `
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`

    projectItem.innerHTML = item
    return projectItem
}

const setPortfolio = (portfolio: Portfolio[]) => {
    const projectList: HTMLDivElement | null = document.querySelector("#projectList")
    const portfolioList: HTMLDivElement | null = document.querySelector("#portfolio")

    for (let i = 0; i < portfolio.length; i++) {
        const item = portfolio[i]

        const swiperSlide = document.createElement('div')
        swiperSlide.classList.add('swiper-slide')

        const portfolioSlide = document.createElement('div')
        portfolioSlide.classList.add('portfolio__slide')

        const portfolioItem = document.createElement('div')
        portfolioItem.classList.add('portfolio__item')

        const portfolioPic = document.createElement('div')
        portfolioPic.classList.add('portfolio__pic')
        portfolioPic.setAttribute('data-project-name', `project-${item.id}`)

        const img = document.createElement('img')
        img.src = item.img
        img.alt = item.name

        const portfolioDesc = document.createElement('div')
        portfolioDesc.classList.add('portfolio__desc')

        const portfolioNumber = document.createElement('div')
        portfolioNumber.classList.add('portfolio__number')
        if (item.number) portfolioNumber.innerHTML = `/ ${item.number}`

        const portfolioName = document.createElement('div')
        portfolioName.classList.add('portfolio__name')
        if (item.name) portfolioName.innerHTML = item.name

        const portfolioYear = document.createElement('div')
        portfolioYear.classList.add('portfolio__year')
        if (item.year) portfolioYear.innerHTML = item.year.toString()

        // Building slide
        swiperSlide.appendChild(portfolioSlide)
        portfolioSlide.appendChild(portfolioItem)
        portfolioItem.appendChild(portfolioPic)
        portfolioItem.appendChild(portfolioDesc)
        portfolioPic.appendChild(img)
        portfolioDesc.appendChild(portfolioNumber)
        portfolioDesc.appendChild(portfolioName)
        portfolioDesc.appendChild(portfolioYear)

        // Push slide to portfolio list
        portfolioList?.appendChild(swiperSlide)

        // Add slider with project elements for current portfolio item
        if (item.project) {
            projectList?.appendChild(
                getProject(
                    item.project,
                    `project-${item.id}`
                )
            )
        }

        const LOADING_DURATION = 5000

        if (i === portfolio.length - 1) {
            setTimeout(()=> {
                initProjects()
                initProjectSwipers()
                hideLoading()
            }, LOADING_DURATION)
        }
    }
}

const setContacts = (contacts: Contacts) => {
    const title: HTMLHeadElement | null = document.getElementById('contactsTitle')
    if (title && contacts.title) title.innerHTML = contacts.title

    const msg: HTMLSpanElement | null = document.getElementById('contactsMessage')
    if (msg && contacts.message) msg.innerHTML = contacts.message

    const inst: HTMLSpanElement | null = document.getElementById('contactsInstructions')
    if (inst && contacts.instructions) inst.innerHTML = contacts.instructions

    const phone: HTMLAnchorElement | null = document.querySelector('#contactsPhone')
    if (phone && contacts.phone) {
        const clearPhone = contacts.phone.replace(/[^0-9+]/g, "");
        phone.innerHTML = contacts.phone
        phone.href = `tel:${clearPhone}`
    }

    const mail: HTMLAnchorElement | null = document.querySelector('#contactsMail')
    if (mail && contacts.mail) {
        mail.innerHTML = contacts.mail
        mail.href = `mailto:${contacts.mail}`
    }

    const form: HTMLFormElement | null = document.querySelector('#contactsForm')
    if (form) form.action = contacts.address

    const socialList: HTMLUListElement | null = document.querySelector('#contactsSocials')
    if (socialList && contacts.socials) {
        const socials = contacts.socials

        for (const key in socials) {
            const li = document.createElement('li')
            const a = document.createElement('a')

            a.classList.add(key)
            a.href = socials[key]

            li.appendChild(a)
            socialList.appendChild(li)
        }
    }
}

const setAbout = (about: About) => {
    const title: HTMLHeadElement | null = document.getElementById('aboutTitle')
    if (title && about.title) title.innerHTML = about.title

    const message: HTMLParagraphElement | null = document.querySelector('#aboutMessage')
    if (message && about.message) message.innerHTML = about.message

    const skillList: HTMLUListElement | null = document.querySelector('#aboutSkills')
    if (skillList && about.skills) {
        const skills = about.skills

        for (const skill of skills) {
            const li = document.createElement('li')

            li.classList.add('list-item')
            li.innerHTML = skill

            skillList.appendChild(li)
        }
    }

    const photo: HTMLDivElement | null = document.querySelector('#aboutPhoto')
    if (photo && about.photo) {
        const img = document.createElement('img')
        img.src = about.photo
        photo.appendChild(img)
    }
}

const setData = (data: Data) => {
    setPortfolio(data.portfolio)
    setAbout(data.about)
    setContacts(data.contacts)
}

const requestData = async () => {
    initLoading()
    try {
        const res = await fetch('data/data.json')
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        setData(await res.json())
    } catch (error) {
        console.error('An error occurred:', error)
    }
}

export default requestData