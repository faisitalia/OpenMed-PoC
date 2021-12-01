const config = require("../config.js")
const mailer = require("nodemailer").createTransport(config.mailer)

function sendmail(dest, subject, html) {
    return mailer.sendMail({
      "to": dest,
      "subject": subject,
      "html": html
    }).then(console.log)
    .catch(console.error)
}

function message(roomId,peerId) {
    return `
<h1>Tuo appuntamento</h1>

<p>Hai una visita sulla piattaforma openmed il 15/10/2021 alle 10.00</p>

<a href="https://${config.openmed.publicHostname}:${config.openmed.publicPort}/app/conference?roomId=${roomId}&peerId=${peerId}">Clicca qui per effettuare la visita online</a>.
`
}

module.exports = function(app, db) {
    // Get all schedules
    app.get("/api/schedules/:cf", async(req, res) => {
        console.log("get /api/schedules")
        //let out = { "id": "michele", "email": "michele@example.com" }
        let CFUser = req.params.cf;
        let data = await db.collection("schedule").find( {"CF": CFUser }).toArray()
        res.send(data) 
    })

    // Get a single schedule
    app.get("/api/schedule/:role", async(req, res) => {
        console.log("get /api/schedule", req.params.role)
        //let out = { "id": "michele", "email": "michele@example.com" }
        let role = req.params.role
        let data = await db.collection("anagrafica").find( {"ruolo": role }).toArray()
        res.send(data)
    })

    // Create a new schedule
    app.post("/api/schedule", async(req, res) => {
        console.log("post /api/schedule ", req.body)
        let out = await db.collection("schedule").insertOne(req.body)
        let roomId = out.insertedId ;
        let peerId = req.body.paziente._id;
        await sendmail(req.body.paziente.email, "Your Medical Visit", message(roomId,peerId))
        res.send(out)
    })

    // Update a schedule
    app.put("/api/schedule", async(req, res)  => {
        console.log("post /api/schedule ", req.body)
        let out = await db.collection("schedule").insertOne(req.body)
        res.send(out)
    })

    // Delete a schedule
    app.delete("/api/schedule", (req, res) => {   
        let out = {"ok": true, "count": 1}
        res.send(out)
    }) 
}
