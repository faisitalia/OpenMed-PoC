<script lang="ts">
   import Router from "./Router.svelte";
   import moment from 'moment';
   window['moment'] = moment;
</script>
<Router />
<style global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
