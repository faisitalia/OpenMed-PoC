<script>
    import { get, post, del } from "../util";
</script>

{#await get("/schedules") then schedules}
    {#each schedules as sched}
        <div class="p-2">
            <div
                class="card shadow-2xl lg:card-side bg-primary text-primary-content"
            >
                <div class="card-body">
                    <h1>
                        Appuntamento con <br />{sched.paziente}
                    </h1>
                    <div class="justify-end card-actions">
                        <a href="/app/conference?roomId=theRoom&peerId=doctor" class="btn btn-primary">
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
    {/each}
{/await}
