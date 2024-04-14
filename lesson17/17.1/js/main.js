import {fetchData, setProductTemplate, renderTemplate, setSingleProductTemplate, renderBuyForm, renderLocalStorage} from './dataAndTemplates.js';

const main = document.querySelector('.main');
const nav = document.querySelector('.body-nav');
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

function clearMainBlock() {
    const mainChildren = main.children
    for (let i = 0; i < mainChildren.length; i++) {
        if (!mainChildren[i].classList.contains('main-block')) {
            mainChildren[i].remove()
        }
    }
}

renderLocalStorage(nav)