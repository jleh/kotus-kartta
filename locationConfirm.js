var confirmLocationTemplate = require('./templates/confirmLocation.hbs');
var locationConfirmed = require('./templates/locationConfirmed.hbs');
var relocateMarker = require('./templates/relocateMarker.hbs');

function getMarkerContent(marker, text) {
  var div = document.createElement('div');
  
  div.innerHTML = confirmLocationTemplate({ markerText: text });
  div.getElementsByClassName('correct-location')[0].onclick = correctLocationConfirmed.bind(div);
  div.getElementsByClassName('incorrect-location')[0].onclick = incorrectLocationConfirmed.bind(marker);

  return div;
};

function correctLocationConfirmed() {
  getContent(this).innerHTML = locationConfirmed();
};

function incorrectLocationConfirmed() {
  this.closePopup();
  // TODO: Open relocation dialog + create relocation marker
}

function getContent(ctx) {
  return ctx.getElementsByClassName('edit-controls')[0];
}

module.exports.getMarkerContent = getMarkerContent;
