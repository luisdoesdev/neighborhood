(function initApp() {

let mapView = new View()
mapView.initMap()
async function koStart() {

  // Get Places
  let loc = await controller.getPlaces();


  let koView= new View()

  ko.applyBindings(koView.KnockoutView,loc);
  

}

// Init Knockout 
koStart();

})();
