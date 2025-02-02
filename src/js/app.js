import { LiveMap } from "./livemap.js";

window.delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};

const liveMap = new LiveMap();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const line = urlParams.get('line');

const lines = line != null ? [line.toUpperCase()] : ['U1', 'U2', 'U3', 'U5', 'U6', 'U7', 'U8', 'U9', 'S1', 'S2', 'S3', 'S41', 'S42'];

if(urlParams.has('showCars')) {
    liveMap.showCars = urlParams.get('showCars').toLocaleLowerCase() === 'true';
}

if(urlParams.has('showCarLabels')) {
    liveMap.showCarLabels = urlParams.get('showCarLabels').toLocaleLowerCase() === 'true';
}

if(urlParams.has('highlightStops')) {
    liveMap.highlightStops = urlParams.get('highlightStops').toLocaleLowerCase() === 'true';
}

liveMap.updateStops(lines);

setInterval(() => {
    liveMap.updateStops(lines);
}, 5000);