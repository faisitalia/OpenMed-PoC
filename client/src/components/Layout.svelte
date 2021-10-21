<script>
    import Navbar from "./Navbar.svelte";
    import Sidebar from "./Sidebar.svelte";
    import Home from "../pages/Home.svelte";
    export let page = Home;
    export let title = ""
    export let hideTitle = false
</script>

<Navbar />
<div class="flex flex-col md:flex-row">
    <Sidebar {title} />
    <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
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
