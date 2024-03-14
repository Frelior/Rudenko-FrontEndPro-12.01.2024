import { fetchData } from './fetchData.js';
const navList = document.querySelector('.nav-list')
const productsList = document.querySelector('.products')
const productCard = document.querySelector('.product-card')
const productsArray = [];
const categoriesSet = new Set();

fetchData(productsArray,categoriesSet).then(() => renderCategories()).catch(error => console.log(error))


function renderCategories() {

    categoriesSet.forEach(category => {
        const categoryListItem = document.createElement('li')
        categoryListItem.classList.add('nav-item')
        categoryListItem.innerHTML = category.charAt(0).toUpperCase() + category.slice(1)
        navList.append(categoryListItem)
    })

    navList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI'){
            productCard.innerHTML = ''
            renderProductsByCategory(event.target.innerHTML.toLowerCase())
        }
    })
}

function renderProductsByCategory(category) {
    const targetProducts = productsArray.filter(product => product.category === category)
    productsList.innerHTML = ''

    targetProducts.forEach(product => {
        const productListItem = document.createElement('li')
        productListItem.classList.add('product')
        productListItem.innerHTML = product.title
        productsList.append(productListItem)
    })

    productsList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI'){
            const productObject = targetProducts.find(obj => obj.title === event.target.innerHTML)
            console.log(productObject);
            renderProductDetails(productObject)
        }
    })
}

function renderProductDetails(productObject) {
    productCard.innerHTML = ''
    const keys = ['title', 'brand', 'price', 'description']

    const productImage = document.createElement('img')
    productImage.src = productObject.images[0]
    productImage.classList.add('product-card__img')
    productCard.append(productImage)

    //text section in product card
    keys.forEach(key => { 
        const element = document.createElement(key === 'title' ? 'h2' : 'p');
        element.classList.add(`product-card__${key}`)
        element.innerHTML = productObject[key]
        productCard.append(element)
    })

    const productButton = document.createElement('button')
    productButton.classList.add('product-card__btn')
    productButton.innerHTML = 'Buy'
    productButton.addEventListener('click', event => {
        alert(`You have successfully purchased ${productObject.title}. Thank you for choosing our store!`)
        productsList.innerHTML = ''
        productCard.innerHTML = ''
    })
    productCard.append(productButton)
}
