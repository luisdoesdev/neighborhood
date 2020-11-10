(function initMap() {
  let intialVal = {
    name: "Washington Monument",
    lat: 38.889455,
    lng: -77.035218,
  };

  mapboxgl.accessToken =
    "pk.eyJ1IjoibGV0b3JydWVsbGEiLCJhIjoiY2swZXI3ZXQ1MGtqNzNicG1yYTZzNHVodSJ9.TxyMy_xrdGKfY-sh47Pu4g";
  const map = new mapboxgl.Map({
    container: "map", // container id
    style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
    center: [intialVal.lng, intialVal.lat], // starting position [lng, lat]
    zoom: 12, // starting zoom
  });


async function koStart() {

  // Get Places
  let loc = await controller.getPlaces();
  
  let viewModel = new view()

  ko.applyBindings(viewModel.addMarker(loc[1], map));
  

  }

// Initit Knockout 
koStart();




})();
