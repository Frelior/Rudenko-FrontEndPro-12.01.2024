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

const rows = +prompt('imput number of rows') || 10;
const columns = +prompt('imput number of columns') || 10;
makeTable(rows, columns)