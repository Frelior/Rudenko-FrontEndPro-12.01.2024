const firstNumber = prompt('insert first number') || 0;
const secondNumber = prompt('insert second number') || 0;

alert(`
    ${firstNumber} + ${secondNumber} = ${+firstNumber + +secondNumber}
    ${firstNumber} - ${secondNumber} = ${+firstNumber - +secondNumber}
    ${firstNumber} * ${secondNumber} = ${+firstNumber * +secondNumber}
    ${firstNumber} / ${secondNumber} = ${+firstNumber / +secondNumber}
    `)
    