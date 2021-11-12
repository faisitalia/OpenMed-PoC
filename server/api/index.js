const express = require("express")
const mongo = require("mongodb");
const users = require("./users.js")
const schedules = require("./schedules.js")
const logins = require("./logins.js")
const path = require("path")

module.exports = async function(app, rootDir) {
    const mongoUrl = process.env.OPENMED_DB_URL || "mongodb://localhost"
    const mongoDb = process.env.OPENMED_DB_NAME || "openmed"

    const client =  new mongo.MongoClient(mongoUrl)
    await client.connect()
    const db = client.db(mongoDb)

    app.use(express.json())
    app.use(express.static(rootDir));
	app.get('/app/*', (req, res) => {
		let file = rootDir+"/index.html"
		res.sendFile(file)
	})
    users(app, db)
    schedules(app, db)
    logins(app, db)
}
