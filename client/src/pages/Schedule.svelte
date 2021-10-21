<script>
    import { get, post, del } from "../util";
    import { usersEdit } from "../state";
    import Datepicker from "@themesberg/tailwind-datepicker/Datepicker";
    import { onMount } from "svelte";
    

    let hours = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23,
    ];
    let minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    let selectedH, selectedM, selectedP;
   
    let usrCF = "";
    let data = {
        CF: "TTTTTT61C01W111T",
        idstanza: "pippo",
        ora: selectedH+selectedM,
        paziente: "",
        confermato: true
    };
    
    
    function save(event) {
        
        event.preventDefault();
        data.ora = selectedH+":"+selectedM;
        data.data=document.getElementById("datepicker").value;
        console.log(data);
        post("/schedule", data);
    }

    onMount(() => {
        const datepickerEl = document.getElementById("datepicker");
        new Datepicker(datepickerEl, {
            // options
        });
    });
</script>

<h1>Schedule</h1>
<form>
    
         
    <div class="form-control">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
            <span class="label-text">Seleziona una data</span>
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
            <span class="label-text">Seleziona orario</span>
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
                    <input type="text"
                        name="period"
                        id="period"
                        bind:value={data.period}
                        class="input input-accent input-bordered w-full max-w-xs "
                    >
                        </th
                >
            </tr>
        </table>
    </div>
    <div class="form-control">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
            <span class="label-text">Seleziona paziente</span>
        </label>
        <select
                bind:value={data.paziente}
                class="select select-bordered select-accent w-full max-w-xs"
            >
        {#await get("/schedule/Patient") then users}
            
                <option disabled="disabled">Paziente</option
                >
                {#each users as usr}
                    <option value={usr.cognome}>{usr.cognome}</option>
                {/each}
            
        {/await}
        </select>
    </div>
    <br />
    <div class="form-control w-1/2">
        <button
            class="btn btn-accent w-full max-w-xs"
            on:click={save}
            color="primary"
            block
            href="pages/authentication/login">Prenota</button
        >
    </div>
</form>
