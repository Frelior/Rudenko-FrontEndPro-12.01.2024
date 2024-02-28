function makeTable(tr = 10, td = 10) {
    const newTable = document.createElement('table')
    document.body.append(newTable)
    let counter = 0
    
    for(let i = 0; i < tr; i++){
        const newTr = document.createElement('tr')
        newTable.append(newTr)
        for(let i = 0; i < td; i++){
            counter++
            const newTd = document.createElement('td')
            newTd.innerHTML = counter
            newTr.append(newTd)
        }
    }
}