const controller = function(){

    function getPlaces(){
        console.log("hey", model.places)
        return model.places
    }
    
    return{
        getPlaces:getPlaces
    }

}()