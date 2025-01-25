import BvgApi from "./bvgApi.js";
import BvgStops from "./bvgStops.js";

export class LiveMap {
    constructor() {
        this.map = document.getElementById('map');
        this.svg = this.map.getSVGDocument();
        this.api = new BvgApi();
        this.stops = new BvgStops();
        this.lastTripStops = new Map();
        this.visitedStations = new Map();

        this.initControlls();
    }

    async updateStops(line) {
        this.api.getTrips(true, true).then((trips) => {
            for(let stop of this.stops.getStops().values()) {
                this.setStopVisited(stop.id, false);
            }

            for(let trip of trips) {
                if(line != null && trip.line.name !== line.toUpperCase()) {
                    continue;
                }

                if(trip.currentLocation == null) {
                    continue;
                }

                const stop = this.stops.findNearestStop(trip.line.name, trip.currentLocation);
                if(stop == null) {
                    continue;
                }

                const distance = this.stops.getDistanceInM(trip.currentLocation.latitude, trip.currentLocation.longitude, stop.lat, stop.lon);
                const tripAtStop = distance < 200;

                console.debug(stop.name);
                this.setStopVisited(stop.id, tripAtStop, !tripAtStop);
                this.lastTripStops.set(trip.id, stop.id);
            }
        });
    }

    setStopVisited(stopId, visited, left) {
        const stopSymbol = this.getStopSymbol(stopId);
        if (stopSymbol == null) {
            console.debug('Station not found: ' + stopId);
            return;
        }

        if(visited === true) {
            stopSymbol.classList.add('visited');
        } else if(left === true && stopSymbol.classList.contains(visited) === false) {
            stopSymbol.classList.add('left');
        } else {
            stopSymbol.classList.remove('visited');
            stopSymbol.classList.remove('left');
        }
        
    }

    getStopSymbol(stopId) {
        const id = ('station-' + stopId).replace('900', '900000')
        return this.svg.getElementById(id);
    }

    initControlls() {
        this.svg.addEventListener('wheel', (ev) => {
            if(ev.ctrlKey === true) {
                this.zoom(ev.deltaY);
                ev.preventDefault();
            }
        }, { passive: false });
    }

    zoom(delta) {
        this.map.style.width = (this.map.scrollWidth - delta) + 'px';
        this.map.style.height = (this.map.scrollHeight - delta) + 'px'
    }
}