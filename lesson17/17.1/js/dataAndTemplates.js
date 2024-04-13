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

  //processing buy button
  const buyButton = resultElement.querySelector('.single-product__buy')
  buyButton.addEventListener('click', () => {
    alert(`You have successfully purchased ${productObject.title}. Thank you for choosing our store!`)
    renderBuyForm()
  })

  return resultElement
}

export function renderTemplate(parentElement, productTemplate) {
  parentElement.append(productTemplate)
  return productTemplate
}

function renderBuyForm(parentElement = null, productObject = null) {
  const template = `
    <h1>Purchase productName</h1>
    <form>
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
      <button type="submit" class="btn btn-primary mb-3">Buy</button>
    </form>`
const resultElement  = document.createElement('div');
resultElement.classList.add('container', 'card', 'single-product__card', 'buy-form');
resultElement.innerHTML = template;
console.log(resultElement);
}