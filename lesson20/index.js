import {createServer} from "http"
import {readFile} from "fs"

const server = createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    readFile('./public/index.html',(err, data) => {
        if(err) throw err
        res.end(data)
    })
    
})

server.listen(3000, (e) => console.log('Server started on port 3000', e))