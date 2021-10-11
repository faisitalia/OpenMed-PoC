<script>
  import UserList from "./UserList.svelte";
  import UserForm from "./UserForm.svelte";
  import {usersEdit} from "../state";  
</script>

{#if $usersEdit  != ""}
<UserForm />
{:else}
<UserList />
{/if}
