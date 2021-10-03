<script lang="ts">
    import router from "page";
    import { Container } from "sveltestrap";
    import Layout from "./Layout.svelte";

    import Home from "./pages/Home.svelte";
    import Users from "./pages/Users.svelte";
    import Schedule from "./pages/Schedule.svelte";

    import Activity from "./full/Activity.svelte";
    import Forgot from "./full/Forgot.svelte";
    import Login from "./full/Login.svelte";
    import Register from "./full/Register.svelte";
    import Settings from "./full/Settings.svelte";
    import Conference from "./full/Conference.svelte";
  
    import Error401 from "./full/Error401.svelte";
    import Error404 from "./full/Error404.svelte";
    import Error500 from "./full/Error500.svelte";

    let page = Home;
    let full = false;

    router("/", () => (page = Home));
    router("/app/users", () => (page = Users));
    router("/app/schedule", () => (page = Schedule));
    
    router("/app/conference", () => {
        full = true;
        page = Conference;
    });

    // Samples
    router("/app/login", () => {
        full = true;
        page = Login;
    });
    router("/app/register", () => {
        full = true;
        page = Register;
    });
    router("/app/settings", () => {
        full = true;
        page = Settings;
    });
    router("/app/forgot", () => {
        full = true;
        page = Forgot;
    });
    router("/app/activity", () => {
        full = true;
        page = Activity;
    });
    router("/app/error_401", () => {
        full = true;
        page = Error401;
    });
    router("/app/error_404", () => {
        full = true;
        page = Error404;
    });

    router("/app/error_500", () => {
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
