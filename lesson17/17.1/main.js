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
    document.querySelector('.show-button').removeEventListener('click', clearLocalStorageList)
    document.querySelector('.show-button').addEventListener('click', renderLocalStorage)
}

function renderLocalStorage() {
    const storageList = document.querySelector('.storage-list')
    navList.innerHTML = ''
    storageList.innerHTML = ''
    const storage = []

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const value = localStorage.getItem(key)
        storage.push(JSON.parse(value))
    }

    storage.forEach(product => {
        const productListItem = document.createElement('li')
        productListItem.classList.add('product')
        productListItem.innerHTML = `${product.date} - ${product.price}$`
        storageList.append(productListItem)
    })
    document.querySelector('.show-button').removeEventListener('click', renderLocalStorage)
    document.querySelector('.show-button').addEventListener('click', clearLocalStorageList)
    document.querySelector('.show-button').innerHTML = 'Show categories'

    storageList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI'){
            const productObject = JSON.parse(localStorage.getItem(event.target.innerHTML.slice(0, -1)))

            productCard.innerHTML = ''

            const objectInfo = []

            const title = document.createElement('h2')
            title.textContent = 'PURCHASE DETAILS'
            objectInfo.push(title)

            for (let [key, value] of Object.entries(productObject)) {
                if (key === 'title') {
                    const element = document.createElement('h3')
                    element.textContent = value
                    objectInfo.push(element)
                } else{
                    const element = document.createElement('p')
                    element.textContent = `${key[0].toUpperCase() + key.slice(1)}: ${value}`
                    objectInfo.push(element)
                }

            }
            productCard.append(...objectInfo)

            const deleteButton = document.createElement('button')
            deleteButton.textContent = 'Delete from history'
            deleteButton.addEventListener('click', () => {
                productCard.innerHTML = ''
                localStorage.removeItem(event.target.innerHTML.slice(0, -1))
                renderLocalStorage()
            })
            productCard.append(deleteButton)
            
        }
    })
}

function clearLocalStorageList() {
    const storageList = document.querySelector('.storage-list')
    navList.innerHTML = ''
    storageList.innerHTML = ''
    document.querySelector('.show-button').innerHTML = 'Show previous purchases'
    renderCategories()
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
        element.innerHTML = `${key}: ${productObject[key]}`
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

    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Cancel'
    deleteButton.classList.add('modal-card__buy')
    deleteButton.addEventListener('click', () =>{
        modal?.remove()
    })

    const modalForm = modal.querySelector('.modal-card__info')
    modalForm.append(deleteButton)
    modalForm.addEventListener('submit', event => {
        event.preventDefault()
        const formData = new FormData(modalForm)
        const wrapper = document.createElement('div')
        const title = document.createElement('h3')
        title.textContent = `Info about purchase ${productObject.title}`
    
        wrapper.append(title)
        for (let [key, value] of formData.entries()){
            const element = document.createElement('div')
            element.textContent = `${key}: ${value}`
            wrapper.append(element)
        }
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'OK'
        deleteButton.addEventListener('click', () =>{
            renderCategories()
            modal?.remove()
        })
        wrapper.append(deleteButton)
        const modalParent = modalForm.parentElement
        modalParent.innerHTML = ''
        modalParent.append(wrapper)
        
        //add info about purchase in local storage
        const purchaseInfo = {
            title: productObject.title,
            brand: productObject.brand,
            price: productObject.price,
            amount: formData.get('Amount'),
            date: new Date().toLocaleDateString()
        }
        localStorage.setItem(`${purchaseInfo.date} - ${productObject.price}`, JSON.stringify(purchaseInfo))
    })

    body.append(modal)
}



