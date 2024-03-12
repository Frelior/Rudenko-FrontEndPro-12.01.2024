const array = [1, 222, 3, 44, 5, 6, [1, 2, 3, 4], 7, 8, 9, [1, 2, 3], 10, 11]
const body = document.querySelector('body')

function generateList(domElement, array, prefix = null) {
    const newList = document.createElement('ul')
    const newItems = []
    let callCounter = 0

    array.forEach(element => {
        const newListItem = document.createElement('li')
        const index = array.indexOf(element)

        if (Array.isArray(element)){
            generateList(newListItem, element, ++callCounter)
        } else{
            newListItem.innerHTML = `${prefix ? `${prefix}.` : ''}${index + 1}`
        }

        newItems.push(newListItem)
    });

    newList.append(...newItems)
    domElement.append(newList)
}

generateList(body, array)
