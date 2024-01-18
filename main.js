function Hello() {
    const userName = prompt("What is your name?") || 'mr. incognito'; ;
    alert(`Hello, ${userName}! How are you?`);
}
const btn = document.querySelector('#btn');
btn.addEventListener('click', Hello);
Hello();