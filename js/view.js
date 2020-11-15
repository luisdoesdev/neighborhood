const View = function () {

    function initMap(){
      
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
  
        return map
    }

    function addMarker(locations, map){
        console.log('locs',locations)
        locations.features.forEach(loc => {
          new mapboxgl.Marker()
                .setLngLat(loc.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`<h3>${loc.properties.title}</h3>`))
                .addTo(map)
        });
     
    }
    
    function hideMarker(){
        console.log('hello')
    }

    function KnockoutView() {
      
      let self = this
      self.userInput =ko.observable("")
      self.results = ko.computed(()=>{
        console.log(sel.userInput())
      })

        
    
  }
    
    return{
        initMap:initMap,
        addMarker:addMarker,
        hideMarker:hideMarker,
        KnockoutView:KnockoutView
    }


}