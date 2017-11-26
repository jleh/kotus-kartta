var L = require('leaflet');

var confirmLocationTemplate = require('./templates/confirmLocation.hbs');
var locationConfirmed = require('./templates/locationConfirmed.hbs');
var relocateMarker = require('./templates/relocateMarker.hbs');

var relocationStarted = false;
var options;
var relocationDialog;
var originalPosition;

function getMarkerContent(marker, data) {
  var div = document.createElement('div');

  div.innerHTML = confirmLocationTemplate({ markerText: data.text });
  div.getElementsByClassName('correct-location')[0].onclick = correctLocationConfirmed.bind(div, data, marker);
  div.getElementsByClassName('incorrect-location')[0].onclick = incorrectLocationConfirmed.bind(marker, data);

  return div;
};

function correctLocationConfirmed(data, marker) {
  getContent(this).innerHTML = locationConfirmed();
  getContent(this).getElementsByClassName('incorrect-location')[0].onclick = incorrectLocationConfirmed.bind(marker, data);
  options.locationConfirmed(data.title);
};

function incorrectLocationConfirmed(data) {
  if (relocationStarted)
    cancelRelocation();

  if (options.incorrectLocationConfirmed)
    options.incorrectLocationConfirmed(data.title);

  this.closePopup();
  this.dragging.enable();
  createOriginalPositionMarker(this);
  relocationStarted = true;
  
  relocationDialog = L.DomUtil.create('div', 'relocation-dialog', this._map.getContainer());
  relocationDialog.innerHTML = relocateMarker();
  relocationDialog.getElementsByClassName('add-comment')[0].onclick = enableComment.bind(relocationDialog);
  relocationDialog.getElementsByClassName('cancel-button')[0].onclick = cancelRelocation;
  relocationDialog.getElementsByClassName('save-button')[0].onclick = saveLocation.bind(relocationDialog, data, this);

  L.DomEvent.disableClickPropagation(relocationDialog);
}

function enableComment() {
  var commentArea = this.getElementsByClassName('add-comment')[0];

  commentArea.getElementsByClassName('enable-comment')[0].style.display = 'none';
  commentArea.getElementsByClassName('comment-text')[0].style.display = 'block';
}

function cancelRelocation() {
  reset();
}

function saveLocation(data, marker) {
  var comment = relocationDialog.getElementsByClassName('comment-text')[0].value;
  
  options.saveLocation({
    comment: comment,
    id: data.title,
    location: {
      lat: marker.getLatLng().lat,
      lon: marker.getLatLng().lng
    }
  });
  reset();
}

function reset() {
  relocationStarted = false;
  L.DomUtil.remove(relocationDialog);
  originalPosition.remove();
}

function createOriginalPositionMarker(marker) {
  originalPosition = L.circleMarker(marker.getLatLng()).addTo(marker._map);
}

function getContent(ctx) {
  return ctx.getElementsByClassName('edit-controls')[0];
}

function setOptions(providedOptions) {
  options = providedOptions;
}

module.exports.getMarkerContent = getMarkerContent;
module.exports.relocationStarted = relocationStarted;
module.exports.setOptions = setOptions;
