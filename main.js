const listItems = document.querySelectorAll('.link');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!?@#$%^&*()_+{}|:<>?';

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


















// listItems.forEach((item) => {
//     item.addEventListener('mouseover', () => {
//         if (!item.classList.contains('shuffling')) {
//             item.classList.add('shuffling');
//             let originalValue = item.textContent;
//             for (let i = 0; i < 10; i++) {
//                 setTimeout(() => {
//                     let newText = '';
//                     for (let letter of originalValue) {
//                         const randomIndex = Math.floor(Math.random() * alphabet.length);
//                         newText += alphabet[randomIndex];
//                     }
//                     item.textContent = newText;
//                 }, i * 30);
//             }
//             setTimeout(() => {
//                 item.textContent = originalValue;
//                 item.classList.remove('shuffling');
//             }, 10 * 30);
//         }
//     })
// })
