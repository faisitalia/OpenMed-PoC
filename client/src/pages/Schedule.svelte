<script>
    import { get, post, del } from "../util";
    import Datepicker from "@themesberg/tailwind-datepicker/Datepicker";
    import { onMount } from "svelte";

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
        data.data = document.getElementById("datepicker").value;
        console.log(data);
        post("/schedule", data);
        sent = true;
    }

    onMount(() => {
        const datepickerEl = document.getElementById("datepicker");
        new Datepicker(datepickerEl, {});
    });
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            class="inline-block w-6 h-6 ml-2 stroke-current"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    {:else}
        <div class="card-bordered w-full">
            <div class="card-header">
                <h1 class="text-black text-lg">Nuovo appuntamento</h1>
            </div>
            <form>
                <div class="form-control">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label class="label">
                        <span class="label-text text-black"
                            >Seleziona una data</span
                        >
                    </label>

                    <input
                        name="datepicker"
                        id="datepicker"
                        datepicker-title="Flowbite datepicker"
                        datepicker-format="dd/mm/yyyy"
                        type="text"
                        class="input input-accent input-bordered w-1/3"
                        placeholder="Seleziona il giorno"
                    />
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
                        on:click={save}
                        color="primary"
                        block
                        href="pages/authentication/login">Prenota</button
                    >
                </div>
            </form>
        </div>
    {/if}
</div>
