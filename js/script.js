let map;
function initMap() {
    const viewModel = function(locations,map){
        let self = this;

        self.allLocations = [];
        locations.forEach(function(place) {
            self.allLocations.push(new Place(place));
        });    
        
        

        self.userInput = ko.observable("")
        
        //add Search Funtion
        self.filterMarkers = ko.computed(function(){
            let userInput = self.userInput().toLowerCase();

            console.log(userInput)

        },this)

        // Organize data into a Place Constructor
        function Place(dataObj) {
            this.title = dataObj.title;
            this.latLng = dataObj.latLng;
            this.marker = null;
          }

       /*
       self.filterMarkers = function() {
    var searchInput = self.userInput().toLowerCase();

    self.visiblePlaces.removeAll();

    self.allPlaces.forEach(function(place) {
      place.marker.setMap(null);

      if (place.name.toLowerCase().indexOf(searchInput) !== -1) {
        self.visiblePlaces.push(place);
      }
    });

    self.visiblePlaces().forEach(function(place) {
      place.marker.setMap(self.googleMap);
    });
  };]
       
       
       */

    }



    const locations=[
        {title: "Smithsonian Space Musem", latLng:{lat:38.8882, lng:-77.0199}},
        {title:"United States Capitol",    latLng: {lat:38.8899, lng:-77.0091}}
    ]


    const washingtonDC = {lat:38.9072, lng:-77.0369};  
    map = new google.maps.Map(document.getElementById('map'), {
    center: locations[1].latLng,
    zoom: 13
  });

  // Add Multiplle Markers
  //Search Ability
  //Display Info

  const marker = new google.maps.Marker({
    position: washingtonDC,
    map: map
  });



  ko.applyBindings(new viewModel(locations, map))

}