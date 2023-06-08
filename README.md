# My Neigborhood
## Cool places around my neighborhood
The intention of the app is not to be pretty but rather functional, it is part f my udacity fullstack nano degree program

### Async
    Before the application is initialize the foursquare api is called, if by any reason the api or the url returns an error the DOM will be clean and let the user know there is an error

#### Methods
    Main methods handle the display of the markers and the filtering of them, they self explain themselves on the code


### APIs
 Google Maps and foursquare(Paste API_URL on the script.js)    

### Starting the App
    This app is  using  external libraries/framerworks such as boostrap, knockout, foursquare and google maps.

    Just run the `index.html` and you are good to go
         
# Refactoring MVC

As of October 2020 the App has been refatored into an easier to understand Architecture.
It still uses Knockout JS as it's main framework, rather than using one main file I split 
the MVC into individual ones. This will make it easier to add more features. To see the old 
MVC just head to the "script.js" file.

Map has been changed from Google to Mapbox, easy decision, google is getting expensive.



### TODO

Fix markers overlap
Fix Markers position
