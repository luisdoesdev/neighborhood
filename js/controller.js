const controller = function(){

    function getPlaces(){
        return model.places
    }
    
    return{
        getPlaces:getPlaces
    }

}()