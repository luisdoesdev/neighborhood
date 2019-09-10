let map;


let placeArray = [];



$( initMap=()=> {

    let initialPos = { zoom:15, lat:38.889931, long:-77.009003 }
    
    mapboxgl.accessToken = 'pk.eyJ1IjoibGV0b3JydWVsbGEiLCJhIjoiY2p1ZTltMHY0MDE4aTRkcDAxYjBwOXk4NCJ9.pTNlgBocBN-ilKR_fiVhNg';
    const map = new mapboxgl.Map({
        container: 'map',
        zoom: initialPos.zoom,
        center: [initialPos.long, initialPos.lat],
        style: 'mapbox://styles/mapbox/streets-v9'
    });


    

});


