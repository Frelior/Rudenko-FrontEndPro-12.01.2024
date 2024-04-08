import {fetchData, setProductTemplate, renderTemplate, setSingleProductTemplate} from './dataAndTemplates.js';

const main = document.querySelector('.main');
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
    productsList.innerHTML = ''
    const targetProducts = productsData[category]

    targetProducts.forEach(product => {
        const productElement = renderTemplate(productsList, setProductTemplate(product))

        productElement.addEventListener('click', (event) => {
            if (event.target.closest('.card')) {
                console.log(product);
                renderSingleProduct(product)
            }
        })
    })
}

function renderSingleProduct(product) {
    const singleProduct = renderTemplate(main, setSingleProductTemplate(product))
    return singleProduct
}