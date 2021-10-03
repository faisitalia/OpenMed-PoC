const https = require("https")
const fs = require('fs')
const path = require("path")
const express = require('express')
const port = process.env.PORT || "4443"
const cors = require('cors')

const rootDir = path.dirname(__dirname) + "/client/public"
const config = require('./config')
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
httpsServer.listen(
    Number(config.https.listenPort), config.https.listenIp, () => {
        console.log(`Development server app listening at http://localhost:${port}`)
    });

