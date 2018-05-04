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

          const infowindow = new google.maps.InfoWindow({
            content: place.title,
          });

          const markerOptions = {
            map: map,
            position: place.latLng,
            animation: google.maps.Animation.DROP,
            infowindow: infowindow
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
          
          self.selection = ko.observable()
          self.selectionCall = function(event){
            console.log(self.selection())
          } 

        
          self.visiblePlacesLength = ko.computed(function(){
           let userinput = self.userInput()
           let visiblePlaces = self.visiblePlaces()
          if(userinput === ""){

            return "Select a Spot"
          }
          else if( userinput !== -1){
            return "results for " +  userinput +" :  " + visiblePlaces.length
          }


          })


        self.visiblePlaces().forEach(function(place){
          let marker = place.marker
          
         
          //add  markers info Window
          google.maps.event.addListener(marker, 'click', function() {
           // Clean Markers
            self.removeMarkers(map)
          // Center marker
          map.setCenter(marker.getPosition());
          //open infowindow  
            this.infowindow.open(map, this);
          });
          
        })  

        self.removeMarkers = function(map){
          self.visiblePlaces().forEach(function(place) {
            let marker = place.marker
            marker.infowindow.close(map, marker);
         }); 
        }

        
        // Organize data into a Place Constructor
        function Place(dataObj) {
            this.title = dataObj.title;
            this.latLng = dataObj.latLng;
            this.marker = null;
          }


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