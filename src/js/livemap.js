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

    async updateStops(lines) {
        this.api.getTrips(true, true).then((trips) => {
            for(let stop of this.stops.getStops().values()) {
                this.resetStopInProximity(stop.id);
            }

            for(let trip of trips) {
                if(lines != null && lines.includes(trip.line.name)  === false) {
                    continue;
                }

                if(trip.currentLocation == null) {
                    continue;
                }

                const stops = this.stops.findNearestStops(trip.line.name, trip.currentLocation);

                if(stops.length < 2) {
                    continue;
                }

                const distanceBetweenStops = stops[0].distance + stops[1].distance;

                const relativeDistanceToStop1 = (stops[0].distance / distanceBetweenStops) - 0.01;
                if(relativeDistanceToStop1 > 1) {
                    relativeDistanceToStop1 = 1;
                }

                if(stops[0].stop.id === 900078101) {
                    console.log(relativeDistanceToStop1);
                }

                this.setStopInProximity(stops[0].stop.id, relativeDistanceToStop1);
                this.setStopInProximity(stops[1].stop.id, 1 - relativeDistanceToStop1);
            }
        });
    }

    resetStopInProximity(stopId) {
        const stopSymbol = this.getStopSymbol(stopId);
        if (stopSymbol == null) {
            console.debug('Station not found: ' + stopId);
            return;
        }

        for(let i=10; i<=100; i+=10) {
            stopSymbol.classList.remove('inProximity' + i);
        }
    }

    setStopInProximity(stopId, relativeDistance) {
        const stopSymbol = this.getStopSymbol(stopId);
        if (stopSymbol == null) {
            console.debug('Station not found: ' + stopId);
            return;
        }

        const brightness = 100 - (Math.round(relativeDistance * 10) * 10);
        stopSymbol.classList.add('inProximity' + brightness);
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