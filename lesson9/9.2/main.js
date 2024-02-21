// I suppose that the array should consist of numbers, as I need to sort it
const userArray = prompt('Введите числа через пробел')?.split(' ').map(item => +item) || [1, 22, 3, 4, 567, 6, 17, 8, 9, 10];

if (userArray.every(item => Number.isFinite(item))) {
    alert("массив " + userArray);
    userArray.sort((a, b) => a - b);
    alert("отсортированный массив " + userArray);
    userArray.splice(1, 3);
    alert("массив после удаления " + userArray);
} else {
    alert("вы ввели не числа");
}