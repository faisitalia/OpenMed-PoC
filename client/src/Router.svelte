<script lang="ts">
    import router from "page";
    import Layout from "./components/Layout.svelte";
    import Schedule from "./pages/Schedule.svelte";

    import Home from "./pages/Home.svelte";
    import Calendar from "./pages/Calendar.svelte";
    import Users from "./pages/Users.svelte";
    import Conference from "./pages/Conference.svelte";
    
    let page = Home;
    let title = "Home"
    let hideTitle = true

    router("/", () => [page,title] = [Home,"Home"]);
    router("/app/users", () => [page,title,hideTitle] = [Users,"Users", false] );
    router("/app/schedule", () => [page, title,hideTitle]  = [Schedule, "Schedule",false] );
    router("/app/calendar", () => [page, title,hideTitle]  = [Calendar, "Calendar",false] );
    router("/app/conference", () => [page,title,hideTitle] = [Conference,"Conference", true]);
    
    router.start();

    let menu = [
        { path: "/app/calendar", name: "Appuntamenti" },
        { path: "/app/schedule", name: "Prenota" },
        { path: "/app/users", name: "Gestione" },
        { path: "/app/conference", name: "Conferenza" },
    ];
</script>

<Layout {page} {title} {hideTitle} {menu}/>
