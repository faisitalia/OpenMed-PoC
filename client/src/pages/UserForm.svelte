<script>
  import validate from "validate.js";
  import { onMount } from "svelte";
  import { post, get, put } from "../util";
  import Form from "sveltestrap/src/Form.svelte";
  import Label from "sveltestrap/src/Label.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  import { usersEdit } from "../state";
  
  validate.validators.presence.message = " non può essere vuoto";
  validate.validators.email.message = " non valida";
  
  let ruolo = ["Paziente", "Medico", "Infermiere", "Amministratore"];
  let role;
  let errors = {};
  let form = {};
  let message = "";

  let data = {};
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
    nome: {
      // nome is required
      presence: true,
     },
     cognome: {
      // nome is required
      presence: true,
     },
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
    CF: {
      // Codice Fiscale is also required
      presence: true,
      // And must be at least 16 characters long
      length: {
        minimum: 16,
        message: "deve essere almeno di 16 caratteri"
      },
    },
    "Conferma-password": $usersEdit == "-" ? {
      // You need to confirm your password
      presence: true,
      // and it needs to be equal to the other password
      equality: {
        attribute: "password",
        message: "^Le password non combaciano",
      },
    } : {},

    cellulare: {
      presence: true,
      // Number of phone has to be an integer >= 0
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
      },
    },
  };

  async function save(event) {
    console.log(data)
    errors = validate(form, constraints);
    
    if (!errors) {
      console.log(data);
      event.preventDefault();
      let res = await post("/user", data);
      usersEdit.set("");
      console.log(res);
      } else {
      console.log("errors", errors);
    }
  }

  async function updateUsr(event) {
    errors = validate(form, constraints);
    if (!errors) {
      console.log("put", data);
      event.preventDefault();
      let res = await put("/user", data);
      usersEdit.set("");
      console.log(res);  
    } else {
      console.log("errors", errors);
    }
  }

  async function load(id) {
    data = await get("/user/" + id);
    console.log("loaded", data)
  }


  usersEdit.subscribe((id) => {
    if(id == "")
      return;
    if (id == "-") 
        data = {};
    else load(id);
  });
</script>


<h1>Gestione profilo</h1>

<form id="main">
  <table class="table-fixed">
    <tr>
      <th colspan="3" align="left">
        <Label for="inputFirstName" class="small mb-1">Ruolo</Label>

        <legend class="sr-only"> Ruolo </legend><br />
        <select
          bind:value={data.ruolo}
          class="select select-bordered select-accent w-full max-w-xs "
        >
          {#each ruolo as role}
            <option value={role}>
              {role}
            </option>
          {/each}
        </select>
      </th>
    </tr>
    <tr>
      <th>
        <Label for="codicediscale" class="small mb-1">CodicFiscale</Label>
        <Input
          bind:value={data.CF}
          class="input input-accent input-bordered w-full max-w-xs "
          type="text"
          name="CF"
          id="CF"
          placeholder="Codice Fiscale"
        />
        <div class="col-sm-5 messages">{error(errors, "CF")}</div>
      </th>
      <th>
        <Label for="inputFirstName" class="small mb-1">Nome</Label>
        <Input
          bind:value={data.nome}
          class="input input-accent input-bordered w-full max-w-xs "
          type="text"
          name="nome"
          id="nome"
          placeholder="Inserisci il nome"
        />
        <div class="col-sm-5 messages">{error(errors, "nome")}</div>
        </th
      >
      <th>
        <Label for="inputLastName" class="small mb-1">Cognome</Label>
        <Input
          bind:value={data.cognome}
          class="input input-accent input-bordered w-full max-w-xs "
          type="text"
          name="cognome"
          id="cognome"
          placeholder="Inserisci il cognome"
        />
        <div class="col-sm-5 messages">{error(errors, "cognome")}</div>
      </th>
    </tr>
    <tr>
      <th colspan="2">
        <Label for="inputAddress" class="small mb-1">Indirizzo</Label>
        <Input
          bind:value={data.indirizzo}
          class="input input-accent input-bordered w-full max-w-xs "
          type="text"
          name="indirizzo"
          id="indirizzo"
          placeholder="Inserisci indirizzo"
        />
      </th>
      <th>
        <Label for="inputPhone" class="small mb-1">Telefono</Label>
        <Input
          bind:value={data.cellulare}
          class="input input-accent input-bordered w-full max-w-xs "
          type="text"
          name="cellulare"
          id="cellulare"
          placeholder="Numero di telefono"
        />
        <div class="col-sm-5 messages">{error(errors, "Cellulare")}</div>
      </th>
    </tr>
    <tr>
      <th>
        <Label for="exampleEmail" class="small mb-1">Email</Label>
        <Input
          bind:value={data.email}
          class="input input-accent input-bordered w-full max-w-xs "
          type="email"
          name="email"
          id="email"
          placeholder="Inserisci email"
        />
        <div class="col-sm-5 messages">{error(errors, "email")}</div>
      </th>
      <th>
        <Label for="inputPassword" class="small mb-1">Password</Label>
        <Input
          bind:value={data.password}
          class="input input-accent input-bordered w-full max-w-xs "
          type="password"
          name="password"
          id="password"
          placeholder="Inserisci password"
        />
        <div class="col-sm-5 messages">{error(errors, "password")}</div>
      </th>
      <th>
        {#if $usersEdit == "-"}
        <Label for="inputConfirmPassword" class="small mb-1">
          Conferma Password
        </Label>
        <Input
          class="input input-accent input-bordered w-full max-w-xs "
          type="password"
          name="Conferma-password"
          id="Conferma-password"
          placeholder="Conferma password"
        />
        <div class="col-sm-5 messages">
          {error(errors, "Conferma-password")}
        </div>
        {/if}
      </th>
    </tr>
  </table>

  {#if $usersEdit == "-"}
  <button
    class="btn btn-accent"
    on:click|preventDefault={save}
    block
    href="pages/authentication/login"
  >
    Create Account
  </button>
  {:else}
  <button
    class="btn btn-accent"
    on:click|preventDefault={updateUsr}
    block
    href="pages/authentication/login"
  >
    Update Account
  </button>
  
  {/if}
  <button class="btn btn-accent" on:click={() => usersEdit.set("")}
    >List</button
  >
</form>
