<script lang="ts">
    import router from "page";
    import Layout from "./Layout.svelte";
    import Home from "./pages/Home.svelte";
    import Schedule from "./pages/Schedule.svelte";
    import Calendar from "./pages/Calendar.svelte";
    import Conference from "./pages/Conference.svelte";
    import Users from "./pages/Users.svelte";
    import Login from "./pages/Login.svelte";
    
    let page = Home;
    let title = "Home"
    let hideTitle = true

    router("/", () => [page,title,hideTitle] = [Home,"Home",true]);
    router("/app/calendar", () => [page,title,hideTitle]  = [Calendar,"Appuntamenti",false] );
    router("/app/schedule", () => [page,title,hideTitle]  = [Schedule,"Prenota",false] );
    router("/app/login", () => [page,title,hideTitle] = [Login,"Login",false]);
    router("/app/users", () => [page,title,hideTitle] = [Users,"Gestione",false] );
    router("/app/conference", () => [page,title,hideTitle] = [Conference,"Conferenza",true]);
    
    
    router.start();

    let menu = [
        { path: "/app/calendar", name: "Appuntamenti" },
        { path: "/app/schedule", name: "Prenota" },
        { path: "/app/users", name: "Gestione" },
        { path: "/app/conference", name: "Conferenza" },
        { path: "/app/login", name: "Login" },
    ];
</script>

<Layout {page} {menu} {title} {hideTitle}/>
