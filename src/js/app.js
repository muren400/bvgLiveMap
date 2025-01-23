import { LiveMap } from "./livemap.js";

window.delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};

const liveMap = new LiveMap();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const line = urlParams.get('line');

const lines = line != null ? [line] : ['U1', 'U2', 'U3', 'U6', 'U7', 'U8', 'U9'];

setInterval(() => {
    const line = lines.shift();
    liveMap.updateStops(line);
    lines.push(line);
}, 5000);