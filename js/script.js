let map;
function initMap() {
    const viewModel = function(locations,map){
        let self = this;
      console.log(array)
        self.allLocations = [];
        locations.forEach(function(place) {
            self.allLocations.push(new Place(place));
        });    
        
        //Create the markers
        self.allLocations.forEach(function(place) {

          const infowindow = new google.maps.InfoWindow({
            content: place.name,
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
             

             
              if (place.name.toLowerCase().indexOf(userInput) !== -1) {
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
              marker = self.selection().marker
              google.maps.event.trigger(marker, 'click')

              
            

          } 
          self.selection(self.visiblePlaces([1]))
          console.log(self.selection())
          
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

            console.log(this)

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
            this.name = dataObj.name;
            this.latLng = dataObj.latLng;
            this.isOpen = dataObj.isOpen
            this.marker = null;
          }


    }



    const locations=[
        {title: "Smithsonian Space Musem", latLng:{lat:38.8882, lng:-77.0199}},
        {title:"United States Capitol",    latLng: {lat:38.8899, lng:-77.0091}}
    ]

let array = []
// API Fetch and error handlers

function callApi() {
      return new Promise(
        data =>{
          let url = "https://api.foursquare.com/v2/venues/explore?near=DC&oauth_token=RESIPMEAGVEW15LFDBO5Z24PCGEF4SBG4FFCLXRNJA12NJKK&v=20180507"
          
          

        fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          let center = myJson.response.geocode.center
          let places = myJson.response.groups[0].items
          placesArray  = [] 

          places.forEach(function(place){
            let placeVenue = place.venue

            // Organize data into a Place Constructor
            function Place(dataObj) {
              this.name = dataObj.name;
              this.open = dataObj.hours.isOpen;
              this.url = dataObj.url;
              this.latLng = {lat:dataObj.location.lat, lng:dataObj.location.lng};
              
            }

            placesArray.push(new Place(placeVenue))

         
          })

         return data( [{center:center} , placesArray])
          
        
        });

              
      
      }
        
        
      )
      
    }
   
  
        
      
    
 
    
    
    
    
    
    async function koStart(){
      
      //console.log(await callApi())
      let loc = await callApi()

      console.log(loc[1])
          map = new google.maps.Map(document.getElementById('map'), {
          center: loc[0].center,
          zoom: 13
        });
  //array.push(await callApi())


  ko.applyBindings(new viewModel(loc[1], map))
 }
 koStart()
}