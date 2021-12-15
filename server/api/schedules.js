const config = require("../config.js")
const mailer = require("nodemailer").createTransport(config.mailer)
let ObjectId = require('mongodb').ObjectId;


function sendmail(dest, subject, html) {
    return mailer.sendMail({
        "to": dest,
        "subject": subject,
        "html": html
    }).then(console.log)
        .catch(console.error)
}

function message(roomId, peerId, data, ora) {
    return `
    <h1>Tuo appuntamento</h1>

<p>Hai una visita sulla piattaforma openmed il ${data} alle ${ora}</p>

<a href="https://${config.openmed.publicHostname}:${config.openmed.publicPort}/app/conference?roomId=${roomId}&peerId=${peerId}">Clicca qui per effettuare la visita online</a>.
`
}

module.exports = function (app, db) {
    // Get all schedules
    app.get("/api/schedules/:cf/:role", async (req, res) => {
        console.log("get /api/schedules")
        //let out = { "id": "michele", "email": "michele@example.com" }
        let dataSched = "";
        let CFUser = req.params.cf;
        let role = req.params.role;
        if (role == "Paziente") {
            dataSched = await db.collection("schedule").find({ "paziente.CF": CFUser }).sort({data: 1}).toArray()
        }
        else {
            dataSched = await db.collection("schedule").find({ "CF": CFUser }).sort({data: 1}).toArray()
        }
        res.send(dataSched)
    });

    // Get surgery list
    app.get("/api/schedules/:hospital",async(req,res) => {
        console.log("get /api/schedules", req.params.hospital)
        let hospital = req.params.hospital;
        let data = await db.collection("ambulatorio").find({"idstruttura":hospital}).toArray();
        //data.infermiere = db.schedule.aggregate([{$lookup:{ from:"anagrafica", localField:"CF",foreignField:"CF", as: "ind"}}]).toArray()
        res.send(data)
    })


    // Get a single schedule
    app.get("/api/schedule/:role/:hospital", async (req, res) => {
        console.log("get /api/schedule", req.params.role)
        //let out = { "id": "michele", "email": "michele@example.com" }
        let role = req.params.role
        let data = await db.collection("anagrafica").find({ "ruolo": role, "idstruttura":req.params.hospital }).toArray()
        res.send(data)
    })

    // Get schedule in a day
    app.get("/api/schedule/:cf/:date", async (req, res) => {
        console.log("get /api/schedule/cf/date", req.params.cf+req.params.date)
        let dt = await db.collection("schedule").find({ "CF": req.params.cf, "data": req.params.date }).toArray();
        res.send(dt)
    })

    // Create a new schedule
    app.post("/api/schedule", async (req, res) => {
        console.log("post /api/schedule ", req.body)
        

        let out = await db.collection("schedule").insertOne(req.body)
        let roomId = out.insertedId;
        let peerId = req.body.paziente._id;
        let d = req.body.data.split("-").reverse().join("-");
        let h = req.body.ora;
        await sendmail(req.body.paziente.email, "Your Medical Visit", message(roomId, peerId, d, h))
        res.send(out)
    })

    // Update a schedule
    app.put("/api/schedule", async (req, res) => {
        console.log("post /api/schedule ", req.body)
        let out = await db.collection("schedule").insertOne(req.body)
        res.send(out)
    })

    // Delete a schedule
    app.del("/api/schedule/:dt", async(req, res) => {   
        //let out = {"ok": true, "count": 1}
        let data = req.params.dt
        let _id = new ObjectId(data)
        console.log("id",_id)
        let out = await db.collection("schedule").deleteOne( { _id: _id } )
        
        res.send(out)
    }) 
}
