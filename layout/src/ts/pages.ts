const body: HTMLBodyElement | null = document.querySelector('body')
const pagesContainer: HTMLDivElement | null = document.querySelector('.page-list')
const pageContents: HTMLDivElement[] = Array.from(document.querySelectorAll('.page__content'))
const pages: HTMLSelectElement[] = Array.from(document.querySelectorAll('.page'))
const pageCount: number = pages.length
const pageSize: number = 100 / pageCount

// Transition start handler
pagesContainer?.addEventListener(
    'transitionstart',
    (event) => {
        if (event.target === pagesContainer) {
            body?.classList.add('action-block');
        }
    }
)

// Transition end handler
pagesContainer?.addEventListener(
    'transitionend',
    (event) => {
        if (event.target === pagesContainer) {
            body?.classList.remove('action-block')
            uncompressPage()
        }
    }
)

const compressPage = () => {
    if (pageContents.length > 0) {
        pageContents.forEach(node => node.classList.add('compressed'))
    }
}

const uncompressPage = () => {
    if (pageContents.length > 0) {
        pageContents.forEach(node => node.classList.remove('compressed'))
    }
}

const togglePage = (pageIdx: number): void => {
    const offset: number = pageIdx * pageSize * -1

    if (pageContents.length > 0) {
        compressPage()
    }

    if (pagesContainer) {
        setTimeout(
            () => pagesContainer.style.transform = `translateX(${offset}%)`,
            300
        )
    }
}

export default togglePage