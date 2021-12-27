<script>
    import { get, post, del } from "../util";
    import { onMount } from "svelte";

    import validate from "validate.js";
    validate.validators.presence.message = "non può essere vuoto";
    validate.validators.email.message = "Non è un indirizzo email valido";

    import moment from "moment";
    import {
        name,
        loggedUserCF,
        loggedId,
        role,
        loggedUser,
        hospital,
    } from "../state";

    // Hook up the form so we can prevent it from being posted
    let form = {};
    let errors = {};
    onMount(() => (form = document.querySelector("form#main")));

    function error(map, name) {
        if (!map) return;
        if (name in map) {
            let label = document.querySelector("label[for='" + name + "']");
            if (label) label.classList.add("text-red-500");
            return map[name].join("<br>");
        } else {
            let label = document.querySelector("label[for='" + name + "']");
            if (label) label.classList.remove("text-red-500");
        }
        return "";
    }

    // Before using it we must add the parse and format functions
    // Here is a sample implementation using moment.js
    validate.extend(validate.validators.datetime, {
        // The value is guaranteed not to be null or undefined but otherwise it
        // could be anything.
        parse: function (value, options) {
            return +moment.utc(value);
        },
        // Input is a unix timestamp
        format: function (value, options) {
            var format = options.dateOnly
                ? "YYYY-MM-DD"
                : "YYYY-MM-DD hh:mm:ss";
            return moment.utc(value).format(format);
        },
    });
    // These are the constraints used to validate the form
    var constraints = {
        data_prenotazione: {
            // The user needs to give a valide schedule data
            presence: true,
            // and must be after now
            date: {
                earliest: moment().subtract(1, "days"),
                message: " non valida, non si può prenotare prima di oggi",
            },
        },
        ambulatorio: {
      // paziente is required
        presence: true,
     },
        paziente: {
      // paziente is required
        presence: true,
     },
        
    };
    


    function submit(event) {
        // validate the form against the constraints
        errors = validate(form, constraints);
        if (!errors) {
            //alert("success");
            save(event);
        } else {
            console.log("errors", errors);
        }
    }

    let sent = false;

    let hours = [
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20"
    ];
    let minutes = [
        "00",
        "05",
        "10",
        "15",
        "20",
        "25",
        "30",
        "35",
        "40",
        "45",
        "50",
        "55",
    ];
    let selectedH, selectedM, selectedP;
    let usrCF = "";
    let selectedUser;
    let selectedSurgery;
    let msg = "";

    let data = {
        CF: $loggedUserCF,
        ora: selectedH + selectedM,
        confermato: true,
        period: 30,
    };

    async function loadDate(cf, d) {
        return get("/schedule/" + cf + "/" + d);
    }

    async function save(event) {
        event.preventDefault();
        data.ora = selectedH + ":" + selectedM;
        data.data = document.getElementById("data_prenotazione").value;
        data.paziente = selectedUser;
        data.idambulatorio = selectedSurgery;
        data.operatore = $name;

        let dsc = await loadDate(data.CF, data.data);
        let free = true;

        let ln = dsc.length;
        console.log("numero prenotazioni della data", ln);

        for (var i = 0; i < ln; i++) {
            let dsh = dsc[i];
            /*verifica che non ci siano sovrapposizioni di appuntamenti */
            const hm = dsh.ora.split(":");
            let inizio = new Date(dsh.data);
            inizio.setHours(hm[0]);
            inizio.setMinutes(hm[1]);
            let fine = new Date(inizio.getTime());
            inizio.setMinutes(inizio.getMinutes() + parseInt(dsh.period));
            //let fine = dsh.ora+dsh.period;
            let dataPrenotazioneAttuale = new Date(dsh.data);
            dataPrenotazioneAttuale.setHours(selectedH);
            dataPrenotazioneAttuale.setMinutes(selectedM);
            if (inizio < dataPrenotazioneAttuale < fine) {
                msg = "Attenzione esiste una prenotazione precedente";
                free = false;
            }
            console.log("Messaggio", msg);
        }
        if (free) {
            post("/schedule", data);
            msg = "";

            sent = true;
        }
    }

    let users;
    async function loadUsers() {
        users = await get("/schedule/Paziente/"+$hospital);
    }
    let surgeries;
    async function loadSurgery() {
        console.log("ospedale", $hospital);
        surgeries = await get("/schedules/" + $hospital);
    }
