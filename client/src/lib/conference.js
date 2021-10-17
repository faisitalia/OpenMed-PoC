// imports
import RoomClient from "./RoomClient";
import deviceInfo from "./deviceInfo";
import store from "../store";

let associationMap = {}

// read configuration
export function conferenceInit(roomId, peerId, displayName, onStateUpdate) {
	const handlerName = "";
	const useSimulcast = true;
	const useSharingSimulcast = true;
	const forceTcp = false;
	const produce = true;
	const consume = true;
	const forceH264 = false;
	const forceVP9 = false;
	const svc = "";
	const datachannel = true;
	const externalVideo = false
	const e2eKey = ""
	let device = deviceInfo();
	RoomClient.init({ store });
	let roomClient = new RoomClient({
		roomId,
		peerId,
		displayName,
		device,
		handlerName,
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
	RoomClient.init({ store });
	store.subscribe(onStateUpdate)
	return roomClient;
}

// find an element with an empty source of a given type with an id with the given prefix
function findEmptySrc(componentType, prefix) {
	let elems = document.querySelectorAll(componentType)
	for (let elem of elems) {
		if (elem.id.startWith(prefix) && elem.srcObject == null) {
			return elem
		}
	}
	return null
}

export function associateTrack(components, componentType, prefix) {
	if (!components)
		return null
	for (let key in components) {
		let track = components[key].track;
		if(!track) {
			console.log("no track for ",prefix, componentType, key)
			continue
		}
		if (track.kind != componentType)
			continue
		if (key in associationMap)
			continue
		// create stream
		let element = findEmptySrc(componentType, prefix)
		if (!element) {
			console.log("no more slots available")
			return
		}
		console.log("associating ", prefix, componentType, key, " to ", element.id)
		associationMap[key] = track
		const stream = new MediaStream()
		stream.addTrack(track)
		element.srcObject = stream
	}
}
