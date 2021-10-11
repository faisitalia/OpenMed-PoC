
const mongo = require("mongodb");
const mongoUrl = process.env.OPENMED_DB_URL || "mongodb://localhost"
const mongoDb = process.env.OPENMED_DB_NAME || "openmed"

async function init() {
    const client =  new mongo.MongoClient(mongoUrl)
    await client.connect()
    const db = client.db(mongoDb)
    return db
}

let repl = require("repl").start();
init().then( db => repl.context["db"] = db)
