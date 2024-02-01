let numOrStr = prompt('input number or string');
console.log(numOrStr)

switch (true) {
    case numOrStr === null:
        console.log('ви скасували');
        break;
    case numOrStr.trim() === '':
        console.log('Empty String');
        break;
    case /[a-zA-Zа-яА-Я].*\d|\d.*[a-zA-Zа-яА-Я]/.test(numOrStr):
        console.log('number is Ba_NaN');
        break;
    default:
        console.log('OK! default');
}
