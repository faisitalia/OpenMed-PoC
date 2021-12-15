module.exports = function(app, db) {

    let ObjectId = require('mongodb').ObjectId;

    // Get all users
    app.get("/api/users/:hospital", async(req, res) => {
        let data = await db.collection("anagrafica").find({"idstruttura":req.params.hospital}).toArray()
        //console.log("get /api/users", data)
        res.send(data) 
    })

    // Get a single user
    app.get("/api/user/:id", async(req, res) => {
        console.log("get /api/user", req.params.id)
        //let out = { "id": "michele", "email": "michele@example.com" }
        let _id = new ObjectId(req.params.id)
        let data = await db.collection("anagrafica").findOne( {_id: _id })
        console.log(data)
        res.send(data)
    })

    let _id = "6199136ae3c68ef5bb529760"

    // Create a new user
    
    app.post("/api/user", async(req, res) => {
        console.log("post /api/user ", req.body)
        let out = await db.collection("anagrafica").insertOne(req.body)
        //let out = { "id": "michele", "email": "michele@example.com" }
        res.send(out)
       
    })

    // Update a user
    app.put("/api/user", async(req, res)  => {
        let data = req.body
        let _id = new ObjectId(data._id)
        delete data._id
        console.log("put /api/user ", data)
        let out = await db.collection("anagrafica").replaceOne({_id:_id},data)
        res.send(out)
    })


    // Delete a user
    app.delete("/api/user", async(req, res) => {   
        //let out = {"ok": true, "count": 1}
        let data = req.body
        let _id = new ObjectId(data._id)
        console.log(data)
        let out = await db.collection("anagrafica").deleteOne( { _id: _id } )
        res.send(out)
    }) 
}
