<script>
    import { get, post, del } from "../util";
</script>

{#await get("/schedules") then schedules}
    {#each schedules as sched}
        <a
            href=""
            class="block p-6 bg-white hover:bg-gray-100 shadow-md border border-gray-200 rounded-lg max-w-sm">
            <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                Appuntamento con <br />{sched.paziente}
            </h5>
            <p class="font-normal text-gray-700">
                il {sched.data} alle {sched.ora}
            </p>
        </a>
    {/each}
{/await}
