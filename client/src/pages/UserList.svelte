<script>
  import Breadcrumb from "sveltestrap/src/Breadcrumb.svelte";
  import BreadcrumbItem from "sveltestrap/src/BreadcrumbItem.svelte";
  import Card from "sveltestrap/src/Card.svelte";
  import CardBody from "sveltestrap/src/CardBody.svelte";
  import CardHeader from "sveltestrap/src/CardHeader.svelte";
  import Table from "sveltestrap/src/Table.svelte";
  import Button from "sveltestrap/src/Button.svelte";
  //import Table from "../components/Table.svelte";
  import {get,post,del} from "../util"
  import {usersEdit} from "../state";
  let tableHeading = ["Ruolo","Nome","Cognome","email"]
  let usrCF=""
  let data = {}
  async function  elimina(event) {
      console.log(usrCF)
      let data = {"CF":usrCF}
      event.preventDefault()
      let res = await del("/user", data)
      console.log(res)
      usersEdit.set(false)
    }
</script>


<h1 class="mt-4">Tables</h1>
<Breadcrumb class="mb-4">
  <BreadcrumbItem>
    <a href=".">Dashboard</a>
  </BreadcrumbItem>
  <BreadcrumbItem active>Tables</BreadcrumbItem>
</Breadcrumb>






<Table bordered responsive>
  <thead>
    <tr>
      {#each tableHeading as heading}
        <th>{heading}</th>
      {/each}
    </tr>
  </thead>
  {#await get("/users") then users}
  
  <tbody>
    <tr></tr>
    {#each users as usr }
      <tr>
        <th scope="row"><input type=radio bind:group={usrCF} name="CF" value={usr.CF}> {usr.ruolo}</th>
        <td>{usr.nome}</td>
        <td>{usr.cognome}</td>
        <td>{usr.email}</td>
      </tr>
    {/each}
  
  </tbody>
 
     {/await}
</Table>
<Button on:click={elimina} color="primary" block href="pages/authentication/login">Elimina</Button>
<Button on:click={() => usersEdit.set("-")}>New</Button>
<Button on:click={() => usersEdit.set(usrCF)}>Edit</Button>

