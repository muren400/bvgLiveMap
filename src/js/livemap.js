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
        this.initStops();
    }

    initStops() {
        const group = this.createSvgNode('g', {id: 'stops'}, this.svg.firstChild);

        for(let path of this.svg.getElementsByTagName('path')) {
            if(path.classList.contains('station') === false) {
                continue;
            }

            const attributes = {
                id: path.id.replace('station-900000', 'stop-900'),
                d: path.getAttribute('d'),
                class: 'stop',
            }

            const stopNode = this.createSvgNode('path', attributes, group);
        }
    }

    createSvgNode(name, attributes = {}, parent) {
        const node = document.createElementNS("http://www.w3.org/2000/svg", name);
        for (let key in attributes) {
            node.setAttributeNS(null, key, attributes[key]);
        }

        parent?.appendChild(node);
          
        return node;
      }

    async updateStops(lines) {
        this.api.getTrips(true, true).then((trips) => {
            for (let stop of this.stops.getStops().values()) {
                this.resetStopInProximity(stop.id);
            }

            for (let trip of trips) {
                if (lines != null && lines.includes(trip.line.name) === false) {
                    continue;
                }

                if (trip.currentLocation == null) {
                    continue;
                }

                const stops = this.stops.findNearestStops(trip.line.name, trip.currentLocation);

                if (stops.length < 2) {
                    continue;
                }

                const distanceBetweenStops = stops[0].distance + stops[1].distance;

                const relativeDistanceToStop1 = (stops[0].distance / distanceBetweenStops) - 0.01;
                if (relativeDistanceToStop1 > 1) {
                    relativeDistanceToStop1 = 1;
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

        for (let i = 10; i <= 100; i += 10) {
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

    getStopSymbol(stopId) {
        return this.svg.getElementById('stop-' + stopId);
    }

    initControlls() {
        this.svg.addEventListener('wheel', (ev) => {
            if (ev.ctrlKey === true) {
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