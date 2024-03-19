import { fetchData } from './fetchData.js';
import { modalElement } from './modalElement.js';
const navList = document.querySelector('.nav-list')
const main = document.querySelector('.main')
const body = document.getElementById('body')
const productCard = document.querySelector('.product-card')
const productsArray = [];
const categoriesSet = new Set();

fetchData(productsArray,categoriesSet).then(() => renderCategories()).catch(error => console.log(error))


function renderCategories() {
    main.classList.add('display-none')
    main.innerHTML = ''
    productCard.innerHTML = ''
    navList.innerHTML = ''

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
    main.innerHTML = ''
    const title = document.createElement('h2')
    title.textContent = 'PRODUCTS'
    main.append(title)
    main.classList.remove('display-none')

    targetProducts.forEach(product => {
        const productListItem = document.createElement('li')
        productListItem.classList.add('product')
        productListItem.innerHTML = product.title
        main.append(productListItem)
    })

    main.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI'){
            const productObject = targetProducts.find(obj => obj.title === event.target.innerHTML)
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

    keys.forEach(key => { 
        const element = document.createElement(key === 'title' ? 'h2' : 'p');
        element.classList.add(`product-card__${key}`)
        element.innerHTML = productObject[key]
        productCard.append(element)
    })

    const productButton = document.createElement('button')
    productButton.classList.add('product-card__btn')
    productButton.innerHTML = 'Buy'
    productButton.addEventListener('click', event =>{
        renderModalWindow(productObject)
    })
    productCard.append(productButton)
}

function renderModalWindow(productObject) {
    const tempContainer = document.createElement('div')
    tempContainer.innerHTML = modalElement
    const modal = tempContainer.firstChild
    modal.querySelector('h3').textContent = productObject.title
    const modalForm = modal.querySelector('.modal-card__info')

    modalForm.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData(modalForm)
        const wrapper = document.createElement('div')
        const title = document.createElement('h3')
        title.textContent = `Info about purchase ${productObject.title}`
    
        wrapper.append(title)
        for (let [key, value] of formData.entries()){
            console.log(key, value);
            const element = document.createElement('div')
            element.textContent = `${key}: ${value}`
            wrapper.append(element)
        }
        const closeButton = document.createElement('button')
        closeButton.textContent = 'OK'
        closeButton.addEventListener('click', () =>{
            renderCategories()
            modal?.remove()
        })
        wrapper.append(closeButton)
        const modalParent = modalForm.parentElement
        modalParent.innerHTML = ''
        modalParent.append(wrapper)
        
    })

    console.log(modal, productObject, modalForm);
    body.append(modal)
}