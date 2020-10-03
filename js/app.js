(function initMap() {
  let intialVal = {
    name: 'Washington Monument',
    lat: 38.889455,
    lng: -77.035218
  };

  mapboxgl.accessToken ='pk.eyJ1IjoibGV0b3JydWVsbGEiLCJhIjoiY2swZXI3ZXQ1MGtqNzNicG1yYTZzNHVodSJ9.TxyMy_xrdGKfY-sh47Pu4g';
  const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [intialVal.lng, intialVal.lat], // starting position [lng, lat]
    zoom: 12 // starting zoom
  });


  /* Map Controller */
  map.on('load', function() {
     // Adds the Map's Initial Markers
    let markers =  [
        {
        name: 'Washington Monument',
        lat: 38.889455,
        lng: -77.035218
        },
        {
            name: 'Capitol Building',
            lat: 38.8899,
            lng: -77.0091
        },
        {
            name: 'Lincoln Memorial',
            lat: 38.889296,
            lng: -77.050198
          }
    ]

    for(let m of markers){
      //console.log(m)
      let el = document.createElement('div');
      el.className = 'marker';
      new mapboxgl.Marker(el)
        .setLngLat([m.lng, m.lat])
        .addTo(map);
    }


    
    
  

    
  });

  const viewModel = function(locations,map){
    console.log(locations, map)
  }


  function koStart(){
    console.log("helllo");
    ko.applyBindings(new viewModel("loc[1]", map));
  }

  koStart()

  })();

 

