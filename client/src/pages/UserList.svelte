<script>
   import Table from "sveltestrap/src/Table.svelte";
  import { get, post, del } from "../util";
  import { usersEdit,hospital } from "../state";
import { onMount } from "svelte";
  let tableHeading = ["Ruolo", "Nome", "Cognome", "email"];
  let _id = "";
  let data = {};

  async function elimina(event) {
    let data = { _id: _id };
    del("/user", data).then(res => {
      console.log(res);
      load()
    })  
	};
  
  let users = []
  async function load() {
    users = await get("/users/"+$hospital)
  }
  onMount(load)
</script>

<h1 class="mt-4">Utenti</h1>

<Table bordered responsive>
  <thead>
    <tr>
      {#each tableHeading as heading}
        <th>{heading}</th>
      {/each}
    </tr>
  </thead>
    <tbody>
      <tr />
      {#each users as usr}
        <tr>
          <th scope="row"
            ><input type="radio" bind:group={_id} name="_id" value={usr._id} />
            {usr.ruolo}</th
          >
          <td>{usr.nome}</td>
          <td>{usr.cognome}</td>
          <td>{usr.email}</td>
        </tr>
      {/each}
    </tbody>
</Table>
<button
  class="btn btn-accent"
  on:click={elimina}
  color="primary"
  block>Elimina</button
>
<button class="btn btn-accent" on:click={() => usersEdit.set("-")}>New</button>
<button class="btn btn-accent" on:click={() => usersEdit.set(_id)}>Edit</button>
