const slider = document.querySelector('.slider')
const sliderIndicatorsWrapper = document.querySelector('.slider_indicators_wrapper')
const img = document.querySelector('.slider_img');
const btnLeft = document.querySelector('.slider_btnLeft');
const btnRight = document.querySelector('.slider_btnRight');
const imageSources = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg',
    'images/6.jpg',
    'images/7.jpg',
    'images/8.jpg',
    'images/9.jpg',
]

setIndicators(sliderIndicatorsWrapper, imageSources)

slider.addEventListener('click', (event) => {
    const indicatorsArray = sliderIndicatorsWrapper.querySelectorAll('.slider_indicator')
    let currentImageSelected = imageSources.indexOf(img.getAttribute('src'))

    if (event.target === btnLeft){
        img.setAttribute('src', imageSources[--currentImageSelected])
        handleButtonState(currentImageSelected)
    }

    if (event.target === btnRight){
        img.setAttribute('src', imageSources[++currentImageSelected])
        handleButtonState(currentImageSelected)
    }

    handleIndicatorsState(indicatorsArray, currentImageSelected)
})

function handleButtonState(currentImageSelected) {
    currentImageSelected === 0
        ? btnLeft.setAttribute('disabled', 'true')
        : btnLeft.removeAttribute('disabled')

    currentImageSelected === imageSources.length - 1
        ? btnRight.setAttribute('disabled', 'true')
        : btnRight.removeAttribute('disabled')
}

function setIndicators(wrapperElement, arrayOfImages) {
    for (let i = 0; i < arrayOfImages.length; i++){
        const indicator = document.createElement('div')
        indicator.classList.add('slider_indicator')
        wrapperElement.append(indicator)
    }
    wrapperElement.firstElementChild.classList.add('slider_indicator_active')
}

function handleIndicatorsState(indicatorsArray, currentImageSelected) {
    indicatorsArray.forEach(indicator => {
        indicator.classList.remove('slider_indicator_active')
    });
    indicatorsArray[currentImageSelected].classList.add('slider_indicator_active')
}
