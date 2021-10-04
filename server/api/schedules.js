module.exports = function(app, db) {

    // Get all schedules
    app.get("/api/schedules", (req, res) => {
        console.log("get schedules")
        let out = [
            { "from": "michele", "to": "Mirella", "idRoom": 1234 },
            { "from": "Nicola", "to": "Mirella", "idRoom": 456 }
        ]
        res.send(out) 
    })

    // Get a single schedule
    app.get("/api/schedule", (req, res) => {
        console.log("get /api/schedule")
        let out = {  "from": "michele", "to": "Mirella", "idRoom": 1234  }
        res.send(out)
    })

    // Create a new schedule
    app.post("/api/schedule", (req, res) => {
        console.log("post /api/schedule ", req.body)
        let out = {"ok": true, "count": 1}
        res.send(out)
    })

    // Update a schedule
    app.put("/api/schedule", (req, res)  => {
        let out = {"ok": true, "count": 1}
        res.send(out)
    })

    // Delete a schedule
    app.delete("/api/schedule", (req, res) => {   
        let out = {"ok": true, "count": 1}
        res.send(out)
    }) 
}
