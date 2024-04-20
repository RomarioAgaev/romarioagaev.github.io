const checkWindowAspectRatio = () => {
    const body = document.body
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    if (windowHeight > windowWidth) {
        body.classList.add('isBlocked')
    } else {
        body.classList.remove('isBlocked')
    }
}

const initWindowBlocker = () => window.addEventListener(
    'resize',
    checkWindowAspectRatio)

window.addEventListener('load', checkWindowAspectRatio)

export default initWindowBlocker