<script>
import { EnhancedEventEmitter } from "mediasoup-client/lib/EnhancedEventEmitter";

    import { setWebcamInProgress } from "../lib/stateActions";

    let main = "https://picsum.photos/id/50/200/300";
    let icons = [
        "https://picsum.photos/id/61/200/200",
        "https://picsum.photos/id/62/200/200",
        "https://picsum.photos/id/63/200/200",
    ];
    function swap(event) {
        console.log(event)
        let n = icons.indexOf(event.srcElement.src)
        let tmp = icons[n] 
        icons[n] = main
        main = tmp
    }
    function info() {
        alert("hei")
    }
</script>

<div class="w-full h-full border-2 border=red">
    <img class="w-full h-full" alt="first" src={main} on:click={info} />
    <img
        class="absolute bottom-0 left-0 w-1/3 h-1/3"
        alt="first"
        src={icons[0]}
        on:click={swap}
    />

    <img
        class="absolute bottom-0 left-1/3 w-1/3 h-1/3"
        alt="first"
        src={icons[1]}
        on:click={swap}
    />
    <img
        class="absolute bottom-0 left-2/3 w-1/3 h-1/3"
        alt="first"
        src={icons[2]}
        on:click={swap}
    />
</div>
