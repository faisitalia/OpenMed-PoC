const express = require('express')
const path = require("path")
const port = process.env.PORT || "3000"
const app = express()
const api = require('./api')

// start server
const rootDir = path.dirname(__dirname)+"/client/public"
console.log("serving "+rootDir)

api(app, rootDir)
app.listen(parseInt(port), () => {
    console.log(`Example app listening at http://localhost:${port}`)
})