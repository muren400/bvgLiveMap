// const _StopIds = {
// };

// fetch('/src/csv/stops.csv').then(response => response.text()).then(csvString => {
//     const rows = csvString.split('\n');
//     rows.shift();

//     let asString = '';

//     for (let row of rows) {
//         try {
//             const values = row.split(',');

//             let id = values[0].slice(1, -1);
//             const name = values[2].slice(1, -1);

//             if (id.startsWith('de:11000:') === false || name.startsWith('U ') === false || name.endsWith('(Berlin)' === false)) {
//                 continue;
//             }

//             id = id.substring(9);

//             if (id.includes(':')) {
//                 continue;
//             }

//             const lat = values[4].slice(1, -1);
//             const lon = values[5].slice(1, -1);

//             _StopIds[id] = {
//                 name: name,
//                 lat: lat,
//                 lon: lon,
//             };

//             asString += '[' + id + ', {name: "' + name + '", lat: ' + lat + ', lon: ' + lon + '}],\n';
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     console.log(asString);
// });

const stops = new Map([
    [900002201, { name: "U Birkenstr. (Berlin)", lat: 52.532269000000, lon: 13.341418000000, id: 900002201 }],
    [900003101, { name: "U Hansaplatz (Berlin)", lat: 52.518111000000, lon: 13.342165000000, id: 900003101 }],
    [900003104, { name: "U Turmstr. (Berlin)", lat: 52.525938000000, lon: 13.341417000000, id: 900003104 }],
    [900005201, { name: "U Kurfürstenstr. (Berlin)", lat: 52.499778000000, lon: 13.362857000000, id: 900005201 }],
    [900005252, { name: "U Mendelssohn-Bartholdy-Park (Berlin)", lat: 52.503185000000, lon: 13.374679000000, id: 900005252 }],
    [900007103, { name: "U Voltastr. (Berlin)", lat: 52.541930000000, lon: 13.393157000000, id: 900007103 }],
    [900007110, { name: "U Bernauer Str. (Berlin)", lat: 52.537994000000, lon: 13.396231000000, id: 900007110 }],
    [900008102, { name: "U Reinickendorfer Str. (Berlin)", lat: 52.539887000000, lon: 13.370382000000, id: 900008102 }],
    [900009101, { name: "U Amrumer Str. (Berlin)", lat: 52.542202000000, lon: 13.349534000000, id: 900009101 }],
    [900009102, { name: "U Leopoldplatz (Berlin)", lat: 52.546493000000, lon: 13.359395000000, id: 900009102 }],
    [900009103, { name: "U Seestr. (Berlin)", lat: 52.550470000000, lon: 13.351969000000, id: 900009103 }],
    [900009201, { name: "U Nauener Platz (Berlin)", lat: 52.551524000000, lon: 13.367365000000, id: 900009201 }],
    [900009202, { name: "U Osloer Str. (Berlin)", lat: 52.557107000000, lon: 13.373279000000, id: 900009202 }],
    [900009203, { name: "U Pankstr. (Berlin)", lat: 52.552280000000, lon: 13.381437000000, id: 900009203 }],
    [900011101, { name: "U Rehberge (Berlin)", lat: 52.556670000000, lon: 13.341013000000, id: 900011101 }],
    [900011102, { name: "U Afrikanische Str. (Berlin)", lat: 52.560862000000, lon: 13.333502000000, id: 900011102 }],
    [900012102, { name: "U Kochstr./Checkpoint Charlie (Berlin)", lat: 52.506673000000, lon: 13.390863000000, id: 900012102 }],
    [900012103, { name: "U Hallesches Tor (Berlin)", lat: 52.497774000000, lon: 13.391760000000, id: 900012103 }],
    [900013101, { name: "U Moritzplatz (Berlin)", lat: 52.503739000000, lon: 13.410947000000, id: 900013101 }],
    [900013102, { name: "U Kottbusser Tor (Berlin)", lat: 52.499047000000, lon: 13.417748000000, id: 900013102 }],
    [900013103, { name: "U Prinzenstr. (Berlin)", lat: 52.498327000000, lon: 13.406551000000, id: 900013103 }],
    [900014101, { name: "U Görlitzer Bahnhof (Berlin)", lat: 52.499145000000, lon: 13.427145000000, id: 900014101 }],
    [900014102, { name: "U Schlesisches Tor (Berlin)", lat: 52.501147000000, lon: 13.441791000000, id: 900014102 }],
    [900016101, { name: "U Gneisenaustr. (Berlin)", lat: 52.491252000000, lon: 13.395382000000, id: 900016101 }],
    [900016201, { name: "U Schönleinstr. (Berlin)", lat: 52.493341000000, lon: 13.421912000000, id: 900016201 }],
    [900016202, { name: "U Südstern (Berlin)", lat: 52.489219000000, lon: 13.407685000000, id: 900016202 }],
    [900017101, { name: "U Mehringdamm (Berlin)", lat: 52.493567000000, lon: 13.388140000000, id: 900017101 }],
    [900017102, { name: "U Platz der Luftbrücke (Berlin)", lat: 52.484870000000, lon: 13.385927000000, id: 900017102 }],
    [900017103, { name: "U Gleisdreieck (Berlin)", lat: 52.499587000000, lon: 13.374293000000, id: 900017103 }],
    [900017104, { name: "U Möckernbrücke (Berlin)", lat: 52.498944000000, lon: 13.383256000000, id: 900017104 }],
    [900018101, { name: "U Jakob-Kaiser-Platz (Berlin)", lat: 52.536985000000, lon: 13.293661000000, id: 900018101 }],
    [900018102, { name: "U Halemweg (Berlin)", lat: 52.536703000000, lon: 13.286578000000, id: 900018102 }],
    [900019204, { name: "U Mierendorffplatz (Berlin)", lat: 52.525978000000, lon: 13.305715000000, id: 900019204 }],
    [900022101, { name: "U Sophie-Charlotte-Platz (Berlin)", lat: 52.510970000000, lon: 13.297463000000, id: 900022101 }],
    [900022201, { name: "U Deutsche Oper (Berlin)", lat: 52.511827000000, lon: 13.309420000000, id: 900022201 }],
    [900022202, { name: "U Richard-Wagner-Platz (Berlin)", lat: 52.517154000000, lon: 13.307221000000, id: 900022202 }],
    [900023101, { name: "U Ernst-Reuter-Platz (Berlin)", lat: 52.511582000000, lon: 13.322581000000, id: 900023101 }],
    [900023202, { name: "U Augsburger Str. (Berlin)", lat: 52.500442000000, lon: 13.336461000000, id: 900023202 }],
    [900023203, { name: "U Kurfürstendamm (Berlin)", lat: 52.503763000000, lon: 13.331419000000, id: 900023203 }],
    [900023301, { name: "U Uhlandstr. (Berlin)", lat: 52.502742000000, lon: 13.326233000000, id: 900023301 }],
    [900023302, { name: "U Adenauerplatz (Berlin)", lat: 52.500086000000, lon: 13.307348000000, id: 900023302 }],
    [900024201, { name: "U Bismarckstr. (Berlin)", lat: 52.511543000000, lon: 13.305335000000, id: 900024201 }],
    [900024202, { name: "U Wilmersdorfer Str. (Berlin)", lat: 52.506415000000, lon: 13.306774000000, id: 900024202 }],
    [900025202, { name: "U Ruhleben (Berlin)", lat: 52.525587000000, lon: 13.241902000000, id: 900025202 }],
    [900025203, { name: "U Olympia-Stadion (Berlin)", lat: 52.517048000000, lon: 13.250500000000, id: 900025203 }],
    [900026101, { name: "U Neu-Westend (Berlin)", lat: 52.516409000000, lon: 13.259910000000, id: 900026101 }],
    [900026201, { name: "U Theodor-Heuss-Platz (Berlin)", lat: 52.509798000000, lon: 13.272977000000, id: 900026201 }],
    [900026202, { name: "U Kaiserdamm (Berlin)", lat: 52.509985000000, lon: 13.281695000000, id: 900026202 }],
    [900029301, { name: "U Altstadt Spandau (Berlin)", lat: 52.539161000000, lon: 13.206763000000, id: 900029301 }],
    [900033101, { name: "U Zitadelle (Berlin)", lat: 52.537522000000, lon: 13.217625000000, id: 900033101 }],
    [900034101, { name: "U Paulsternstr. (Berlin)", lat: 52.538127000000, lon: 13.248065000000, id: 900034101 }],
    [900034102, { name: "U Haselhorst (Berlin)", lat: 52.538687000000, lon: 13.231946000000, id: 900034102 }],
    [900035101, { name: "U Siemensdamm (Berlin)", lat: 52.537026000000, lon: 13.273323000000, id: 900035101 }],
    [900036101, { name: "U Rohrdamm (Berlin)", lat: 52.536904000000, lon: 13.262870000000, id: 900036101 }],
    [900041101, { name: "U Fehrbelliner Platz (Berlin)", lat: 52.490193000000, lon: 13.314508000000, id: 900041101 }],
    [900041102, { name: "U Blissestr. (Berlin)", lat: 52.486478000000, lon: 13.320545000000, id: 900041102 }],
    [900041201, { name: "U Konstanzer Str. (Berlin)", lat: 52.493567000000, lon: 13.310084000000, id: 900041201 }],
    [900042101, { name: "U Spichernstr. (Berlin)", lat: 52.496582000000, lon: 13.330613000000, id: 900042101 }],
    [900043101, { name: "U Hohenzollernplatz (Berlin)", lat: 52.493833000000, lon: 13.324051000000, id: 900043101 }],
    [900043201, { name: "U Güntzelstr. (Berlin)", lat: 52.491992000000, lon: 13.331210000000, id: 900043201 }],
    [900044201, { name: "U Berliner Str. (Berlin)", lat: 52.487047000000, lon: 13.331355000000, id: 900044201 }],
    [900045101, { name: "U Rüdesheimer Platz (Berlin)", lat: 52.472462000000, lon: 13.314387000000, id: 900045101 }],
    [900050282, { name: "U Onkel Toms Hütte (Berlin)", lat: 52.450146000000, lon: 13.254016000000, id: 900050282 }],
    [900051201, { name: "U Freie Universität (Thielplatz) (Berlin)", lat: 52.451000000000, lon: 13.281651000000, id: 900051201 }],
    [900051202, { name: "U Breitenbachplatz (Berlin)", lat: 52.467342000000, lon: 13.309276000000, id: 900051202 }],
    [900051301, { name: "U Oskar-Helene-Heim (Berlin)", lat: 52.450419000000, lon: 13.268910000000, id: 900051301 }],
    [900051302, { name: "U Podbielskiallee (Berlin)", lat: 52.464172000000, lon: 13.295203000000, id: 900051302 }],
    [900051303, { name: "U Dahlem-Dorf (Berlin)", lat: 52.457695000000, lon: 13.290011000000, id: 900051303 }],
    [900054101, { name: "U Rathaus Schöneberg (Berlin)", lat: 52.483332000000, lon: 13.341989000000, id: 900054101 }],
    [900054102, { name: "U Kleistpark (Berlin)", lat: 52.490686000000, lon: 13.360543000000, id: 900054102 }],
    [900054103, { name: "U Eisenacher Str. (Berlin)", lat: 52.489477000000, lon: 13.350284000000, id: 900054103 }],
    [900055101, { name: "U Viktoria-Luise-Platz (Berlin)", lat: 52.496169000000, lon: 13.343264000000, id: 900055101 }],
    [900055102, { name: "U Bayerischer Platz (Berlin)", lat: 52.488654000000, lon: 13.340237000000, id: 900055102 }],
    [900056101, { name: "U Wittenbergplatz (Berlin)", lat: 52.502109000000, lon: 13.342561000000, id: 900056101 }],
    [900056102, { name: "U Nollendorfplatz (Berlin)", lat: 52.499644000000, lon: 13.353825000000, id: 900056102 }],
    [900056104, { name: "U Bülowstr. (Berlin)", lat: 52.497627000000, lon: 13.362456000000, id: 900056104 }],
    [900061101, { name: "U Walther-Schreiber-Platz (Berlin)", lat: 52.464998000000, lon: 13.328409000000, id: 900061101 }],
    [900061102, { name: "U Friedrich-Wilhelm-Platz (Berlin)", lat: 52.471439000000, lon: 13.328676000000, id: 900061102 }],
    [900062203, { name: "U Schloßstr. (Berlin)", lat: 52.461183000000, lon: 13.324836000000, id: 900062203 }],
    [900068101, { name: "U Paradestr. (Berlin)", lat: 52.478142000000, lon: 13.386725000000, id: 900068101 }],
    [900068202, { name: "U Alt-Tempelhof (Berlin)", lat: 52.465930000000, lon: 13.385796000000, id: 900068202 }],
    [900068302, { name: "U Kaiserin-Augusta-Str. (Berlin)", lat: 52.460512000000, lon: 13.384905000000, id: 900068302 }],
    [900069271, { name: "U Ullsteinstr. (Berlin)", lat: 52.453450000000, lon: 13.384771000000, id: 900069271 }],
    [900070101, { name: "U Westphalweg (Berlin)", lat: 52.445646000000, lon: 13.385744000000, id: 900070101 }],
    [900070301, { name: "U Alt-Mariendorf (Berlin)", lat: 52.438609000000, lon: 13.387920000000, id: 900070301 }],
    [900078101, { name: "U Hermannplatz (Berlin)", lat: 52.486957000000, lon: 13.424720000000, id: 900078101 }],
    [900078102, { name: "U Rathaus Neukölln (Berlin)", lat: 52.481146000000, lon: 13.434807000000, id: 900078102 }],
    [900078103, { name: "U Karl-Marx-Str. (Berlin)", lat: 52.476429000000, lon: 13.439805000000, id: 900078103 }],
    [900079201, { name: "U Leinestr. (Berlin)", lat: 52.472874000000, lon: 13.428400000000, id: 900079201 }],
    [900079202, { name: "U Boddinstr. (Berlin)", lat: 52.479745000000, lon: 13.425782000000, id: 900079202 }],
    [900080201, { name: "U Blaschkoallee (Berlin)", lat: 52.452743000000, lon: 13.448976000000, id: 900080201 }],
    [900080202, { name: "U Grenzallee (Berlin)", lat: 52.463516000000, lon: 13.444828000000, id: 900080202 }],
    [900080401, { name: "U Parchimer Allee (Berlin)", lat: 52.445299000000, lon: 13.449967000000, id: 900080401 }],
    [900080402, { name: "U Britz-Süd (Berlin)", lat: 52.437076000000, lon: 13.447668000000, id: 900080402 }],
    [900082201, { name: "U Lipschitzallee (Berlin)", lat: 52.424645000000, lon: 13.463109000000, id: 900082201 }],
    [900082202, { name: "U Johannisthaler Chaussee (Berlin)", lat: 52.429253000000, lon: 13.453851000000, id: 900082202 }],
    [900083101, { name: "U Zwickauer Damm (Berlin)", lat: 52.423032000000, lon: 13.484371000000, id: 900083101 }],
    [900083102, { name: "U Wutzkyallee (Berlin)", lat: 52.423152000000, lon: 13.474820000000, id: 900083102 }],
    [900083201, { name: "U Rudow (Berlin)", lat: 52.415714000000, lon: 13.496527000000, id: 900083201 }],
    [900085104, { name: "U Paracelsus-Bad (Berlin)", lat: 52.574432000000, lon: 13.347301000000, id: 900085104 }],
    [900085202, { name: "U Franz-Neumann-Platz (Berlin)", lat: 52.563854000000, lon: 13.364283000000, id: 900085202 }],
    [900085203, { name: "U Residenzstr. (Berlin)", lat: 52.570843000000, lon: 13.360635000000, id: 900085203 }],
    [900086102, { name: "U Kurt-Schumacher-Platz (Berlin)", lat: 52.563483000000, lon: 13.327328000000, id: 900086102 }],
    [900086160, { name: "U Lindauer Allee (Berlin)", lat: 52.575386000000, lon: 13.339036000000, id: 900086160 }],
    [900096410, { name: "U Rathaus Reinickendorf (Berlin)", lat: 52.588218000000, lon: 13.325568000000, id: 900096410 }],
    [900100008, { name: "U Heinrich-Heine-Str. (Berlin)", lat: 52.510558000000, lon: 13.416124000000, id: 900100008 }],
    [900100009, { name: "U Naturkundemuseum (Berlin)", lat: 52.531254000000, lon: 13.382415000000, id: 900100009 }],
    [900100010, { name: "U Mohrenstr. (Berlin)", lat: 52.511519000000, lon: 13.383798000000, id: 900100010 }],
    [900100011, { name: "U Stadtmitte (Berlin)", lat: 52.511495000000, lon: 13.389719000000, id: 900100011 }],
    [900100012, { name: "U Hausvogteiplatz (Berlin)", lat: 52.513361000000, lon: 13.395346000000, id: 900100012 }],
    [900100013, { name: "U Spittelmarkt (Berlin)", lat: 52.511411000000, lon: 13.402031000000, id: 900100013 }],
    [900100014, { name: "U Märkisches Museum (Berlin)", lat: 52.512007000000, lon: 13.408767000000, id: 900100014 }],
    [900100015, { name: "U Klosterstr. (Berlin)", lat: 52.517229000000, lon: 13.412455000000, id: 900100015 }],
    [900100016, { name: "U Rosa-Luxemburg-Platz (Berlin)", lat: 52.528191000000, lon: 13.410405000000, id: 900100016 }],
    [900100017, { name: "U Schillingstr. (Berlin)", lat: 52.520316000000, lon: 13.421895000000, id: 900100017 }],
    [900100019, { name: "U Oranienburger Tor (Berlin)", lat: 52.525163000000, lon: 13.387587000000, id: 900100019 }],
    [900100023, { name: "U Rosenthaler Platz (Berlin)", lat: 52.529781000000, lon: 13.401393000000, id: 900100023 }],
    [900100045, { name: "U Rotes Rathaus (Berlin)", lat: 52.518462000000, lon: 13.407061000000, id: 900100045 }],
    [900100051, { name: "U Weinmeisterstr. (Berlin)", lat: 52.525376000000, lon: 13.405305000000, id: 900100051 }],
    [900100501, { name: "U Schwartzkopffstr. (Berlin)", lat: 52.535397000000, lon: 13.377033000000, id: 900100501 }],
    [900100513, { name: "U Unter den Linden (Berlin)", lat: 52.516996000000, lon: 13.388876000000, id: 900100513 }],
    [900100537, { name: "U Museumsinsel (Berlin)", lat: 52.518086000000, lon: 13.400394000000, id: 900100537 }],
    [900110005, { name: "U Senefelderplatz (Berlin)", lat: 52.532622000000, lon: 13.412625000000, id: 900110005 }],
    [900110006, { name: "U Eberswalder Str. (Berlin)", lat: 52.541085000000, lon: 13.412160000000, id: 900110006 }],
    [900120006, { name: "U Strausberger Platz (Berlin)", lat: 52.518025000000, lon: 13.432208000000, id: 900120006 }],
    [900120008, { name: "U Frankfurter Tor (Berlin)", lat: 52.515772000000, lon: 13.454085000000, id: 900120008 }],
    [900120009, { name: "U Samariterstr. (Berlin)", lat: 52.514662000000, lon: 13.465347000000, id: 900120009 }],
    [900120025, { name: "U Weberwiese (Berlin)", lat: 52.516848000000, lon: 13.443278000000, id: 900120025 }],
    [900130011, { name: "U Vinetastr. (Berlin)", lat: 52.559517000000, lon: 13.413770000000, id: 900130011 }],
    [900160005, { name: "U Magdalenenstr. (Berlin)", lat: 52.512457000000, lon: 13.487492000000, id: 900160005 }],
    [900161002, { name: "U Tierpark (Berlin)", lat: 52.497236000000, lon: 13.523626000000, id: 900161002 }],
    [900161512, { name: "U Friedrichsfelde (Berlin)", lat: 52.505464000000, lon: 13.513544000000, id: 900161512 }],
    [900171005, { name: "U Biesdorf-Süd (Berlin)", lat: 52.499517000000, lon: 13.547326000000, id: 900171005 }],
    [900171006, { name: "U Elsterwerdaer Platz (Berlin)", lat: 52.505133000000, lon: 13.560646000000, id: 900171006 }],
    [900175004, { name: "U Kaulsdorf-Nord (Berlin)", lat: 52.521436000000, lon: 13.588763000000, id: 900175004 }],
    [900175005, { name: "U Kienberg (Gärten der Welt) (Berlin)", lat: 52.528490000000, lon: 13.590550000000, id: 900175005 }],
    [900175006, { name: "U Cottbusser Platz (Berlin)", lat: 52.533963000000, lon: 13.596894000000, id: 900175006 }],
    [900175007, { name: "U Hellersdorf (Berlin)", lat: 52.536328000000, lon: 13.605323000000, id: 900175007 }],
    [900175010, { name: "U Hönow (Berlin)", lat: 52.538105000000, lon: 13.634541000000, id: 900175010 }],
    [900175015, { name: "U Louis-Lewin-Str. (Berlin)", lat: 52.539135000000, lon: 13.619707000000, id: 900175015 }],
    [900050201, { name: "U Krumme Lanke (Berlin)", lat: 52.442615000000, lon: 13.240360000000, id: 900050201 }],
    [900003254, { name: "U Bundestag (Berlin)", lat: 52.520110000000, lon: 13.372952000000, id: 900003254 }],
]);

export default class BvgStops {
    findStopByCoords(location) {
        for (let stop of stops.values()) {
            if(this._isNearCoord(location.latitude, location.longitude, stop.lat, stop.lon) === true) {
                return stop;
            }
        }

        return null;
    }

    getStops() {
        return stops;
    }

    _isNearCoord(lat1, lon1, lat2, lon2, epsilon = 0.002) {
        return Math.abs(lat1 - lat2) < epsilon
                && Math.abs(lon1 - lon2) < epsilon;
    }
};