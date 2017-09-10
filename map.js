require('proj4leaflet');
var L = require('leaflet-mml-layers');

var leafletMap;

require('leaflet/dist/leaflet.css');

L.Marker.prototype.options.icon = L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

var LAYERS = {
  openstreetmap: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  })
};

/*
Options
 - latlng
 - mapId
 - years
*/

export function init(divId, options) {
  leafletMap = L.map(divId, {
    crs: L.TileLayer.MML.get3067Proj()
  })
  .setView([options.latlng[0], options.latlng[1]], 10);

  leafletMap.addLayer(LAYERS.openstreetmap);
  leafletMap.addLayer(createKotusLayer(options));
  L.marker([options.latlng[0], options.latlng[1]]).addTo(leafletMap);
}

function createKotusLayer(options) {
  var wmsOptions = {
    layers: 'kotus:new_tif',
    format: 'image/png',
    transparent: true,
    elevation: options.mapId ? options.mapId : '1/100000'
  };

  if (options.years) {
    wmsOptions['time'] = options.years[0] + '-1-1/' + options.years[1] + '-1-1'
  }

  return L.tileLayer.wms('https://avoin-test.csc.fi/geoserver/kotus/wms', wmsOptions);
}
