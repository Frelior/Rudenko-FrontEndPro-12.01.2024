import {fetchData, setProductTemplate, renderTemplate} from './dataAndTemplates.js';


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
    .catch(error => console.log(error))


function renderProductsByCategory(category) {
    const targetProducts = productsData[category]
    productsList.innerHTML = ''
    
    targetProducts.forEach(product => {
        renderTemplate(productsList, setProductTemplate(product.title, product.price))
    })
}