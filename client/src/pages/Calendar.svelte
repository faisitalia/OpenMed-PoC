<script>
    import { get, post, del } from "../util";
    import {loggedUserCF, role} from "../state";
    import {onMount} from 'svelte';
    import { schedule_update } from "svelte/internal";
    let now = new Date(), month, day, year;
    let dateString;
    onMount(()=> {
        month = '' + (now.getMonth() + 1),
        day = '' + now.getDate(),
        year = now.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    dateString = [year, month, day].join('-');
	})
    
</script>

{#await get("/schedules/"+$loggedUserCF+"/"+$role)}
    <p>Caricamento...</p>
{:then schedules}
    {#each schedules as sched}
    {#if dateString <= sched.data}
        <div class="p-2">
            <div
                class="card shadow-2xl lg:card-side bg-primary text-primary-content"
            >
                <div class="card-body">
                    <h1>
                        Appuntamento con <br />{sched.paziente?.nome ?? "Nome"} {sched.paziente?.cognome ?? "Cognome"}
                    </h1>
                    <div class="justify-end card-actions">
                        <a href="/app/conference?roomId={sched._id}&peerId={sched.paziente._id}" class="btn btn-primary">
                            il {sched.data} alle {sched.ora} 
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
                </div>
            </div>
        </div>
        {/if}
    {/each}
{/await}
