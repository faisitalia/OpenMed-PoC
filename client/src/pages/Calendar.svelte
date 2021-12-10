<script>
    import { get, post, del } from "../util";
    import { loggedUserCF, role } from "../state";
    import { onMount } from "svelte";
    import Table from "sveltestrap/src/Table.svelte";
    import { schedule_update } from "svelte/internal";
    import { relativeTimeRounding } from "moment";

    let detail = undefined;
    let now = new Date(),
        month,
        day,
        year;
    let dateString;
    onMount(() => {
        (month = "" + (now.getMonth() + 1)),
            (day = "" + now.getDate()),
            (year = now.getFullYear());

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        dateString = [year, month, day].join("-");
    });
</script>

{#await get("/schedules/" + $loggedUserCF + "/" + $role)}
    <p>Caricamento...</p>
{:then schedules}
    {#if !detail}
        {#each schedules as sched}
            {#if dateString <= sched.data}
                <div class="p-2">
                    <div
                        class="card shadow-2xl lg:card-side bg-green-500 text-primary-content"
                    >
                        <div class="card-body">
                            <h1>
                                Appuntamento con <br />{sched.paziente?.nome ??
                                    "Nome"}
                                {sched.paziente?.cognome ?? "Cognome"}<br />
                               
                                il {sched.data.split("-").reverse().join("-")} alle {sched.ora}
                            </h1>
                            <div class="justify-end card-actions">
                                <button
                                    type="submit"
                                    on:click={() => (detail = sched)}
                                    >Vedi dettaglio</button
                                >
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        {/each}
    {:else}
        <div class="p-2">
            <center>
                <table class="table-auto">
                    <thead>
                        <tr>
                            <th>Visita medica</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Appuntamento del</th>
                            <td>
                                {detail.data.split("-").reverse().join("-")}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">dalle ore</th>
                            <td>
                                {detail.ora}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">durata</th>
                            <td>
                                {detail.period}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Ambulatorio</th>
                            <td>
                                {detail.idambulatorio?.idambulatorio ?? "idambulatorio"}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row"> Posizione Ambulatorio</th>
                            <td>
                                {detail.idambulatorio?.indirizzo ?? "indirizzo"}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Paziente</th>
                            <td>
                                {detail.paziente?.nome ?? "Nome"}
                                {detail.paziente?.cognome ?? "Cognome"}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Stomaterapista</th>
                            <td>
                                {detail.operatore}
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>
            
           
            <br />
            <a
                href="/app/conference?roomId={detail._id}&peerId={detail
                    .paziente._id}"
                class="btn btn-primary"
            >
                Inizia visita
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
            </a>
        </div>
    {/if}
{/await}
