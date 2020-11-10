const view = function () {
    //let self = this;

    function addMarker(locations, map){
        console.log('locs',locations)
        locations.features.forEach(loc => {
          new mapboxgl.Marker()
                .setLngLat(loc.geometry.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`<h3>${loc.properties.title}</h3>`))
                .addTo(map)
        });
        //locations.features.forEach((function(marker){}
                        // create a HTML element for each feature
            //var el = document.createElement('div');
            //el.className = 'marker';

            // make a marker for each feature and add to the map
            /*
            new mapboxgl.Marker()
                .setLngLat(marker.geometry.coordinates)
                .addTo(map);
                }))
        
        

    /*
        map.on("load", function () {
           map.addSource('locs',{
               'type':'geojson',
               data:self.allLocations
             
           })
         

        })
        map.on('click', self.allLocations, function (e){console.log(e)})*/
    }
    
    
    return{
        addMarker:addMarker
    }


}