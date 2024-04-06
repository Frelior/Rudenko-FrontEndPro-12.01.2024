export async function fetchData(productsArray, categoriesSet) {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();

  data.products.forEach(item => {
    productsArray.push(item);
    categoriesSet.add(item.category);
  });
}