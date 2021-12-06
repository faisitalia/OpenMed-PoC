<script>
    import { get, post, del } from "../util";
    import { onMount } from "svelte";

    import validate from "validate.js";
    validate.validators.presence.message = "Non può essere vuoto";
    validate.validators.email.message = "Non è un indirizzo email valido";

    import moment from "moment";
    import { name, loggedUserCF, role, loggedUser } from "../state";

    // Hook up the form so we can prevent it from being posted
    let form = {};
    onMount(() => (form = document.querySelector("form#main")));

    let dateErrorMessage;
    let timeErrorMessage;
    const scheduleValidator = (date, hour, minute) => {
        if(date == undefined || date == null || isNaN(date)) {
            dateErrorMessage = "Non hai selezionato una data valida";
            return;
        }

        const selected = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            parseInt(hour),
            parseInt(minute),
            0,
            0,
        );
        const now = new Date(Date.now());

        if(selected.getTime() > now.getTime()){ 
            return;
        }  // OK
        else if(selected.getDate() < now.getDate()) {
            dateErrorMessage = "Hai selezionato un giorno nel passato";
        }
        else {
            timeErrorMessage = "Hai selezionato un orario antecedente all'orario attuale";
        }
    }

    let patientErrorMessage;
    const patientValidator = (val) => {
        if (val==undefined || val==null || val=="Paziente"){
            patientErrorMessage = "Non hai selezionato il paziente";
        } else {
            return null;
        }
    }

    let durationErrorMessage;
    const durationValidator = (val) => {
        if (val==undefined || val==null) {
            // There's a `30` placeholder
            return;
        } else if (val<10) {
            durationErrorMessage = "Una visita dura almeno 10 min";
        } else if (val>60){
            durationErrorMessage = "Una visita non dura più di 60 min";
        } else {
            return null;
        }
    }

    function submit(event) {
        let errors = false;

        // validate the form against the constraints
        dateErrorMessage = null;
        timeErrorMessage = null;
        scheduleValidator(dateObject, selectedH, selectedM);
        if(dateErrorMessage != null) {
            errors = true;
            console.log(`Error: ${dateErrorMessage}`);
        }
        if(timeErrorMessage != null) {
            errors = true;
            console.log(`Error: ${timeErrorMessage}`);
        }

        patientErrorMessage = null;
        patientValidator(selectedUser);
        if(patientErrorMessage != null) {
            errors = true;
            console.log(`Error: ${patientErrorMessage}`);
        }

        durationErrorMessage = null;
        durationValidator(selectedInterval);
        if(durationErrorMessage != null) {
            errors = true;
            console.log(`Error: ${durationErrorMessage}`);
        }

        if (!errors) save(event);
    }

    let sent = false;

    let hours = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
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
        "20",
        "21",
        "22",
        "23",
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
    let selectedDate;
    $: dateObject = new Date(selectedDate);
    let selectedInterval;
    let selectedH, selectedM, selectedP;
    let usrCF = "";
    let selectedUser;

    let data = {
        CF: $loggedUserCF,
        ora: selectedH + selectedM,
        confermato: true,
    };

    function save(event) {
        event.preventDefault();
        data.ora = selectedH + ":" + selectedM;
        data.data = dateObject;
        data.paziente = selectedUser;
        data.period = selectedInterval;
        console.log(data);
        post("/schedule", data);
        sent = true;
    }

    let users;
    async function loadUsers() {
        users = await get("/schedule/Patient");
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
            <form id="main" on:submit|preventDefault={submit}>
                <div class="form-control">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text text-black"
                            >Seleziona una data</span
                        >
                    </label>
                    <input
                        id="scheduledata"
                        class="input input-accent input-bordered w-1/3"
                        type="date"
                        placeholder="YYYY-MM-DD"
                        name="scheduledata"
                        bind:value={selectedDate}
                    />
                    {#if dateErrorMessage!=null}
                        <label for="scheduledata" class="label">
                            <span class="text-red-500">
                                {dateErrorMessage}
                            </span>
                        </label>
                    {/if}
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
                    {#if timeErrorMessage!=null}
                        <p class="label">
                            <span class="text-red-500">
                                {timeErrorMessage}
                            </span>
                        </p>
                    {/if}
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
                                    bind:value={selectedInterval}
                                    class="input input-accent input-bordered w-full max-w-xs "
                                    placeholder="30"
                                />
                            </th>
                        </tr>
                    </table>
                    {#if durationErrorMessage!=null}
                        <p class="label">
                            <span class="text-red-500">
                                {durationErrorMessage}
                            </span>
                        </p>
                    {/if}
                </div>
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
                        >
                            <option disabled="disabled">Paziente</option>
                            {#each users as usr}
                                <option value={usr}>
                                    {usr.nome}
                                    {usr.cognome}
                                </option>
                            {/each}
                        </select>
                        {#if patientErrorMessage!=null}
                        <p class="label">
                            <span class="text-red-500">
                                {patientErrorMessage}
                            </span>
                        </p>
                    {/if}
                    {/await}
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
