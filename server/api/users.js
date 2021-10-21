module.exports = function(app, db) {

    // Get all users
    app.get("/api/users", async(req, res) => {
        let data = await db.collection("anagrafica").find().toArray()
        //console.log("get /api/users", data)
        res.send(data) 
    })

    // Get a single user
    app.get("/api/user/:id", async(req, res) => {
        console.log("get /api/user", req.params.id)
        //let out = { "id": "michele", "email": "michele@example.com" }
        let id = req.params.id
        let data = await db.collection("anagrafica").findOne( {"CF": id })
        res.send(data)
    })

    // Create a new user
    
    app.post("/api/user", async(req, res) => {
        console.log("post /api/user ", req.body)
        let out = await db.collection("anagrafica").insertOne(req.body)
        //let out = { "id": "michele", "email": "michele@example.com" }
        res.send(out)
       // res.send(out)
    })

    // Update a user
    app.put("/api/user", async(req, res)  => {
        //let out = {"ok": true, "count": 1}
        let data = req.body
        console.log("put /api/user ", data)
        let id = data._id 
        delete data._id
        let upd = {"$set":data}
        let out = await db.collection("anagrafica").updateOne({"CF":data.CF},upd)
        res.send(out)
    })

    // Delete a user
    app.delete("/api/user", async(req, res) => {   
        //let out = {"ok": true, "count": 1}
        let data = req.body
        console.log(data)
        let out = await db.collection("anagrafica").deleteOne( { CF: data.CF } )
        res.send(out)
    }) 
}
