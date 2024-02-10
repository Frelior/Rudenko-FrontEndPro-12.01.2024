let testArray = [1,2,3,4,'5',6,7,8,9,10];
function removeElement(array, item) {
    const index = array.indexOf(item);
    if (index !== -1) {
        array.splice(index,1)
    }
    return array;
}

console.log(removeElement(testArray, 9))
