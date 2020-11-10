const view = function () {
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
    
    return{
        addMarker:addMarker,
        hideMarker:hideMarker
    }


}