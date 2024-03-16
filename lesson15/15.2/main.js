const form = document.querySelector('.register-form')


form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form)
    form.innerHTML = ''
    const newElements = []

    // processing form values
    for (let [key,value] of formData.entries()) {
        if (key !== 'Lang') {
            const newItem = document.createElement('div')
            newItem.textContent = `${key}: ${value}`
            newElements.push(newItem)
        }
    }
    // processing launguages
    const newItemLang = document.createElement('div')
    newItemLang.textContent = `Languages: ${formData.getAll('Lang')}`
    newElements.push(newItemLang)

    form.append(...newElements)
})