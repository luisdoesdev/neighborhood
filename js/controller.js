const controller = function(){

    function callApi(){

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
                    let placesArray = []
                    places.forEach(function(place) {
                      // Create the new object with the contructor and the push into the array
                      placesArray.push(new Place(place.venue));
                      //console.log(place)
                      //new Place(place.venue);
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

    async function getPlaces(){
        let loc = await callApi()
        return loc
        //console.log(loc)
        //return model.places
    }
    
    

    return{
        getPlaces:getPlaces
    }

}();