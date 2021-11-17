let db = undefined

async function store(coll, id, val) {
    let key = {}
    key[id] = val[id]
    console.log(coll, val)
    await db.collection(coll).updateOne(key, {$set: val}, { upsert: true })
}

module.exports = async function(_db) {
    db = _db
    await store("test", "id", { "id": 1, "v": "uno" })
    await store("test", "id", { "id": 2, "v": "due" })
    await store("test", "id", { "id": 3, "v": "tre" })
}
