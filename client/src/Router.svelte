<script lang="ts">
   // import { Styles } from "sveltestrap";

    import router from "page";
    import { Container } from 'sveltestrap'
    import Layout from "./Layout.svelte";

    import Home from "./pages/Home.svelte";
    import Conference from "./pages/Conference.svelte";
    import Users from "./pages/Users.svelte";
    import Schedule from "./pages/Schedule.svelte";

    import Activity from "./full/Activity.svelte";
    import Forgot from "./full/Forgot.svelte";
    import Login from "./full/Login.svelte";
    import Register from "./full/Register.svelte";
    import Settings from "./full/Settings.svelte";

    import Error401 from "./full/Error401.svelte";
    import Error404 from "./full/Error404.svelte";
    import Error500 from "./full/Error500.svelte";


    let page = Home;
    let full = false;

    router("/", () => (page = Home));
    router("/users", () => (page = Users));
    router("/schedule", () => (page = Schedule));
    router("/conference", () => (page = Conference));


    // Samples
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
    router("/error_401", () => {
        full = true;
        page = Error401;
    });
    router("/error_404", () => {
        full = true;
        page = Error404;
    });

    router("/error_500", () => {
        full = true;
        page = Error500;
    });

    router.start();
</script>

{#if full}
    <Container fluid={true}>
        <svelte:component this={page} />
    </Container>
{:else}
    <Layout {page} />
{/if}
