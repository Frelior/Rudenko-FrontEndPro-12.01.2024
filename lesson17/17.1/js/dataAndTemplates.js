export async function fetchData(dataObject) {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();

  data.products.forEach(item => {
    dataObject[item.category] = [...(dataObject[item.category] || []), item];
  });
}

export function setProductTemplate(productTitle, productPrice) {
  const template = `
  <div class="col">
  <div class="card">
      <div class="card-body">
      <h5 class="card-title">${productTitle}</h5>
      <p class="card-text">Price: $${productPrice}</p>
      </div>
  </div>
</div>`

  return template
}

export function renderTemplate(parentElement, productTemplate) {
  parentElement.insertAdjacentHTML('beforeend', productTemplate)
}