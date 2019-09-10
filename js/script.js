'use strict';

let map;
//Model
let placesArray = [];

//View Model
const viewModel = function(locations, map) {
  let self = this;

  self.allLocations = [];
  locations.forEach(function(place) {
    self.allLocations.push(place);
  });

  //Create the markers and add the content to the infowidow
  self.allLocations.forEach(function(place) {
    if (place.url === undefined) {
      place.url = '<b>Website is not avilable :(</b>';
    } else {
      place.url = '<b><a href="' + place.url + '">' + place.name + '</a></b>';
    }

    const infowindow = new google.maps.InfoWindow({
      content:
        '<p class="h6">' +
        place.name +
        '</p>' +
        '<br>' +
        place.url +
        '<br><a href=https://foursquare.com/v/' +
        place.id +
        '>source</a>'
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
  self.visiblePlaces = ko.observableArray();
  self.userInput = ko.observable('');

  //add Search Function
  // The userinput value string characters must match in order to be pushed into the
  //visible places array
  self.filterMarkers = ko.computed(function() {
    let userInput = self.userInput().toLowerCase();

    self.visiblePlaces.removeAll();

    self.allLocations.forEach(function(place) {
      place.marker.setMap(null);

      if (place.name.toLowerCase().indexOf(userInput) !== -1) {
        self.visiblePlaces.push(place);
      }
    });

    // add the markers into the map
    let bound = new google.maps.LatLngBounds();

    //handle bounds when array empty
    if (self.visiblePlaces().length === 0) {
      bound.extend({ lat: 38.9072, lng: -77.0369 });
    }
    self.visiblePlaces().forEach(function(place) {
      place.marker.setMap(map);
      bound.extend(place.marker.getPosition());
    });
    // Zoom and fit to the markers avilable position
    map.fitBounds(bound);
  }, this);

  // Handle the user selection
  self.selection = ko.observable();
  self.selectionCall = function(event) {
    // click the marker based on this selection
    if (event === undefined) {
      console.log('NOt Found');
    }

    let marker = self.selection().marker;
    console.log();
    google.maps.event.trigger(marker, 'click');
  };

  self.selection(self.visiblePlaces([1]));

  self.visiblePlacesLength = ko.computed(function() {
    let userInput;
    userInput = self.userInput();
    let visiblePlaces = self.visiblePlaces();

    if (userInput === '') {
      return 'Select a Spot';
    }

    if (visiblePlaces.length === 0) {
      return 'Sorry no results for ' + userInput + ' :(';
    } else if (userInput !== -1) {
      return 'results for ' + userInput + ' :  ' + visiblePlaces.length;
    }
  });

  self.visiblePlaces().forEach(function(place) {
    let marker = place.marker;

    //add  markers info Window
    google.maps.event.addListener(marker, 'click', function() {
      // close all infoWindows
      self.closeInfoWindows(map);

      // Center marker
      map.setCenter(marker.getPosition());
      map.setZoom(12);

      // Bounce
      this.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 750);

      //open infowindow
      this.infowindow.open(map, this);
    });
  });

  self.closeInfoWindows = function(map) {
    self.visiblePlaces().forEach(function(place) {
      let marker = place.marker;
      marker.infowindow.close(map, marker);
    });
  };
};

//Function to load map and start up app

function initMap() {
  // start Map
 /* 
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 38.9072, lng: -77.0369 },
    zoom: 13
  });*/

  mapboxgl.accessToken = 'pk.eyJ1IjoibGV0b3JydWVsbGEiLCJhIjoiY2p1ZTltMHY0MDE4aTRkcDAxYjBwOXk4NCJ9.pTNlgBocBN-ilKR_fiVhNg';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9'
  });

  // API Fetch and error handlers
  function callApi() {
    return new Promise(data => {
      let url =
        'https://api.foursquare.com/v2/venues/explore?near=DC&oauth_token=RESIPMEAGVEW15LFDBO5Z24PCGEF4SBG4FFCLXRNJA12NJKK&v=20180507';

      // Organize data into a Place Constructor

      function Place(dataObj) {
        this.id = dataObj.id;
        this.name = dataObj.name;
        // Open change object changed to a filtering option
        //this.open = dataObj.hours.isOpen;
        this.url = dataObj.url;
        this.latLng = { lat: dataObj.location.lat, lng: dataObj.location.lng };
      }

      fetch(url)
        .then(response => response.json())

        .then(function(myJson) {
          let geocode = myJson.meta.code;

          if (geocode === 400) {
            $(document).ready(function() {
              $('body').empty();
              $('body').append(
                "<p class='h1 mt-5 text-center'>" +
                  'Error ' +
                  geocode +
                  '</br>   Oh No I failed you :( </p>' +
                  "<p class='h4 text-muted text-center'>I was not able to connect to the database <br> Please try again later</p>"
              );
            });
          } else {
            let center = myJson.response.geocode.center;
            let places = myJson.response.groups[0].items;

            places.forEach(function(place) {
              // Create the new object with the contructor and the push into the array
              placesArray.push(new Place(place.venue));
            });

            return data([{ center: center }, placesArray]);
          }
        })
        .catch(function(error) {
          console.log(error);
          $(document).ready(function() {
            $('body').empty();
            $('body').append(
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

    // drops loading tag
    $(document).ready(function() {
      $('#loading').addClass('hidden');

      $('#select').removeClass('hidden');
    });

    ko.applyBindings(new viewModel(loc[1], map));
  }

  koStart();
}

function googleError() {
  alert('google error');
}
