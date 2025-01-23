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

                const stop = this.stops.findStopByCoords(trip.currentLocation);
                if(stop == null) {
                    console.log('not at stop');
                    const lastStopId = this.lastTripStops.get(trip.id);
                    if(lastStopId != null) {
                        this.setStopVisited(lastStopId, false, true);
                    }

                    continue;
                }

                const stopSymbol = this.getStopSymbol(stop.id);
                if(stopSymbol == null) {
                    console.log('stop not on map');
                    continue;
                }

                if(stopSymbol.classList.contains(trip.line.name) === false) {
                    console.log('stop not for line');
                    continue;
                }

                console.log(stop.name);
                this.setStopVisited(stop.id, true);
                this.lastTripStops.set(trip.id, stop.id);
            }
        });
    }

    setStopVisited(stopId, visited, left) {
        const stopSymbol = this.getStopSymbol(stopId);
        if (stopSymbol == null) {
            console.warn('Station not found: ' + stopId);
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