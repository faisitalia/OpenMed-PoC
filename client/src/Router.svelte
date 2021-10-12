<script lang="ts">
    import router from "page";
    import Layout from "./components/Layout.svelte";
    import Schedule from "./pages/Schedule.svelte";

    import Home from "./pages/Home.svelte";
    import Users from "./pages/Users.svelte";
    import Conference from "./pages/Conference.svelte";

    let page = Home;
    let title = "Home"
    let hideTitle = true

    router("/", () => [page,title] = [Home,"Home"]);
    router("/app/users", () => [page,title,hideTitle] = [Users,"Users", false] );
    router("/app/conference", () => [page,title,hideTitle] = [Conference,"Conference", true]);
    router("/app/schedule", () => [page, title,hideTitle]  = [Schedule, "Schedule",false] );

    router.start();
</script>

<Layout {page} {title} {hideTitle}/>
