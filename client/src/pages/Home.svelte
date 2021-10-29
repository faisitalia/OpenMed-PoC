<script lang="ts">
    import { loggedUser } from "../state";
    let message = "Please input your access credentials";
    let username = "";
    let password = "";
    function login() {
        if (username == "" || password == "") {
            message = "Credentials cannot be empty.";
            return;
        }
        if (username != "demo" && password != "demo") {
            message = "Bad username or password.";
            return;
        }
        loggedUser.set(username);
    }
    function logout() {
        message = "Please input your access credentials";
        loggedUser.set("");
    }
</script>

<div class="p-3">
    <div class="card shadow-xl image-full">
        <figure>
            <img alt="OpenMed" src="/splash.jpg" />
        </figure>
        <div class="justify-end card-body">
            <img alt="openmed" src="/openmed2.png" />
            {#if $loggedUser == ""}
                <div class="form-control">
                    <h1 class="card-title">{message}</h1>
                    <input
                        type="text"
                        placeholder="username"
                        class="input input-bordered mb-3"
                        bind:value={username}
                    />
                    <input
                        type="text"
                        placeholder="password"
                        class="input input-bordered mb-3"
                        bind:value={password}
                    />
                    <button class="btn btn-primary" on:click={login}
                        >Login</button
                    >
                </div>
            {:else}
                <h1 class="card-title">Welcome, {$loggedUser}</h1>
                <div class="card-actions">
                    <a href="/app/calendar" class="btn btn-primary"
                        >Attend a visit</a
                    >
                    <a href="/app/schedule" class="btn btn-primary"
                        >Schedule a visit</a
                    >
                    <button class="btn btn-secondary" on:click={logout}
                        >Logout</button
                    >
                </div>
            {/if}
        </div>
    </div>
</div>
