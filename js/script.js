"use strict";

//Model
let placesArray = [];

//View Model
const viewModel = function (locations, map) {
  let self = this;
 
  self.allLocations = [];
  
  locations.features.forEach( (place) =>{
    self.allLocations.push(place);
  });

  //Create the markers and add the content to the infowidow
  let stories = function(place){
    let title = place.properties.title
    let url = place.url
    let description = place.properties.description
    return `<div >
    <h3>${title}</h3>
    <a href="${url}">website</a>
    <p>${description}</p>
    </div>`
  }

  self.allLocations.forEach( (place) =>{
   place.map = new mapboxgl.Marker()
                .setLngLat(place.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25, className:'card-container'}) // add popups
                .setHTML(stories(place)))
                .addTo(map)
                

  });

  // Output after the filter Places that can bee seen on the map after user input
  
  //self.visiblePlaces = ko.observableArray(["he;;"]);

  self.userInput = ko.observable('');
  

  self.results = ko.pureComputed(function(){
    // get user input
    // filter
    // remove
    
    let userInput = self.userInput()
    
   
    if(userInput.length > 0){
    let filterLocs = self.allLocations.filter(
      place=>place.properties.title.toLowerCase().includes(userInput.toLowerCase()));
    //filterLocs.map.remove()
    let arrPos = []  

    self.allLocations.forEach((place)=>{
      place.map.remove()
    })

    filterLocs.filter((place)=>{
      place.map.addTo(map)
    })  


  


    console.log(arrPos)

    
   
  }

    return self.userInput()

  })

  /*

  self.results = ko.computed(()=>{
    let userInput = self.userInput()
    self.visiblePlaces.removeAll();
    


    allLocations.forEach(function (place) {
      //place.marker.setMap(null);
        console.log("bfore: " + place.properties.title)
      if (place.properties.title.toLowerCase().indexOf(userInput) !== -1) {
        console.log("after: " + place.properties.title)
      }
    });


   // console.log(self.visiblePlaces())



    return userInput
  }).extend({throttle:500})
  */
  self.filterMarkers = ko.computed(()=>{
    console.log("hello")
  })

  //add Search Function
  // The userinput value string characters must match in order to be pushed into the
  //visible places array
  /*
  self.filterMarkers = ko.computed(function () {
    let userInput = self.userInput().toLowerCase();

    self.visiblePlaces.removeAll();

    self.allLocations.forEach(function (place) {
      //place.marker.setMap(null);
        console.log(place)
      if (place.name.toLowerCase().indexOf(userInput) !== -1) {
        self.visiblePlaces.push(place);
      }
    });
  })*/

    // add the markers into the map
    //let bound = new google.maps.LatLngBounds();

    //handle bounds when array empty
   /* if (self.visiblePlaces().length === 0) {
      bound.extend({ lat: 38.9072, lng: -77.0369 });
    }
   
   
    self.visiblePlaces().forEach(function (place) {
      place.marker.setMap(map);
      bound.extend(place.marker.getPosition());
    });
    // Zoom and fit to the markers avilable position
    map.fitBounds(bound);
  }, this);*/

  // Handle the user selection
  self.selection = ko.observable();
  
  
  /*self.selectionCall = function (event) {
    // click the marker based on this selection
    if (event === undefined) {
      console.log("NOt Found");
    }

    let marker = self.selection().marker;
    console.log();
    google.maps.event.trigger(marker, "click");
  };

  self.selection(self.visiblePlaces([1]));

  self.visiblePlacesLength = ko.computed(function () {
    let userInput;
    userInput = self.userInput();
    let visiblePlaces = self.visiblePlaces();

    if (userInput === "") {
      return "Select a Spot";
    }

    if (visiblePlaces.length === 0) {
      return "Sorry no results for " + userInput + " :(";
    } else if (userInput !== -1) {
      return "results for " + userInput + " :  " + visiblePlaces.length;
    }
  });

  self.visiblePlaces().forEach(function (place) {
    let marker = place.marker;

   
  });

  self.closeInfoWindows = function (map) {
    self.visiblePlaces().forEach(function (place) {
      let marker = place.marker;
      marker.infowindow.close(map, marker);
    });
  };*/
};

//Function to load map and start up app

(function initMap() {
  // start Map

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

  // API Fetch and error handlers
  function callApi() {
    return new Promise((data) => {
      let url =
        "https://api.foursquare.com/v2/venues/explore?near=DC&oauth_token=RESIPMEAGVEW15LFDBO5Z24PCGEF4SBG4FFCLXRNJA12NJKK&v=20180507";

      // Organize data into a Place Constructor

      function Place(dataObj) {
        console.log(dataObj)
        this.id = dataObj.id;
        this.type = "FeatureCollection";
        this.properties = {
          title: dataObj.name,
          //description: dataObj.description
        };

        this.geometry = {
          type: "Point",
          coordinates: [dataObj.location.lng, dataObj.location.lat],
        };

        this.url = dataObj.url;
        //this.latLng = { lat: dataObj.location.lat, lng: dataObj.location.lng };
      }

      fetch(url)
        .then((response) => response.json())

        .then(function (myJson) {
          let geocode = myJson.meta.code;
          if (geocode === 400) {
            $(document).ready(function () {
              $("body").empty();
              $("body").append(
                "<p class='h1 mt-5 text-center'>" +
                  "Error " +
                  geocode +
                  "</br>   Oh No I failed you :( </p>" +
                  "<p class='h4 text-muted text-center'>I was not able to connect to the database <br> Please try again later</p>"
              );
            });
          } else {
            let center = myJson.response.geocode.center;
            let places = myJson.response.groups[0].items;
            let geojson = {
              type: "featureCollection",
              features: [],
            };
            places.forEach(function (place) {
              // Create the new object with the contructor and the push into the array
              geojson.features.push(new Place(place.venue));
              ///console.log(geojson)
              //new Place(place.venue);
            });

            return data([{ center: center }, geojson]);
          }
        })
        .catch(function (error) {
          console.log(error);
          $(document).ready(function () {
            $("body").empty();
            $("body").append(
              "<p class='h1 mt-5 text-center'> Oh No I failed you :( </p>" +
                "<p class='h4 text-muted text-center'>I am experiencing an error <br> don't worry the code monkey is working on it</p>"
            );
          });
        });
    });
  }

  // Async then start knockout

  async function koStart() {
    let loc = await callApi();
    //console.log(loc)
    
    // drops loading tag
    $(document).ready(function () {
      $("#loading").addClass("hidden");

      $("#select").removeClass("hidden");
    });

    ko.applyBindings(new viewModel(loc[1],map));
  }

  koStart();
})();

