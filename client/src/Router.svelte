<script lang="ts">
    import { Styles } from "sveltestrap";

    import router from "page";
    import Layout from "./Layout.svelte";

    import Home from "./pages/Home.svelte";
    import About from "./pages/About.svelte";
    import Tables from "./pages/Tables.svelte";

    import Activity from "./full/Activity.svelte";
    import Forgot from "./full/Login.svelte";
    import Login from "./full/Login.svelte";
    import Register from "./full/Login.svelte";
    import Settings from "./full/Settings.svelte";

    let page = Home;
    let full = false;

    router("/", () => (page = Home));
    router("/about", () => (page = About));
    router("/tables", () => (page = Tables));

    router("/login", () => {
        full = true;
        page = Login;
    });
    router("/register", () => {
        full = true;
        page = Register;
    });
    router("/settings", () => {
        full = true;
        page = Settings;
    });
    router("/forgot", () => {
        full = true;
        page = Forgot;
    });
    router("/activity", () => {
        full = true;
        page = Activity;
    });

    router.start();
</script>

{#if full}
    <svelte:component this={page} />
{:else}
    <Layout {page} />
{/if}
