let map;
function initMap() {
    const viewModel = function(locations,map){
        let self = this;

        self.allLocations = [];
        locations.forEach(function(place) {
            self.allLocations.push(new Place(place));
        });    
        
        //Create the markers
        self.allLocations.forEach(function(place) {
          var markerOptions = {
            map: map,
            position: place.latLng,
            animation: google.maps.Animation.DROP,
          };
          place.marker = new google.maps.Marker(markerOptions);
        });


        self.visiblePlaces = ko.observableArray()
     
        self.userInput = ko.observable("")
        
        //add Search Function
        // The userinput value string characters must match in order to be pushed into the 
        //visible places array
        self.filterMarkers = ko.computed(function(){
            let userInput = self.userInput().toLowerCase();
            
            self.visiblePlaces.removeAll()

            self.allLocations.forEach(function(place){
              place.marker.setMap(null);
             
              if (place.title.toLowerCase().indexOf(userInput) !== -1) {
                self.visiblePlaces.push(place);
              }

            })

            // add the markers into the map
            self.visiblePlaces().forEach(function(place) {
              place.marker.setMap(map);
            });
          
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


    
    map = new google.maps.Map(document.getElementById('map'), {
    center: locations[1].latLng,
    zoom: 13
  });




  ko.applyBindings(new viewModel(locations, map))

}