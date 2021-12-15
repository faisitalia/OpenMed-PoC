<script lang="ts">
    import router from "page";
    import Layout from "./Layout.svelte";
    import Home from "./pages/Home.svelte";
    import Schedule from "./pages/Schedule.svelte";
    import Calendar from "./pages/Calendar.svelte";
    import Conference from "./pages/Conference.svelte";
    import Users from "./pages/Users.svelte";
    import { role,name,token,loggedUserCF } from "./state";

    

    let page = Home;
    let title = "Home";
    let hideTitle = true;
    let menu = [];

    role.subscribe((r) => {
        menu = [];
        if (r != "") {
            
            menu.push({ path: "/app/calendar", name: "Appuntamenti" });
            if (r=="Infermiere" || r=="Amministratore"){
                menu.push({ path: "/app/schedule", name: "Prenota" });
                menu.push({ path: "/app/users", name: "Gestione" });
            }
            menu.push({ path: "/app/conference", name: "Conferenza" });   
        }
    });
 
    router("/", () => ([page, title, hideTitle] = [Home, "Home", true]));

    router(
        "/app/calendar",
        () => $role!="" ? ([page, title, hideTitle] = [Calendar, "Appuntamenti", false]) : undefined
    );

    router(
        "/app/schedule",
        () => $role!="" ? ([page, title, hideTitle] = [Schedule, "Prenota", false]) : undefined
    );

    router(
        "/app/users",
        () => $role!="" ? ([page, title, hideTitle] = [Users, "Gestione", false]) : undefined
    );

    router(
        "/app/conference",
        () =>  ([page, title, hideTitle] = [Conference, "Conferenza", true]) 
    );

    router.start();
</script>

<Layout {page} {menu} {title} {hideTitle} />
