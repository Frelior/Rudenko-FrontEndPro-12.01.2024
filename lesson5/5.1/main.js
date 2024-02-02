function powpow(num, degree) {
    return degree === 0 ? 1 :  num * powpow(num, degree-1);
}

console.log(powpow(3,7));