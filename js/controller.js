const controller = function(){
    
    
    function callApi(){

            return new Promise(data => {
              let url =
                'https://api.foursquare.com/v2/venues/explore?near=DC&oauth_token=RESIPMEAGVEW15LFDBO5Z24PCGEF4SBG4FFCLXRNJA12NJKK&v=20180507';
        
              // Organize data into a Place Constructor
        
              function Place(dataObj) {
                this.id = dataObj.id;
                this.type='FeatureCollection'
                this.properties = {
                  title:dataObj.name,
                  description:'hello world'
                }
              
                this.geometry={
                  type:'Point',
                  coordinates:[dataObj.location.lng, dataObj.location.lat]
                }
               
                
                this.url = dataObj.url;
                //this.latLng = { lat: dataObj.location.lat, lng: dataObj.location.lng };
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
                    let geojson = {
                      type:"featureCollection",
                      features:[]
                    }
                    places.forEach(function(place) {
                      // Create the new object with the contructor and the push into the array
                      geojson.features.push(new Place(place.venue));
                      ///console.log(geojson)
                      //new Place(place.venue);
                    });
        
                    return data([{ center: center }, geojson]);
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
    
      if (localStorage.getItem("allLocations") === null) {
        let loc = await callApi()
        localStorage.setItem('allLocations',JSON.stringify(loc));
        let allLocations = localStorage.getItem('allLocations')
        return allLocations
        ///console.log(allLocations)
      }
      else{
        console.log('')
      }
      /*
        let loc = await callApi()
        return loc
        */
    }

   

  
    
    

    return{
      getPlaces:getPlaces
    }

}();