</script>

<div class="p-3">
    {#if sent}
        <div
            class="card shadow-2xl lg:card-side bg-primary text-primary-content"
        >
            <div class="card-body">
                <p>Richiesta inviata correttamente.</p>
                <div class="justify-end card-actions">
                    <button
                        class="btn btn-primary"
                        on:click={() => (sent = false)}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    {:else}
        <div class="card-bordered w-full">
            <div class="card-header">
                <h1 class="text-black text-lg">Nuovo appuntamento</h1>
            </div>

            <!-- svelte-ignore missing-declaration -->
            <h1><b>{msg}</b></h1>

            <form id="main" on:submit|preventDefault={submit}>
                <div class="form-control">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text text-black"
                            >Seleziona una data</span
                        >
                    </label>
                    <input
                        id="data_prenotazione"
                        class="input input-accent input-bordered w-1/3"
                        type="date"
                        placeholder="YYYY-MM-DD"
                        name="data_prenotazione"
                    />
                    <label for="data_prenotazione" class="label">
                        <span class="text-red"
                            >{error(errors, "data_prenotazione")}</span
                        >
                    </label>
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                </div>
                <div class="form-control w-1/2">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text text-black"
                            >Seleziona orario</span
                        >
                    </label>
                    <table class="table-fixed">
                        <tr>
                            <th class="border  w-1/4">
                                <select
                                    bind:value={selectedH}
                                    class="select select-bordered select-accent w-full max-w-xs "
                                >
                                    {#each hours as hour}
                                        <option value={hour}>
                                            {hour}
                                        </option>
                                    {/each}
                                </select>
                            </th>
                            <th class="border  w-1/4">
                                <select
                                    bind:value={selectedM}
                                    class="select select-bordered select-accent w-full max-w-xs "
                                >
                                    {#each minutes as minut}
                                        <option value={minut}>
                                            {minut}
                                        </option>
                                    {/each}
                                </select></th
                            >
                        </tr>
                    </table>
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text text-black"
                            >Indica la durata della visita</span
                        >
                    </label>
                    <table class="table-auto  left-0">
                        <tr>
                            <th class="border  w-1/6  left-0">
                                <input
                                    type="text"
                                    name="period"
                                    id="period"
                                    bind:value={data.period}
                                    class="input input-accent input-bordered w-full max-w-xs "
                                    placeholder="30"
                                />
                            </th>
                        </tr>
                    </table>
                </div>
                <div class="form-control">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text text-black"
                            >Seleziona ambulatorio</span
                        >
                    </label>
                    {#await loadSurgery()}
                        <p>Caricamento...</p>
                    {:then}
                        <select
                            bind:value={selectedSurgery}
                            class="select select-bordered select-accent w-full max-w-xs"
                            name="ambulatorio"
                            id="paziente"
                        >
                            <option disabled="disabled">Ambulatorio</option>
                            {#each surgeries as srg}
                                <option value={srg}>
                                    {srg.idambulatorio}
                                </option>
                            {/each}
                        </select>
                    {/await}
                    <label for="ambulatorio" class="label">
                        <span class="text-red"
                            >{error(errors, "ambulatorio")}</span
                        >
                    </label>
                </div>
                <br />
                <div class="form-control">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text text-black"
                            >Seleziona paziente</span
                        >
                    </label>
                    {#await loadUsers()}
                        <p>Caricamento...</p>
                    {:then}
                        <select
                            bind:value={selectedUser}
                            class="select select-bordered select-accent w-full max-w-xs"
                            name="paziente"
                            id="paziente"
                        >
                            <option disabled="disabled">Paziente</option>
                            {#each users as usr}
                                <option value={usr}>
                                    {usr.nome}
                                    {usr.cognome}
                                </option>
                            {/each}
                        </select>
                    {/await}
                    <label for="paziente" class="label">
                        <span class="text-red"
                            >{error(errors, "paziente")}</span
                        >
                    </label>
                </div>
                <br />
                <div class="form-control">
                    <button
                        class="btn btn-accent content-center max-w-xs"
                        type="submit"
                        color="primary"
                        block
                        href="pages/authentication/login">Prenota</button
                    >
                </div>
            </form>
        </div>
    {/if}
</div>
