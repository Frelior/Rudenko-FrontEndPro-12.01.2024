import {fetchData, setProductTemplate, renderTemplate, setSingleProductTemplate} from './dataAndTemplates.js';

const main = document.querySelector('.main');
const nav = document.querySelector('.body-nav');
const buttonPrevioustOrders = document.querySelector('.btn-previous');
const productsList = document.querySelector('.products-list');
const productsData = {};


fetchData(productsData)
    .then(() => {
        const categoriesList = document.querySelector('.categories')
        categoriesList.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                renderProductsByCategory(event.target.innerHTML.toLowerCase().trim())
            }
        })
    })
.catch(error => console.log(`Failed to fetch products data\n${error}`))

buttonPrevioustOrders.addEventListener('click', () => {
    renderLocalStorage(nav)
})

function renderProductsByCategory(category) {
    productsList.innerHTML = ''
    const targetProducts = productsData[category]

    targetProducts.forEach(product => {
        const productElement = renderTemplate(productsList, setProductTemplate(product))

        productElement.addEventListener('click', (event) => {
            if (event.target.closest('.card')) {
                const singleProduct = renderSingleProduct(product)

                // processing buy button
                const buyButton = singleProduct.querySelector('.single-product__buy')
                buyButton.addEventListener('click', () => {
                  renderBuyForm(main, product)
                })
            }
        })
    })
}

function renderSingleProduct(product) {
    const singleProduct = renderTemplate(main, setSingleProductTemplate(product))
    return singleProduct
}

function renderBuyForm(parentElement, productObject) {
const template = `<div class="buy-form__container">
<h1>Purchase ${productObject.title}</h1>
<form class="buy-form__form">
    <div class="mb-1">
    <label for="firstName" class="form-label">First name</label>
    <input type="text" class="form-control" id="firstName" required>
    <label for="secondName" class="form-label">Last name</label>
    <input type="text" class="form-control" id="lastName" required>
    </div>
    <div class="mb-1">
    <label for="city" class="form-label">City</label>
    <select class="form-select" id="city" required>
        <option selected disabled value="">Choose your city</option>
        <option>Kharkiv</option>
        <option>Kyiv</option>
        <option>Lviv</option>
    </select>
    </div>
    <div class="mb-1">
    <label for="postOffice" class="form-label">Nova Post Office</label>
    <input type="text" class="form-control" id="postOffice" required>
    </div>
    <div class="mb-1">
    <label for="paymentMethod" class="form-label">Payment method</label>
    <select class="form-select" id="paymentMethod" required>
        <option selected disabled value="">Choose your payment method</option>
        <option>Card</option>
        <option>Cash</option>
    </select>
    </div>
    <div class="mb-1">
    <label for="quantity" class="form-label">Quantity</label>
    <input type="number" class="form-control" id="quantity" required>
    </div>
    <div class="mb-1">
    <label for="comment" class="form-label">Comment</label>
    <textarea class="form-control" id="comment" rows="3"></textarea>
    </div>
    <div class="buy-form__buttons">
    <button type="submit" class="btn btn-primary mb-3">Buy</button>
    <button type="button" class="btn btn-secondary mb-3" id="buy-form__cancel">Cancel</button>
    </div>
</form>
</div>`
const resultElement  = document.createElement('div');
resultElement.classList.add('card', 'single-product__card', 'buy-form');
resultElement.innerHTML = template;

const cancelButton = resultElement.querySelector('#buy-form__cancel')
cancelButton.addEventListener('click', () => {
    resultElement.remove()
})


// processing order
const buyForm = resultElement.querySelector('.buy-form__form')

buyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const firstName = buyForm.querySelector('#firstName')
    const lastName = buyForm.querySelector('#lastName')
    const city = buyForm.querySelector('#city')
    const postOffice = buyForm.querySelector('#postOffice')
    const paymentMethod = buyForm.querySelector('#paymentMethod')
    const quantity = buyForm.querySelector('#quantity')
    const comment = buyForm.querySelector('#comment')

    const order = {
    productObjectId: productObject.id,
    productTitle: productObject.title,
    orderPrice: productObject.price * quantity.value,
    firstName: firstName.value,
    lastName: lastName.value,
    city: city.value,
    postOffice: postOffice.value,
    paymentMethod: paymentMethod.value,
    quantity: quantity.value,
    comment: comment.value,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
    }

    addOrderToLocalStorage(order)
    alert(`Thank you for buying ${productObject.title}!`)
    resultElement.remove();
})


parentElement.append(resultElement)
}

function addOrderToLocalStorage(order) {
const orders = JSON.parse(localStorage.getItem('orders')) || []
orders.push(order)
localStorage.setItem('orders', JSON.stringify(orders))
}

function renderLocalStorage(parentElement) {
const template = `
    <ul class="nav nav-pills flex-column mb-auto categories"></ul>
    <hr>
    <button class = "btn btn-outline-light btn-sm btn-close-previous">Back</button>`

const resultElement  = document.createElement('div');
resultElement.classList.add('d-flex', 'flex-column', 'flex-shrink-0', 'p-3', 'text-white','bg-dark', 'local-storage', 'style="width:280px;"');
resultElement.innerHTML = template;
const ul = resultElement.querySelector('ul')

//rendering orders
const orders = JSON.parse(localStorage.getItem('orders')) || []
orders.forEach(order => {
    const li = document.createElement('li')
    li.classList.add('nav-link', 'text-white')
    li.innerHTML = `${order.productTitle} - ${order.orderPrice}$. ${order.date}<hr></hr>`
    ul.append(li)

    li.addEventListener('click', () => {
        renderOrderDetails(parentElement, order, orders, resultElement)
    })
})

//processing close button
const closeButton = resultElement.querySelector('.btn-close-previous')
closeButton.addEventListener('click', () => {
    resultElement.remove()
})

parentElement.append(resultElement)
}

function renderOrderDetails(parentElement, orderObject, ordersArray, localStorageList) {
const template = `
<div class="card single-product__card">
    <h4 class="card-title">Info about order:</h4>
    <ul>
    <li>Product: ${orderObject.productTitle}</li>
    <li>Quantity: ${orderObject.quantity}</li>
    <li>Price overall: ${orderObject.orderPrice}$</li>
    <li>Date: ${orderObject.date}</li>
    <li>Payment method: ${orderObject.paymentMethod}</li>
    <li>First name: ${orderObject.firstName}</li>
    <li>Last name: ${orderObject.lastName}</li>
    <li>City: ${orderObject.city}</li>
    <li>Post office: ${orderObject.postOffice}</li>
    <li>Comment: ${orderObject.comment}</li>
    </ul>
    <button class="btn btn-outline-dark btn-sm btn-close-back">Back</button>
    <hr>
    <button class="btn btn-outline-dark btn-sm btn-close-delete">Delete</button>
</div>`

const resultElement  = document.createElement('div');
resultElement.classList.add('single-product');
resultElement.innerHTML = template;

const closeButton = resultElement.querySelector('.btn-close-back')
closeButton.addEventListener('click', () => {
    resultElement.remove()
})

const deleteButton = resultElement.querySelector('.btn-close-delete')
deleteButton.addEventListener('click', () => {
    const newOrders = ordersArray.filter(order => order !== orderObject)
    localStorage.setItem('orders', JSON.stringify(newOrders))
    resultElement.remove()
    localStorageList.remove()
    renderLocalStorage(parentElement)
})

parentElement.append(resultElement)
}