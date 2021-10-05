const https = require("https")
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

console.log("serving " + rootDir)

const tls =
{
    cert: fs.readFileSync(config.https.tls.cert),
    key: fs.readFileSync(config.https.tls.key)
};

httpsServer = https.createServer(tls, app);
httpsServer.listen(port, config.https.listenIp, () => {
        console.log(`Development server app listening at http://localhost:${port}`)
    });
