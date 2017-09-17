Karttakomponentti

var options = {
    locations: [ { lat, lon, text, title } ], // Kartalle tulevat kohteet
    // optional params
    years: [ start, end ]   // Keruukarttojen rajaus vuoden mukaan
    mapId: ""               // Näytä vain kyseisen id:n keruukartta
    keruukartat: boolean    // Jos true, niin keruukarttataso on oletuksena päällä
};

KotusMap.init('map-div', options);
