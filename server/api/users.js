module.exports = function(app, db) {

    // Get all users
    app.get("/api/users", (req, res) => {
        console.log("GET /api/users")
        let out = [
            { "id": "michele", "email": "michele@sciabarra.com" },
            { "id": "mirella", "email": "mirella@sciabarra.com" }
        ]
        res.send(out) 
    })

    // Get a single user
    app.get("/api/user", (req, res) => {
        console.log("get /api/user")
        let out = { "id": "michele", "email": "michele@example.com" }
        res.send(out)
    })

    // Create a new user
    app.post("/api/user", (req, res) => {
        console.log("post /api/user ", req.body)
        let out = { "id": "michele", "email": "michele@example.com" }
        res.send(out)
    })

    // Update a user
    app.put("/api/user", (req, res)  => {
        let out = {"ok": true, "count": 1}
        res.send(out)
    })

    // Delete a user
    app.delete("/api/user", (req, res) => {   
        let out = {"ok": true, "count": 1}
        res.send(out)
    }) 
}
