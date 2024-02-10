function accum() {
    result = 0;

    return (number) => {
        result += number;
        return result;
    }
}

const sum = accum();
console.log(sum(3));
console.log(sum(5));
console.log(sum(20));