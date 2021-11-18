<script>
    import { get, post, del } from "../util";
    import { onMount } from "svelte";

    import validate from "validate.js";
    validate.validators.presence.message = "Non può essere vuoto";
    validate.validators.email.message = "Non è un indirizzo email valido";

    import moment from "moment";

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
        scheduledata: {
            // The user needs to give a valide schedule data
            presence: true,
            // and must be after now
            date: {
                earliest: moment().add(1, "days"),
                message: "Almeno domani",
            },
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
    let selectedH, selectedM, selectedP;

    let usrCF = "";
    let data = {
        CF: "TTTTTT61C01W111T",
        idstanza: "pippo",
        ora: selectedH + selectedM,
        paziente: "",
        confermato: true,
    };

    function save(event) {
        event.preventDefault();
        data.ora = selectedH + ":" + selectedM;
        data.data = document.getElementById("scheduledata").value;
        console.log(data);
        post("/schedule", data);
        sent = true;
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
            <form id="main">
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
                    />
                    <label for="scheduledata" class="label">
                        <span class="text-red"
                            >{error(errors, "scheduledata")}</span
                        >
                    </label>
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
                            <th class="border  w-1/4">
                                <input
                                    type="text"
                                    name="period"
                                    id="period"
                                    bind:value={data.period}
                                    class="input input-accent input-bordered w-full max-w-xs "
                                />
                            </th>
                        </tr>
                    </table>
                </div>
                <div class="form-control">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text text-black"
                            >Seleziona paziente</span
                        >
                    </label>
                    <select
                        bind:value={data.paziente}
                        class="select select-bordered select-accent w-full max-w-xs"
                    >
                        {#await get("/schedule/Patient") then users}
                            <option disabled="disabled">Paziente</option>
                            {#each users as usr}
                                <option value={usr.cognome}
                                    >{usr.cognome}</option
                                >
                            {/each}
                        {/await}
                    </select>
                </div>
                <br />
                <div class="form-control">
                    <button
                        class="btn btn-accent content-center max-w-xs"
                        on:click|preventDefault={submit}
                        color="primary"
                        block
                        href="pages/authentication/login">Prenota</button
                    >
                </div>
            </form>
        </div>
    {/if}
</div>
