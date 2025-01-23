import { LiveMap } from "./livemap.js";

window.delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};

const liveMap = new LiveMap();

const lines = ['U1', 'U2', 'U3', 'U6', 'U7', 'U8', 'U9'];

setInterval(() => {
    const line = lines.shift();
    liveMap.updateStops(line);
    lines.push(line);
}, 5000);