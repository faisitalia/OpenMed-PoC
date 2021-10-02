<script>
  import UserList from "./UserList.svelte";
  import UserForm from "./UserForm.svelte";

  let edit = false

</script>

{#if edit}
<UserForm />
<button on:click={() => edit = false}>Back</button>
{:else}
<UserList />
<button on:click={() => edit = true}>Edit</button>
{/if}
