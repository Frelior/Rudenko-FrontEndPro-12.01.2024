const someArray = [1, 'a', 2, 'b', 3, NaN, 4, 'd', 5, 'e', 6, 'f', 7, 'g', 8, 'h', 9, 'i', 10, 'j'];

function getAverage(array) {
    const numbers = array.filter(item => Number.isFinite(item));
    const result = numbers.reduce((sum, current) => sum + current ,0) / numbers.length;
    return result
}

console.log(getAverage(someArray))