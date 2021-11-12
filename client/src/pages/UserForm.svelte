<script>
  import { post, get, put } from "../util";
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardHeader from "sveltestrap/src/CardHeader.svelte";
  import CardFooter from "sveltestrap/src/CardFooter.svelte";
  import Form from "sveltestrap/src/Form.svelte";
  import FormGroup from "sveltestrap/src/FormGroup.svelte";
  import Label from "sveltestrap/src/Label.svelte";
  import Input from "sveltestrap/src/Input.svelte";
  import Row from "sveltestrap/src/Row.svelte";
  import Col from "sveltestrap/src/Col.svelte";
  import { usersEdit } from "../state";

  export function email(val, args) {
  // Email regex from Open Web Application Security Project (OWASP) : https://owasp.org/www-community/OWASP_Validation_Regex_Repository
  const regex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/

  return Boolean(val) && regex.test(val);
}
  let ruolo = ["Patient","Doctor","Nurse","Administrator"];
  let role;

  let data = {};
  async function save(event) {
    console.log(data);
    event.preventDefault();
    let res = await post("/user", data);
    console.log(res);
    usersEdit.set(false);
  }
  async function updateUsr(event) {
    console.log(data);
    event.preventDefault();
    let res = await put("/user", data);
    console.log(res);
    usersEdit.set(false);
  }

  async function load(id) {
    data = await get("/user/" + id);
  }

  usersEdit.update((id) => {
    console.log("update", id);
    if (id == "-") data = {};
    else load(id);
  });
</script>

<h1>Create Account</h1>

<Form>
  
  <table class="table-fixed">
    <tr>
      <th colspan="3" align="left">
        <Label for="inputFirstName" class="small mb-1">Ruolo</Label>
        
          <legend class="sr-only"> Ruolo </legend><br>
          <select  bind:value={data.ruolo} class="select select-bordered select-accent w-full max-w-xs ">
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
      </th>
      <th>
        <Label for="inputFirstName" class="small mb-1">Nome</Label>
        <Input
          bind:value={data.nome}
          class="input input-accent input-bordered w-full max-w-xs "
          type="text"
          name="nome"
          id="nome"
          placeholder="Enter first name"
        /></th>
      <th>
        <Label for="inputLastName" class="small mb-1">Cognome</Label>
        <Input
          bind:value={data.cognome}
          class="input input-accent input-bordered w-full max-w-xs "
          type="text"
          name="cognome"
          id="cognome"
          placeholder="Enter last name"
        />
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
          placeholder="Enter Address"
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
      id="exampleEmail"
      placeholder="Enter email address"
    />
      </th>
      <th>
        <Label for="inputPassword" class="small mb-1">Password</Label>
        <Input
          bind:value={data.password}
          class="input input-accent input-bordered w-full max-w-xs "
          type="password"
          name="inputPassword"
          id="inputPassword"
          placeholder="Enter password"
        />
      </th>
      <th>
        <Label for="inputConfirmPassword" class="small mb-1">
          Confirm Password
        </Label>
        <Input
        class="input input-accent input-bordered w-full max-w-xs "
          type="password"
          name="inputConfirmPassword"
          id="inputConfirmPassword"
          placeholder="Confirm password"
        />
      </th>
    </tr>
  </table>
  
  

  <button
    class="btn btn-accent"
    on:click={save}
    block
    href="pages/authentication/login"
  >
    Create Account
  </button>
  <button
    class="btn btn-accent"
    on:click={updateUsr}
    block
    href="pages/authentication/login"
  >
    Update Account
  </button>
  <button class="btn btn-accent" on:click={() => usersEdit.set(false)}
    >List</button
  >
</Form>
