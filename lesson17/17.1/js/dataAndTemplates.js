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

