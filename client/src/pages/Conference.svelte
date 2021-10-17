<script>
    import { conferenceInit, associateTrack } from "../lib/conference.js";
    import UrlParse from "url-parse";
    import { onMount } from "svelte";

    const urlParser = new UrlParse(window.location.href, true);
    const roomId = urlParser.query.roomId;
    const peerId = urlParser.query.peerId;
    const displayName = peerId;

    function onStateUpdate(state) {
        associateTrack(state.producers, "video", "producer");
        associateTrack(state.producers, "audio", "producer");
        associateTrack(state.consumers, "video", "consumer");
        associateTrack(state.consumers, "audio", "consumer");
    }

    onMount(() => {
        if (roomId && peerId) {
            console.log("starting with room:", roomId, "and peer:", peerId)
            conferenceInit(roomId, peerId, displayName, onStateUpdate);
        } else {
            alert("roomId and peerId are required");
        }
    });
</script>

<div class="w-full h-full border-2 border=red">
    <!-- top -->
    <video
        id="producer-video0"
        class="w-full h-2/3 border border-red"
        autoPlay
        playsInline
        muted
        controls={false}
    />
    <audio
        id="producer-audio0"
        autoPlay
        playsInline
        muted={false}
        controls={false}
    />
    <div class="absolute top-0 left-0 badge badge-primary">{roomId}y</div>
    <div class="absolute top-0 right-0 badge badge-secondary">{peerId}</div>

    <!-- first -->
    <video
        id="consumer-video1"
        class="absolute bottom-0 left-0 w-1/3 h-1/3 border border-red"
        autoPlay
        playsInline
        muted
        controls={false}
    />
    <audio
        id="consumer-audio1"
        autoPlay
        playsInline
        muted={false}
        controls={false}
    />
    <!-- second -->
    <video
        id="consumer-video2"
        class="absolute bottom-0 left-1/3 w-1/3 h-1/3 border border-red"
        autoPlay
        playsInline
        muted
        controls={false}
    />
    <audio
        id="consumer-audio2"
        autoPlay
        playsInline
        muted={false}
        controls={false}
    />
    <!-- third -->
    <video
        id="consumer-video3"
        class="absolute bottom-0 left-2/3 w-1/3 h-1/3 border border-red"
        autoPlay
        playsInline
        muted
        controls={false}
    />
    <audio
        id="consumer-audio3"
        autoPlay
        playsInline
        muted={false}
        controls={false}
    />
</div>
