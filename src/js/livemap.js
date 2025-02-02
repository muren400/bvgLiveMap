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

        this.tripsG = this.createSvgNode('g', { id: 'trips' }, this.svg.firstChild);

        this.showCars = false;
        this.showCarLabels = false;
        this.highlightStops = true;
    }

    initStops() {
        const group = this.createSvgNode('g', { id: 'stops' }, this.svg.firstChild);

        for (let path of this.svg.getElementsByTagName('path')) {
            if (path.classList.contains('station') === false) {
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

    updateStops(lines) {
        this.api.getTrips(true, true).then((trips) => {
            this.resetMap();

            for (let trip of trips) {
                if (lines != null && lines.includes(trip.line.name) === false) {
                    continue;
                }

                this.updateTrip(trip);
            }
        });
    }

    updateTrip(trip) {
        if (trip.currentLocation == null) {
            return;
        }

        const stops = this.stops.findNearestStops(trip.line.name, trip.currentLocation);
        if (stops.length < 2) {
            return;
        }

        const distanceBetweenStops = stops[0].distance + stops[1].distance;

        const relativeDistanceToStop1 = (stops[0].distance / distanceBetweenStops) - 0.01;
        if (relativeDistanceToStop1 > 1) {
            relativeDistanceToStop1 = 1;
        }

        this.setStopInProximity(stops[0].stop.id, relativeDistanceToStop1);
        this.setStopInProximity(stops[1].stop.id, 1 - relativeDistanceToStop1);

        this.createCarSymbol(trip, stops);
    }

    resetMap() {
        this.destroyCarSymbols();

        for (let stop of this.stops.getStops().values()) {
            this.resetStopInProximity(stop.id);
        }
    }

    destroyCarSymbols() {
        for (let circle of this.tripsG.getElementsByTagName('circle')) {
            if (circle.classList.contains('trip') === false) {
                continue;
            }

            circle.classList.add('hidden');
        }

        for (let label of this.tripsG.getElementsByTagName('text')) {
            if (label.classList.contains('trip-label') === false) {
                continue;
            }

            label.classList.add('hidden');
        }
    }

    createCarSymbol(trip, stops) {
        if (this.showCars === false) {
            return;
        }

        const tripPosition = this.calculateCarPosition(stops);
        if (tripPosition == null) {
            return;
        }

        const oldCarSymbol = this.svg.getElementById('trip-' + trip.id);
        if (oldCarSymbol != null) {
            this.updateCarSymbol(oldCarSymbol, trip, tripPosition);
            return;
        }

        this.createSvgNode('circle', {
            class: 'trip',
            id: 'trip-' + trip.id,
            nearesStop: stops[0].stop.id,
            cx: tripPosition[0],
            cy: tripPosition[1],
            r: 1,
        }, this.tripsG);

        if (this.showCarLabels === true) {
            const label = this.createSvgNode('text', {
                class: 'trip-label',
                id: 'trip-label-' + trip.id,
                x: tripPosition[0] + 5,
                y: tripPosition[1] + 5,
            }, this.tripsG);

            label.textContent = trip.line.name + ' - ' + trip.destination.name;
        }
    }

    calculateCarPosition(stops) {
        const stopSymbol1 = this.getStopSymbol(stops[0].stop.id);
        const stopSymbol2 = this.getStopSymbol(stops[1].stop.id);

        if (stopSymbol1 == null || stopSymbol2 == null) {
            return null;
        }

        const center1 = this.getSymbolCenter(stopSymbol1);
        const center2 = this.getSymbolCenter(stopSymbol2);

        const distanceBetweenStops = stops[0].distance + stops[1].distance;
        const relativeDistanceToStop1 = (stops[0].distance / distanceBetweenStops);

        return this.interpolate(center1, center2, relativeDistanceToStop1);
    }

    updateCarSymbol(oldCarSymbol, trip, tripPosition) {
        oldCarSymbol.setAttributeNS(null, 'cx', tripPosition[0]);
        oldCarSymbol.setAttributeNS(null, 'cy', tripPosition[1]);
        oldCarSymbol.classList.remove('hidden');

        const oldLabelSymbol = this.svg.getElementById('trip-label-' + trip.id);

        if (oldLabelSymbol == null) {
            return;
        }

        oldLabelSymbol.setAttributeNS(null, 'x', tripPosition[0] + 2);
        oldLabelSymbol.setAttributeNS(null, 'y', tripPosition[1] + 2);
        oldLabelSymbol.classList.remove('hidden');
    }

    interpolate(point1, point2, t) {
        return [
            (1 - t) * point1[0] + t * point2[0],
            (1 - t) * point1[1] + t * point2[1],
        ];
    }

    getSymbolCenter(symbol) {
        const bounds = symbol.getBBox();
        return [
            bounds.x + (bounds.width / 2),
            bounds.y + (bounds.height / 2),
        ];
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
        if (this.highlightStops === false) {
            return;
        }

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