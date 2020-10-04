const view = function () {
    let self = this

    function addMarker(locations, map){
        console.log(locations);
        console.log(map)

        self.allLocations = [];
        locations.forEach((function(place){
            self.allLocations.push(place)
        }))
        

    
        map.on("load", function () {
           
            self.allLocations.forEach(function(place) {
                let el = document.createElement("div");
                el.className = "marker";
                let lat  = place.latLng.lat
                let lng  = place.latLng.lng
                console.log(lat,lng)
                new mapboxgl.Marker(el).setLngLat([lng,lat]).addTo(map);

            })    

        })
    }
    
    return{
        addMarker:addMarker
    }


}