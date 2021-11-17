const fs = require('fs')
const path = require("path")
const express = require('express')
const cors = require('cors')

const rootDir = path.dirname(__dirname) + "/client/public"
const config = require('./config')
const port = Number(config.https.listenPort)
const api = require('./api')

const app = express()
app.use(cors());
api(app, rootDir)


let protocol = "http"
let tls = {}
if (config.https.tls.cert != "") {
    tls = {
        cert: fs.readFileSync(config.https.tls.cert),
        key: fs.readFileSync(config.https.tls.key)
    };
    protocol = "https"
}

let server = require(protocol).createServer(tls, app);
server.listen(config.https.listenPort, config.https.listenIp, () => {
    console.log(`Development server listening at ${protocol}://localhost:${port}`)
});
