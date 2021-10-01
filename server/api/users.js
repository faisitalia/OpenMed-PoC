module.exports = function(app, db) {

    // Get all users
    app.get("/api/users", (req, res) => {
        let out = [
            { "id": "michele", "email": "michele@example.com" },
            { "id": "mirella", "email": "mirella@example.com" }
        ]
        res.send(out) 
    })

    // Get a single user
    app.get("/api/user", (req, res) => {
        let out = { "id": "michele", "email": "michele@example.com" }
        res.send(out)
    })

    // Create a new user
    app.post("/api/user", (req, res) => {
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