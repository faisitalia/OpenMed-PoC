
<style
	video {
		border: 1px solid black;
	}
</style>
<script>
	import RoomClient from "../lib/RoomClient";
	import deviceInfo from "../lib/deviceInfo";
	import UrlParse from "url-parse";
	import randomString from "random-string";
	import * as cookiesManager from "../lib/cookiesManager";
	import { onMount } from "svelte";
	import store from "../store";
	import { setProducerResumed } from "../lib/stateActions";

	const urlParser = new UrlParse(window.location.href, true);

	let device = deviceInfo();
	const peerId = randomString({ length: 8 }).toLowerCase();

	/*let roomId = urlParser.query.roomId;
	if (!roomId) {
		roomId = randomString({ length: 8 }).toLowerCase();
		urlParser.query.roomId = roomId;
		//window.history.pushState('', '', urlParser.toString());
	}*/
	let roomId = "theRoom"

	let displayName =
		urlParser.query.displayName ||
		(cookiesManager.getUser() || {}).displayName;
	const handler = urlParser.query.handler;
	const useSimulcast = urlParser.query.simulcast !== "false";
	const useSharingSimulcast = urlParser.query.sharingSimulcast !== "false";
	const forceTcp = urlParser.query.forceTcp === "true";
	const produce = urlParser.query.produce !== "false";
	const consume = urlParser.query.consume !== "false";
	const forceH264 = urlParser.query.forceH264 === "true";
	const forceVP9 = urlParser.query.forceVP9 === "true";
	const svc = urlParser.query.svc;
	const datachannel = urlParser.query.datachannel !== "false";
	const info = urlParser.query.info === "true";
	const faceDetection = urlParser.query.faceDetection === "true";
	const externalVideo = urlParser.query.externalVideo === "true";
	const throttleSecret = urlParser.query.throttleSecret;
	const e2eKey = urlParser.query.e2eKey;

	RoomClient.init({ store });
	let roomClient = new RoomClient({
		roomId,
		peerId,
		displayName,
		device,
		handlerName: handler,
		useSimulcast,
		useSharingSimulcast,
		forceTcp,
		produce,
		consume,
		forceH264,
		forceVP9,
		svc,
		datachannel,
		externalVideo,
		e2eKey,
	});

	let messages = "Messages:";
	let state = ""

	let audioProdTrack = undefined;
	let videoProdTrack = undefined;
	let audioProdElem = undefined
	let videoProdElem = undefined;

	let audioConsTrack = undefined;
	let videoConsTrack = undefined;
	let audioConsElem = undefined
	let videoConsElem = undefined;
	
	store.subscribe((value) => {
		state = JSON.stringify(value, null, 2)
		if (value.producers) {
			for (let key in value.producers) {
				let track = value.producers[key].track;
				if (track && track.kind === "audio") {
					if (audioProdTrack) continue;
					audioProdTrack = track;
					messages += "\naudio prod: "+track.id
					console.log("found track:", audioTrack);

					const stream = new MediaStream;
					stream.addTrack(audioProdTrack);
					audioProdElem.srcObject = stream;
				}
				if (track && track.kind === "video") {
					if (videoProdTrack) continue;
					videoProdTrack = track;
					console.log("found track:", videoProdTrack);
					messages += "\nvideo prod:"+videoProdTrack.id

					const stream = new MediaStream;
					stream.addTrack(videoProdTrack);
					videoProdElem.srcObject = stream;
				}
			}
		}

		if (value.consumers) {
			for (let key in value.consumers) {
				let track = value.consumers[key].track;
				if (track && track.kind === "audio") {
					if (audioConsTrack) continue;
					audioConsTrack = track;
					messages += "\naudio cons: "+track.id
					console.log("found track:", audioConsTrack);

					const stream = new MediaStream;
					stream.addTrack(audioConsTrack);
					audioConsElem.srcObject = stream;
				}
				if (track && track.kind === "video") {
					if (videoConsTrack) continue;
					videoConsTrack = track;
					console.log("found track:", videoConsTrack);
					messages += "\nvideo cons:"+videoConsTrack.id

					const stream = new MediaStream;
					stream.addTrack(videoConsTrack);
					videoConsElem.srcObject = stream;
				}
			}
		}
	});

	onMount(async () => {
		audioProdElem = document.getElementById("audioProdElem");
		videoProdElem = document.getElementById("videoProdElem");
		audioConsElem = document.getElementById("audioConsElem");
		videoConsElem = document.getElementById("videoConsElem");
		await roomClient.join();
	});
</script>

<h1>Conference</h1>

<video id="videoProdElem" autoPlay playsInline muted controls={false} />
<audio ref="audioProdElem" autoPlay playsInline muted={false} controls={false} />
<video id="videoConsElem" autoPlay playsInline muted controls={false} />
<audio ref="audioConsElem" autoPlay playsInline muted={false} controls={false} />

<div>
	Room:{roomId}<br />
	Peer:{peerId}<br />
</div>
<pre>{messages}</pre>
<hr>
<pre>{state}</pre>
<hr>
