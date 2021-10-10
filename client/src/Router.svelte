<script lang="ts">
    import router from "page";
    import Layout from "./components/Layout.svelte";
    import Schedule from "./pages/Schedule.svelte";

    import Home from "./pages/Home.svelte";
    import Users from "./pages/Users.svelte";
    import Conference from "./full/Conference.svelte";

    let page = Home;

    router("/", () => (page = Home));
    router("/app/users", () => (page = Users));
    router("/app/conference", () => (page = Conference));
    router("/app/schedule", () => (page = Schedule));

    router.start();
</script>

<Layout {page} />
