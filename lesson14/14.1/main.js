const array = [1, 2, 3, 4, 5, 6, [1, 2, 3, 4], 7, 8, 9]

const body = document.querySelector('body')

function generateList(domElement, array) {
    const newList = document.createElement('ul')

    array.forEach(element => {
        const newListItem = document.createElement('li')
        newList.append(newListItem)

        if (Array.isArray(element)){
            generateList(newListItem, element)
        } else{
            newListItem.innerHTML = element
        }
    });

    domElement.append(newList)
}

generateList(body, array)