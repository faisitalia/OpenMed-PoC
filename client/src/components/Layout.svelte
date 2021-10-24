<script>
    import Navbar from "./Navbar.svelte";
    import Home from "../pages/Calendar.svelte";
    export let page = Home;
    export let title = ""
    export let hideTitle = false
    export let menu;
</script>
<div class="flex flex-col md:flex-row">
    <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
        <Navbar {menu}/>
        {#if !hideTitle}
        <div class="bg-gray-800 pt-3">
            <div
                class="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white"
            >
                <h3 class="font-bold pl-2">{title}</h3>
            </div>
        </div>
        {/if}
        <svelte:component this={page} />
    </div>
</div>
