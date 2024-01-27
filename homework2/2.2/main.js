// sorry, i decided to make it without prompt and alert, because its more interesting
const display = document.querySelector('.display_text');
const btns = document.querySelectorAll('.btn');
const reset = document.querySelector('.reset');
const equal = document.querySelector('.btn-equal');

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        if(isNaN(display.textContent.at(-1)) && isNaN(btn.textContent)){
            display.textContent = display.textContent.slice(0, -1)
        }
        display.textContent += btn.textContent;
    })
})
reset.addEventListener('click', () =>{
    display.textContent = '';
})
equal.addEventListener('click', () =>{
    const calculated = new Function('return ' + display.textContent);
    display.textContent = calculated();
})

