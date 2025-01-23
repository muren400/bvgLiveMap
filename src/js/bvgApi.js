export default class BvgApi {
    makeApiCall(url) {
        return fetch(url).then((response) => response.json());
    }

    getTrips(suburban, subway) {
        return new Promise((resolve) => {
            const url = 'https://v6.bvg.transport.rest/trips?suburban=' + suburban + '&subway=' + subway;
            this.makeApiCall(url).then((json) => resolve(json.trips));
        });
    }

    getTripsByLine(line) {
        return new Promise((resolve) => {
            const url = 'https://v6.bvg.transport.rest/trips?lineName=' + line;
            this.makeApiCall(url).then((json) => resolve(json.trips));
        });
    }

    getDeparturesAtStop(stopId) {
        return new Promise((resolve) => {
            const url = 'https://v6.bvg.transport.rest/stops/' + stopId + '/departures?subway=true&duration=1';
            this.makeApiCall(url).then((json) => resolve(json.departures));
        });
    }
}