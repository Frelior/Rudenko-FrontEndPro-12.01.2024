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

// Я вирішив зробити функції більш гнучкими, щоб потренуватися із this

// Але залишилось питання:
// Тут я отримую всі інпути з классом ".inputLine" і вішаю на кожен по 2 лісенера. 
// Звучить не дуже оптимізовано, особливо якщо б в мене було дуже багато інпутів (хоча, напевно, дуже багато інпутів в реальносі не буде)
// Спочатку я хотів зробити лісенер на .wrapper, але зіштовхнувся з проблемою - що має слухати врапер? 
// Якщо клік, то при вирокистанні кнопки tab фокус буде потрапляти на інпут, але скрипт не буде працювати без кліку.
// Тому я вирішив додати лісенери на кожен інпут. Але мені все ж таки здаєтсья, що це можна було зробити якось більш правильно. Але питання як?