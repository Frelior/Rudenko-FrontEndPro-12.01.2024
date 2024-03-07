const inputLines = document.querySelectorAll('.inputLine')

inputLines.forEach(inputLine => {
    inputLine.addEventListener('focus', onFocus.bind(inputLine, 'childDiv'))
    inputLine.addEventListener('focusout', focusOut.bind(inputLine, 'childDiv'))
})

function focusOut(elementClass) {
    this.parentElement.querySelector(`.${elementClass}`)?.remove()
}

function onFocus(elementClass) {
    const div = document.createElement('div')
    div.classList.add(`${elementClass}`)
    div.innerHTML = 'ghost div'

    this.parentElement.append(div)  
}

// i decided make functions like that in case if i'll need to use them for other DOM elemets
// and for practice with `this`