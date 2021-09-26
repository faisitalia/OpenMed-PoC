<script lang="ts">
	import io from "socket.io-client";
	import { onMount } from "svelte";
	import * as config from "../config";
	import * as mediasoup from "mediasoup-client";

	const hostname = window.location.hostname;

	let socket = undefined;
	let device = undefined;
	let producer = undefined;
	let stream = undefined;

	let message = undefined;
	let error = undefined;

	/*
	 * create web socket
	 * request rtp capabilities of the server
	 * create mediasoup device
	 */
	function connect() {
		message = "Connecting...";
		// setup socket connection
		const serverUrl = `https://${hostname}:${config.listenPort}`;
		const opts = {
			path: "/server",
			transports: ["websocket"],
		};
		socket = io(serverUrl, opts);
		socket.request = (type, data) => {
			return new Promise((resolve) => {
				socket.emit(type, data, resolve);
			});
		};
		// request rtp capabilities and create a device
		return new Promise((resolve, reject) => {
			socket.on("disconnect", () => {
				console.log("disconnected");
				error = "Disconnected";
				reject();
			});
			socket.on("connect_error", (error) => {
				console.log(error);
				error = "Cannot connect: " + error.message;
				reject();
			});
			socket.on("connect", async () => {
				console.log("connected");
				message = "Connected.";
				const routerRtpCapabilities = await socket.request(
					"getRouterRtpCapabilities"
				);
				console.log("getRouterRtpCapabilities:", routerRtpCapabilities);
				try {
					device = new mediasoup.Device();
					await device.load({ routerRtpCapabilities });
					message = "Device Created.";
					resolve(device);
				} catch (err) {
					error = err.message;
					reject();
				}
			});
		});
	}

	// publising a device
	async function publish() {
		return new Promise( async(resolve, reject) => {
			const data = await socket.request("createProducerTransport", {
				forceTcp: false,
				rtpCapabilities: device.rtpCapabilities,
			});
			if (data.error) {
				error = data.error;
				reject();
				return;
			}
			
			console.log("createProducerTransport:", data);
			const transport = await device.createSendTransport(data);
			message += "<br>Transport Created.";
			transport.on(
				"connect",
				async ({ dtlsParameters }, callback, errback) => {
					message += "<br>Trasport connected.";
					socket
						.request("connectProducerTransport", { dtlsParameters })
						.then(callback)
						.catch(errback);
				}
			);
			transport.on(
				"produce",
				async ({ kind, rtpParameters }, callback, errback) => {
					try {
						message += "<br>Producing...";
						const { id } = await socket.request("produce", {
							transportId: transport.id,
							kind,
							rtpParameters,
						});
						callback({ id });
					} catch (err) {
						errback(err);
					}
				}
			);

			transport.on("connectionstatechange", (state) => {
				switch (state) {
					case "connecting":
						message += "<br>Publishing...";
						break;

					case "connected":
						let video: HTMLVideoElement =
							document.querySelector("#local_video");
						video.srcObject = stream;
						message += "<br>Published";
						resolve(producer)
						break;

					case "failed":
						error = "Failed to publish";
						reject();
					default:
						break;
				}
			});

			try {
				stream = await navigator.mediaDevices.getUserMedia({
					video: true,
				});
				const track = stream.getVideoTracks()[0];
				const params = { track };
				producer = await transport.produce(params);
			} catch (err) {
				error = "getUserMedia() failed:";
				reject();
			}
		});
	}

	function subscribe() {
		message += "<br>Subscribing..."
	}

	onMount(() => {
		/*if (typeof navigator.mediaDevices.getDisplayMedia === "undefined") {
			error = "This browser is unsupported";
			return;
		}*/
		connect()
			.then(publish)
			.then(subscribe)
			.catch((err) => {
				error = err;
			});
	});
</script>

<main>
	<table>
		<tr>
			<td>
				<!-- svelte-ignore a11y-media-has-caption -->.
				<video id="local_video" controls autoplay playsinline />
			</td>
		</tr>
	</table>
	<table>
		<tr>
			<td>
				<!-- svelte-ignore a11y-media-has-caption -->.
				<video id="remote_video" controls autoplay playsinline />
			</td>
		</tr>
	</table>

	{#if message}
		<pre>{@html message}</pre>
	{/if}
	{#if error}
		<pre class="error">{@html error}</pre>
	{/if}
</main>

<style>
	.error {
		color: red;
	}
</style>
