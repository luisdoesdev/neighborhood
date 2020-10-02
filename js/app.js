(function initMap() {
  let intialVal = {
    name: 'Washington Monument',
    lat: 38.8895,
    lng: -77.0353
  };

  mapboxgl.accessToken ='pk.eyJ1IjoibGV0b3JydWVsbGEiLCJhIjoiY2swZXI3ZXQ1MGtqNzNicG1yYTZzNHVodSJ9.TxyMy_xrdGKfY-sh47Pu4g';
  const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [intialVal.lng, intialVal.lat], // starting position [lng, lat]
    zoom: 15 // starting zoom
  });


  /* Map Controller */
  map.on('load', function() {
     // Adds the Map's Initial Markers
    let markers =  [
        {
        name: 'Washington Monument',
        lat: 38.8895,
        lng: -77.0353
        },
        {
            name: 'Washington Monument',
            lat: 38.8897,
            lng: -77.0353
        },
        {
            name: 'Washington Monument',
            lat: 38.8880,
            lng: -77.0363
          }
    ]

    for(let m of markers){
      //console.log(m)
      new mapboxgl.Marker()
        .setLngLat([m.lng, m.lat])
        .addTo(map);
    }


    
    
  

    
  });

  function initApp(){console.log("hl")}

  initApp()

  })();

 

