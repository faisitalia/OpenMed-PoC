<script>
  import UserList from "./UserList.svelte";
  import UserForm from "./UserForm.svelte";
  import {usersEdit} from "../state";

  let inForm = false
  usersEdit.subscribe(x => {
    console.log(x)
    inForm = x !="" 
  })
</script>

{#if inForm }
<UserForm />
{:else}
<UserList />
{/if}
