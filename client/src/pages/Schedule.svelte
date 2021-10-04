<script >
    import {post} from "../util"
    let data={}
    function save(event){
        event.preventDefault()
        post("/schedule", data)
    }

</script>
<h1>Schedule</h1>

<form>
    <input bind:value={data.from} name="from" type="input">
    <input bind:value={data.to} name="to" type="input">
    <input name="crea" type="button" value="crea" on:click={save}>
</form>
