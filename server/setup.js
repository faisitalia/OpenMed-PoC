let db = undefined

async function store(coll, id, val) {
    let key = {}
    key[id] = val[id]
    console.log(coll, val)
    await db.collection(coll).updateOne(key, { $set: val }, { upsert: true })
}

module.exports = async function (_db) {
    db = _db
    await store("struttura", "id-struttura", {
        "id-struttura": "struttura1",
        "indirizzo": "Via Camelie 1 Torino",
        "id-ambulatorio": "ambulatorio1",
        "CF-amministratori": "SSSTTT05L05H777R"

    })
    await store("struttura", "id-struttura", {
        "id-struttura": "struttura2",
        "indirizzo": "Via Fiume 2 Roma",
        "id-ambulatorio": "ambulatorio2",
        "CF-amministratori": "SSSTTT05L05H777T",

    })
    await store("ambulatorio", "id-ambulatorio", {
        "id-ambulatorio": "ambulatorio1",
        "indirizzo": "Via Fiume 3 Roma",
        "id-stanza": "stanza1"
    })
    await store("ambulatorio", "id-ambulatorio", {
        "id-ambulatorio": "ambulatorio2",
        "indirizzo": "Via Fiume 4 Roma",
        "id-stanza": "stanza2"
    })
    await store("anagrafica", "CF", {
        "ruolo": "Administrator",
        "CF": "BBBEEE61C01W111Y",
        "nome": "OpenMed",
        "cognome": "Administrator",
        "indirizzo": "Via Arno 22 Roma",
        "cellulare": "33366666",
        "email": "openmed@faisitalia.it",
        "password": "pwd33",
        "id-struttura": "struttura2"
    })
    await store("anagrafica", "CF", {
        "ruolo": "Nurse",
        "CF": "TTTTTT61C01W111T",
        "nome": "OpenMed",
        "cognome": "Nurse",
        "indirizzo": "Via Fiasco 4 Torino",
        "cellulare": "33388888",
        "email": "noiopensource@gmail.com",
        "password": "pwd22",
        "id-struttura": "struttura1",
        "id-ambulatorio": "ambulatorio1"
    })
    await store("anagrafica", "CF", {
        "ruolo": "Patient",
        "CF": "SSSSSS61C01W111S",
        "nome": "OpenMed",
        "cognome": "Patient",
        "indirizzo": "Via Monte Conero 69 Torino",
        "cellulare": "3332589",
        "email": "nuvolarisorg@gmail.com",
        "password": "pwd11",
        "id-struttura": "struttura1",
        "id-ambulatorio": "ambulatorio1"
    })
    await store("anagrafica", "CF", {
        "ruolo": "Doctor",
        "CF": "DDDDKJ32F21F045H",
        "nome": "OpenMed",
        "cognome": "Doctor",
        "indirizzo": "Via Delle Quaglie 45 Torino",
        "cellulare": "3337777",
        "email": "info@faisitalia.it",
        "password": "pwd66",
        "id-struttura": "struttura1",
        "id-ambulatorio": "ambulatorio1"
    })
}
