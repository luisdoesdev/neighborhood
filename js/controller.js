

const controller = function(){
       
        function getPlaces(){
           return model.places
        }

        function addPlaces(obj){
            model.places.push(obj)
        }

        

        return{
            getPlaces:getPlaces,
            addPlaces:addPlaces
        }
}();