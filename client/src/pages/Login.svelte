<script>
    import { get, post, del } from "../util";
    import { onMount } from "svelte";
    import { token, name, role } from "../state";

    import validate from "validate.js";
    validate.validators.presence.message = "Non può essere vuoto";
    validate.validators.email.message = " non valida";

    import moment from "moment";
    window["moment"] = moment;

    // Hook up the form so we can prevent it from being posted
    let form = {};
    let errors = {};
    let isUser;
    let message = "";

    onMount(() => (form = document.querySelector("form#main")));

    function error(map, name) {
        if (!map) return "";
        if (name in map) {
            //document.getElementById(name).classList.add("text-red")
            let label = document.querySelector("label[for='" + name + "']");
            if (label) label.classList.add("text-red-500");

            return map[name].join("<br>");
        } else {
            let label = document.querySelector("label[for='" + name + "']");
            if (label) label.classList.remove("text-red-500");
            //document.getElementById(name).classList.remove("text-red")
        }
        return "";
    }
    var constraints = {
        email: {
            // Email is required
            presence: true,
            // and must be an email (duh)
            email: true,
        },
        password: {
            // Password is also required
            presence: true,
            // And must be at least 5 characters long
            length: {
                minimum: 5,
            },
        },
    };
    async function submit() {
        // validate the form against the constraints
        errors = validate(form, constraints);
        if (!errors) {
            //alert("success");
            isUser = await post("/login", data);
            if ("error" in isUser) message = isUser.error;
            else {
                token.set(isUser.token);
                name.set(isUser.name);
                role.set(isUser.role);
            }
            console.log("Utente", isUser);
        } else {
            console.log("errors", errors);
        }
    }
    let data = {};
    import { loggedUser } from "../state";
</script>

<div class="card-bordered w-full">
    {#if $token == ""}
        <form id="main">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">
                <span class="label-text text-black"> Email </span>
            </label>
            <input
                bind:value={data.email}
                class="input input-accent input-bordered w-full max-w-xs "
                type="email"
                name="email"
                id="email"
                placeholder="Enter email address"
            />
            <div class="col-sm-5 messages">{error(errors, "email")}</div>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="label">Password</label>
            <input
                bind:value={data.password}
                class="input input-accent input-bordered w-full max-w-xs "
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
            />
            <div class="col-sm-5 messages">{error(errors, "password")}</div>
            <br />
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <div id="message">{message}</div>
            <div class="form-control">
                <button
                    class="btn btn-accent content-center max-w-xs"
                    on:click|preventDefault={submit}
                    color="primary"
                    block
                    href="pages/authentication/login">Login</button
                >
            </div>
        </form>
    {:else}
        Benvenuto {$name}
    {/if}
</div>
