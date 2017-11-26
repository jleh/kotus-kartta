require('proj4leaflet');
var L = require('leaflet-mml-layers');
require('leaflet.markercluster');

require('leaflet/dist/leaflet.css');
require('leaflet.markercluster/dist/MarkerCluster.Default.css');

require('./map.css');

var confirmLocation = require('./locationConfirm');

var leafletMap;
var relocationOptions;

var LAYERS = {
  Maastokartta: L.tileLayer.mml_wmts({ layer: 'maastokartta' }),
  Taustakartta: L.tileLayer.mml_wmts({ layer: 'taustakartta' }),
  Ilmakuva: L.tileLayer.mml('Ortokuva_3067')
};

/*
Options
 - locations
 - mapId
 - years
*/

export function init(divId, options) {
  relocationOptions = options.relocationOptions;
  confirmLocation.setOptions(relocationOptions);

  initializeIcons(options);

  leafletMap = L.map(divId, {
    crs: L.TileLayer.MML.get3067Proj(),
    layers: [ LAYERS.Taustakartta ]
  }).setView([ 65, 25 ], 2);

  createMarkers(options.locations);

  var kotusLayer = createKotusLayer(options);

  if (!options.hideKeruukartat) {
    kotusLayer.addTo(leafletMap);
  }

  L.control.layers(LAYERS, { Keruukartat: kotusLayer }).addTo(leafletMap);
}

function initializeIcons(options) {
  L.Marker.prototype.options.icon = L.icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconAnchor: [12, 40]
  });
}

function createKotusLayer(options) {
  var wmsOptions = {
    layers: 'kotus:nadigi',
    format: 'image/png',
    transparent: true,
    elevation: options.mapId ? options.mapId : '1/1000000'
  };

  if (options.years) {
    wmsOptions['time'] = options.years[0] + '-1-1/' + options.years[1] + '-1-1';
  } else {
    wmsOptions['time'] = '1900-1-1/2000-1-1';
  }

  return L.tileLayer.wms('https://avaa.tdata.fi/geoserver/kotus/wms', wmsOptions);
}

function createMarkers(locations) {
  var markerLayer = L.markerClusterGroup({ maxClusterRadius: 40 });

  locations.forEach(function(location) {
    var marker = L.marker([ location.lat, location.lon ]).addTo(markerLayer);

    if (relocationOptions) {
      marker.bindPopup(confirmLocation.getMarkerContent(marker, location));
    } else {
      marker.bindPopup(location.text);
    }
  });

  markerLayer.addTo(leafletMap);
  leafletMap.fitBounds(markerLayer.getBounds(), { maxZoom: 12 });
}
