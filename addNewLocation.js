require('proj4leaflet');
var L = require('leaflet-mml-layers');
var formTemplate = require('./templates/newLocation.hbs');

var formDiv;
var leafletMap;
var locationMarker;

function init(options) {
  formDiv = document.getElementById(options.div);
  formDiv.innerHTML = formTemplate({});
  createMap(formDiv.getElementsByClassName('new-location-map')[0], options.location);

  formDiv.getElementsByClassName('new-location-save')[0].onclick = saveNewLocation.bind(this, options);
  formDiv.getElementsByClassName('new-location-cancel')[0].onclick = cancel.bind(this, options);
};

function createMap(div, location) {
  L.Marker.prototype.options.icon = L.icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconAnchor: [12, 40]
  });

  leafletMap = L.map(div, {
    crs: L.TileLayer.MML.get3067Proj(),
    layers: [ L.tileLayer.mml_wmts({ layer: 'maastokartta' }) ]
  });

  if (location) {
    leafletMap.setView(location, 11);
  } else {
    leafletMap.setView([ 65, 25 ], 2);
  }

  locationMarker = L.marker(leafletMap.getCenter(), { draggable: true }).addTo(leafletMap);
}

function saveNewLocation(options) {
  if (getValue('name') === '') {
    formDiv.getElementsByClassName('new-location-name-label')[0].style.color = 'red';
    return;
  }

  options.save({
    name: getValue('name'),
    type: getValue('type'),
    description: getValue('description'),
    location: locationMarker.getLatLng().toString()
  });

  init(options);
}

function getValue(name) {
  return formDiv.getElementsByClassName('new-location-' + name)[0].value;
}

function cancel(options) {
  init(options);

  if (options.cancel) {
    options.cancel();
  }
}

module.exports = init;
