export async function fetchData(dataObject) {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();

  data.products.forEach(item => {
    dataObject[item.category] = [...(dataObject[item.category] || []), item];
  });
}

export function setProductTemplate(productObject) {
  const template = `
  <div class="card" id= ${productObject.id} category=${productObject.category}>
      <div class="card-body">
      <h5 class="card-title">${productObject.title}</h5>
      <p class="card-text">Price: $${productObject.price}</p>
      </div>
  </div>`
  const resultElement  = document.createElement('div');
  resultElement.classList.add('col');
  resultElement.innerHTML = template;
  return resultElement
}

export function setSingleProductTemplate(productObject) {
  //making an html element from template
  const template = `
  <div class="card single-product__card">
      <button type="button" class="btn-close" aria-label="Close"></button>
      <img class="card-img-top" src="${productObject.images[0]}" alt="Image" />
      <hr>
      <div class="card-body">
        <h4 class="card-title">${productObject.title}</h4>
        <p class="card-text">Brand: ${productObject.brand}</p>
        <p class="card-text">Price: ${productObject.price}$</p>
        <p class="card-text">Description: ${productObject.description}</p>
        <button type="button" class="btn btn-primary single-product__buy">Buy</button>
      </div>
  </div>`
  const resultElement  = document.createElement('div');
  resultElement.classList.add('single-product');
  resultElement.innerHTML = template;

  // removing element if clicked ouside product card
  const card = resultElement.querySelector('.card')
  resultElement.addEventListener('click', (event) => {
    if (!card.contains(event.target) || event.target.classList.contains('btn-close')) {
        resultElement.remove()
    }
  })
  return resultElement
}

export function renderTemplate(parentElement, productTemplate) {
  parentElement.append(productTemplate)
  return productTemplate
}

export function renderBuyForm(parentElement, productObject) {
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
    console.log(order)
    resultElement.remove();
  })


  parentElement.append(resultElement)
}

function addOrderToLocalStorage(order) {
  const orders = JSON.parse(localStorage.getItem('orders')) || []
  orders.push(order)
  localStorage.setItem('orders', JSON.stringify(orders))
}

export function renderLocalStorage(parentElement) {
  const template = `
    <ul class="nav nav-pills flex-column mb-auto categories"></ul>
    <hr>
    <button>Back</button>
    <hr>`

  const resultElement  = document.createElement('div');
  resultElement.classList.add('d-flex', 'flex-column', 'flex-shrink-0', 'p-3', 'text-white', 'local-storage', 'style="width:280px;"');
  resultElement.innerHTML = template;
  const ul = resultElement.querySelector('ul')


  const orders = JSON.parse(localStorage.getItem('orders')) || []
  orders.forEach(order => {
    const li = document.createElement('li')
    li.classList.add('nav-link', 'text-white')
    li.innerHTML = `${order.productTitle} - ${order.orderPrice}. ${order.date}<hr></hr>`
    ul.append(li)
  })

  parentElement.append(resultElement)
}

//клик на ордер - вызывается функция renderOrderDetails(orderObject) появляется окно с деталями и кнопка делит
// клик на делит - заходим в локал сторедж, ищем в массиве order === orderObject и удаляем из масива, потом вставляем в локал сторедж