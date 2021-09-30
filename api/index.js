const express = require('express')
const app = express()
const port = 3000

const mongo = require("mongodb");
const client =  new mongo.MongoClient("mongodb://192.168.0.66")
let db = undefined

app.get('/', (req, res) => {
    res.send('Welcome!!!')
})

app.get('/prova', async(req, res) => {
    let products = db.collection("products")
    let data = await products.find().toArray()
    res.send(data)
})

client.connect().then(() => {
    db = client.db("shop");
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}).catch( (err) => console.log(err))

