<script>
    import { onMount } from "svelte";
    import UrlParse from "url-parse";
    import {
        conferenceInit,
        associateTrack,
        cleanupUnusedElements,
        logState,
    } from "../lib/conference.js";

    const urlParser = new UrlParse(window.location.href, true);
    const roomId = urlParser.query.roomId;
    let peerId = urlParser.query.peerId;
    let displayName = peerId;
    let roomClient = undefined;

    let generateRoom = false;

    function onStateUpdate(state) {
        logState(state);
        cleanupUnusedElements(state.producers, state.consumers);
        associateTrack(state.producers, "video", "producer");
        //associateTrack(state.producers, "audio", "producer");
        associateTrack(state.consumers, "video", "consumer");
        //associateTrack(state.consumers, "audio", "consumer");
    }

    onMount(() => {
        if (!roomId || !peerId) {
            generateRoom = true
            return;
        }
        console.log("starting with room:", roomId, "and peer:", peerId);
        roomClient = conferenceInit(roomId, peerId, displayName, onStateUpdate);
        roomClient.join();
    });
</script>

<div class="w-full h-full border-2 border=red">
    {#if generateRoom}
        <div class="text-red-500">
            <a href="/app/conference?roomId=test&peerId=user1">User 1</a><br>
            <a href="/app/conference?roomId=test&peerId=user2">User 2</a><br>
            <a href="/app/conference?roomId=test&peerId=user3">User 3</a><br>
            <a href="/app/conference?roomId=test&peerId=user4">User 4</a><br>
        </div>
    {:else}
        <!-- top -->
        <div class="w-full h-full border border-red">
            <video
                class="w-full h-full object-cover"
                id="consumer-video0"
                autoPlay
                playsInline
                muted
                controls={false}
            />
            <audio
                id="consumer-audio0"
                autoPlay
                playsInline
                muted={false}
                controls={false}
            />
        </div>
        <div class="absolute top-15 left-0 badge badge-primary">{roomId}</div>
        <div class="absolute top-15 right-0 badge badge-secondary">{peerId}</div>

        <!-- first -->
        <div class="absolute bottom-0 left-0 w-1/3 h-1/3 border border-red">
            <video
                id="producer-video0"
                class="w-full h-full object-cover"
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
        </div>
        <!-- second -->
        <div class="absolute bottom-0 left-1/3 w-1/3 h-1/3 border border-red">
            <video
                id="consumer-video1"
                class="w-full h-full object-cover"
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
        </div>
        <!-- third -->
        <div class="absolute bottom-0 left-2/3 w-1/3 h-1/3 border border-red">
            <video
                id="consumer-video3"
                class="w-full h-full object-cover"
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
        {/if}
</div>
