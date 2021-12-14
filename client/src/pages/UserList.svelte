<script>
  import Breadcrumb from "sveltestrap/src/Breadcrumb.svelte";
  import BreadcrumbItem from "sveltestrap/src/BreadcrumbItem.svelte";
  import Table from "sveltestrap/src/Table.svelte";
  import Button from "sveltestrap/src/Button.svelte";
  import { get, post, del } from "../util";
  import { usersEdit,hospital } from "../state";
  let tableHeading = ["Ruolo", "Nome", "Cognome", "email"];
  let _id = "";
  let data = {};

  async function elimina(event) {
    let data = { _id: _id };
    event.preventDefault();
    let res = await del("/user", data);
    console.log(res);
    location.href = location.href
  }
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
  {#await get("/users/"+$hospital) then users}
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
  {/await}
</Table>
<button
  class="btn btn-accent"
  on:click={elimina}
  color="primary"
  block
  href="pages/authentication/login">Elimina</button
>
<button class="btn btn-accent" on:click={() => usersEdit.set("-")}>New</button>
<button class="btn btn-accent" on:click={() => usersEdit.set(_id)}>Edit</button>
