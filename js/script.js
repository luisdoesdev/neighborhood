
let map;

function initMap() {
  const viewModel = function (locations, map) {
    let self = this;

    self.allLocations = [];
    locations.forEach(function (place) {
      self.allLocations.push(place);
    });


    //Create the markers and add the content to the infowidow
    self.allLocations.forEach(function (place) {
    

      const infowindow = new google.maps.InfoWindow({
        content: '<p class="h6">' + place.name + '</p>' + "<br>" + '<a href="' + place.url + '">' + " website" + '</a>'
      });

      const markerOptions = {
        map: map,
        position: place.latLng,
        animation: google.maps.Animation.DROP,
        infowindow: infowindow
      };
      place.marker = new google.maps.Marker(markerOptions);
    });



    // Output after the filter Places that can bee seen on the map after user input
    self.visiblePlaces = ko.observableArray()
    self.userInput = ko.observable("")



    //add Search Function
    // The userinput value string characters must match in order to be pushed into the 
    //visible places array
    self.filterMarkers = ko.computed(function () {
      let userInput = self.userInput().toLowerCase();

      self.visiblePlaces.removeAll()

      self.allLocations.forEach(function (place) {
        place.marker.setMap(null);



        if (place.name.toLowerCase().indexOf(userInput) !== -1) {
          self.visiblePlaces.push(place);
        }

      })

      // add the markers into the map
      self.visiblePlaces().forEach(function (place) {
        place.marker.setMap(map);
      });

    }, this)


    // Handle the user selection
    self.selection = ko.observable()
    self.selectionCall = function (event) {
      // click the marker based on this selection
      if (event === undefined) {
        console.log("NOt FounD")
      }
      marker = self.selection().marker
      google.maps.event.trigger(marker, 'click')

    }
    self.selection(self.visiblePlaces([1]))


    self.visiblePlacesLength = ko.computed(function () {
      let userinput = self.userInput()
      let visiblePlaces = self.visiblePlaces()
      if (userinput === "") {

        return "Select a Spot"
      }

      if (visiblePlaces.length === 0){
        return "Sorry no results for " + userinput + " :("
      }

      else if (userinput !== -1) {
      
        return "results for " + userinput + " :  " + visiblePlaces.length
      }


    })


    self.visiblePlaces().forEach(function (place) {
      let marker = place.marker


      //add  markers info Window
      google.maps.event.addListener(marker, 'click', function () {

        // close all infoWindows
        self.closeInfoWindows(map)

        // Center marker
        map.setCenter(marker.getPosition());

        // Bounce
        this.setAnimation(google.maps.Animation.BOUNCE)
        setTimeout(function(){ marker.setAnimation(null); }, 750);

        //open infowindow  
        this.infowindow.open(map, this);





      });




    })


    self.closeInfoWindows = function (map) {
      self.visiblePlaces().forEach(function (place) {
        let marker = place.marker
        marker.infowindow.close(map, marker);
      });
    }




  }




  const locations = [
    { title: "Smithsonian Space Musem", latLng: { lat: 38.8882, lng: -77.0199 } },
    { title: "United States Capitol", latLng: { lat: 38.8899, lng: -77.0091 } }
  ]

  let array = []


  // API Fetch and error handlers
  function callApi() {
    return new Promise(
      data => {
        let url = ""



        fetch(url)
          .then(response => response.json())

          .then(function (myJson) {
            let geocode = myJson.meta.code
           
            
            if (geocode === 400) {
              $(document).ready(function () {
                $("body").empty()
                $("body").append("<p class='h1 mt-5 text-center'>"+ "Error " + geocode + "</br>   Oh No I failed you :( </p>" + "<p class='h4 text-muted text-center'>I was not able to connect to the database <br> Please try again later</p>")
              })
            }
            else {

              let center = myJson.response.geocode.center
              let places = myJson.response.groups[0].items
              placesArray = []
              
              // Organize data into a Place Constructor
              function Place(dataObj) {
                this.id = dataObj.id;
                this.name = dataObj.name;
                this.open = dataObj.hours.isOpen;
                this.url = dataObj.url;
                this.latLng = { lat: dataObj.location.lat, lng: dataObj.location.lng };
                
              }
              places.forEach(function (place) {
                
                // Create the new object with the contructor and the push into the array
                placesArray.push(new Place(place.venue))
                
              })
              
              return data([{ center: center }, placesArray])
            }

          })
          .catch(function (error) {
            console.log(error)
            $(document).ready(function () {
              $("body").empty()
              $("body").append("<p class='h1 mt-5 text-center'> Oh No I failed you :( </p>" + "<p class='h4 text-muted text-center'>I am experiencing an error <br> don't worry the code monkey is working on it</p>")
            })
          });




      }



    )

  }










// Async then start knockout 
  async function koStart() {

    
    let loc = await callApi()


    map = new google.maps.Map(document.getElementById('map'), {
      center: loc[0].center,
      zoom: 13
    });
  


    ko.applyBindings(new viewModel(loc[1], map))
  }


  koStart()
}

function googleError(){
  alert("google error")
}