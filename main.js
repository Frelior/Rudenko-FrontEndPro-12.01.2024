const listItems = document.querySelectorAll('.link');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!?@#$%^&*()_+{}|:<>?';
const hideButton = document.querySelector('.hide-button');
const homeworks = document.querySelector('.homeworks')
const title = document.querySelector('.title');

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

listItems.forEach((item) => {
    item.addEventListener('mouseover', async () => {
        if (!item.classList.contains('shuffling')) {
            item.classList.add('shuffling');
            let originalValue = item.textContent;
            for (let i = 0; i < 10; i++) {
                let newText = '';
                for (let letter of originalValue) {
                    const randomIndex = Math.floor(Math.random() * alphabet.length);
                    newText += alphabet[randomIndex];
                }
                item.textContent = newText;
                await delay (30)
            }
            item.textContent = originalValue;
            item.classList.remove('shuffling');
        }
    })
})

hideButton.addEventListener('click', () =>{
    homeworks.classList.toggle('hided');
    title.classList.toggle('hided');
})