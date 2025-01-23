import { LiveMap } from "./livemap.js";

window.delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};

const liveMap = new LiveMap();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const line = urlParams.get('line');

const lines = line != null ? [line] : ['U1', 'U2', 'U3', 'U5', 'U6', 'U7', 'U8', 'U9', 'S1', 'S2', 'S3', 'S41', 'S42'];

setInterval(() => {
    const line = lines.shift();
    liveMap.updateStops();
    lines.push(line);
}, 1000);