const express = require("express")
const mongo = require("mongodb");
const users = require("./users.js")
const schedules = require("./schedules.js")
const logins = require("./logins.js")
const files = require("./files.js")
const path = require("path")
const bodyParser = require('body-parser')

module.exports = async function(app, rootDir) {
    const mongoUrl = process.env.OPENMED_DB_URL || "mongodb://localhost"
    const mongoDb = process.env.OPENMED_DB_NAME || "openmed"

    const client =  new mongo.MongoClient(mongoUrl)
    await client.connect()
    const db = client.db(mongoDb)

    app.use(express.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(rootDir));
	app.get('/app/*', (req, res) => {
		let file = rootDir+"/index.html"
		res.sendFile(file)
	})
    files(app)
    users(app, db)
    schedules(app, db)
    logins(app, db)
}
