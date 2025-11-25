import { LiveMap } from "./livemap.js";

window.delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
};

const liveMap = new LiveMap();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const line = urlParams.get('line');

const lines = line != null ? [line.toUpperCase()] : null;

if(urlParams.has('showCars')) {
    liveMap.showCars = urlParams.get('showCars').toLocaleLowerCase() === 'true';
}

if(urlParams.has('showCarLabels')) {
    liveMap.showCarLabels = urlParams.get('showCarLabels').toLocaleLowerCase() === 'true';
}

if(urlParams.has('highlightStops')) {
    liveMap.highlightStops = urlParams.get('highlightStops').toLocaleLowerCase() === 'true';
}

if(urlParams.has('interval')) {
    liveMap.interval = parseInt(urlParams.get('interval'), 10);
}

liveMap.updateStops(lines);

setInterval(() => {
    liveMap.updateStops(lines);
}, liveMap.interval || 5000);
