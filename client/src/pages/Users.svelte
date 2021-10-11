<script>
  import UserList from "./UserList.svelte";
  import UserForm from "./UserForm.svelte";
  import {usersEdit} from "../state";
import Activity from "../full/Activity.svelte";

  
</script>

{#if $usersEdit  != ""}
<UserForm />
{:else}
<UserList />
{/if}
