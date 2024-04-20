const initLoading = () => {
    const slide = document.getElementById('loadingSlide')
    const MAX_DELAY_BETWEEN_STEPS = 1000

    let slideWidth = 0

    if (slide) {
        const slideStyle = window.getComputedStyle(slide);
        slideWidth = parseFloat(slideStyle.getPropertyValue('width'))
    }

    let currentWidthPercentValue = slideWidth
    let currentStep = 0

    const steps = [
        Math.floor(Math.random() * 33),
        Math.floor(Math.random() * 33) + 33,
        Math.floor(Math.random() * 33) + 66,
        100
    ]

    const setLoading = () => {
        const intervalId = setInterval(() => {
            currentWidthPercentValue++

            if (currentWidthPercentValue >= 100) currentWidthPercentValue = 100

            if (slide) slide.style.width = currentWidthPercentValue + '%'

            if (currentWidthPercentValue >= steps[currentStep]) {
                currentStep++
                clearInterval(intervalId)

                if (currentStep <= steps.length - 1) {
                    const delay = Math.floor(Math.random() * MAX_DELAY_BETWEEN_STEPS)
                    setTimeout(setLoading, delay)
                    return
                }
            }
        }, 20)
    }

    setLoading()
}

const hideLoading = () => {
    const loading = document.getElementById('loading');
    loading?.classList.add('loaded')
    setTimeout(() => loading?.remove(), 1000)
}

export { initLoading, hideLoading }