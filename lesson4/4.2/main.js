console.log('****************First part****************');
let firstCycleResult = '';
for (let i = 20; i <= 30; i += 0.5) {
    firstCycleResult += ' ' + i;
}
console.log(firstCycleResult);


console.log('****************Second part****************');
for (let i = 10; i <= 100; i += 10) {
    console.log(`${i} dollars cost ${i*27} uah`);
}


console.log('****************Third part****************');
const someNumber = 54;
for (let i = 1; i*i <= someNumber; i++) {
    console.log(i);
}

console.log('****************Fourth part****************');
function isPrime(number) {
    if (number <= 1) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}
console.log(isPrime(9));

console.log('****************Fifth part****************');
function isPowerOfThree(number) {
    if (number <= 0) return false;
    for (let i = 1; i < number; i++){
        if (Math.pow(3, i) === number) {
            return true;
        }
    };
    return false;
}
console.log(isPowerOfThree(81));