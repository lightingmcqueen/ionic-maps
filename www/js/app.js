// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, GoogleMaps) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    GoogleMaps.init();
  })
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('map', {
    url: '/',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl'
  });

  $urlRouterProvider.otherwise("/");

})

.factory('Markers', function($http) {

  var markers = [];

  return {
    getMarkers: function(params){

      return $http.get("http://localhost",{params:params}).then(function(response){
          markers = response;
          return markers;
      });

    }
  }

})

.factory('GoogleMaps', function($cordovaGeolocation, $ionicLoading, $rootScope, $cordovaNetwork, Markers, ConnectivityMonitor){

  var markerCache = [];
  var apiKey = false;
  var map = null;

  function initMap(){

    var options = {timeout: 10000, enableHighAccuracy: true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){
      
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById("map"), mapOptions);

      //Wait until the map is loaded
      google.maps.event.addListenerOnce(map, 'idle', function(){
        loadMarkers();

        //Reload markers every time the map moves
        google.maps.event.addListener(map, 'dragend', function(){
          console.log("moved!");
          loadMarkers();
        });

        //Reload markers every time the zoom changes
        google.maps.event.addListener(map, 'zoom_changed', function(){
          console.log("zoomed!");
          loadMarkers();
        });

        enableMap();

      });

    }, function(error){
      console.log("Could not get location");
    });

  }

  function enableMap(){
    $ionicLoading.hide();
  }

  function disableMap(){
    $ionicLoading.show({
      template: 'You must be connected to the Internet to view this map.'
    });
  }

  function loadGoogleMaps(){

    $ionicLoading.show({
      template: 'Loading Google Maps'
    });

    //This function will be called once the SDK has been loaded
    window.mapInit = function(){
      initMap();
    };  

    //Create a script element to insert into the page
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "googleMaps";

    //Note the callback function in the URL is the one we created above
    if(apiKey){
      script.src = 'http://maps.google.com/maps/api/js?key=' + apiKey + '&sensor=true&callback=mapInit';
    }
    else {
      script.src = 'http://maps.google.com/maps/api/js?sensor=true&callback=mapInit';
    }

    document.body.appendChild(script);

  }

  function checkLoaded(){
    if(typeof google == "undefined" || typeof google.maps == "undefined"){
      loadGoogleMaps();
    } else {
      enableMap();
    }       
  }

  function loadMarkers(){

      var center = map.getCenter();
      var bounds = map.getBounds();
      var zoom = map.getZoom();


      //Convert objects returned by Google to be more readable
      var centerNorm = {
          lat: center.lat(),
          lng: center.lng()
      };

      var boundsNorm = {
          northeast: {
              lat: bounds.getNorthEast().lat(),
              lng: bounds.getNorthEast().lng()
          },
          southwest: {
              lat: bounds.getSouthWest().lat(),
              lng: bounds.getSouthWest().lng()
          }
      };

      var boundingRadius = getBoundingRadius(centerNorm, boundsNorm);

      var params = {
        "centre": centerNorm,
        "bounds": boundsNorm,
        "zoom": zoom,
        "boundingRadius": boundingRadius
      };
      console.log(params);
      // var markers = Markers.getMarkers(params).then(function(markers){
    markers ={  
   "success":true,
   "markers":[  
      {  
         "id":1,
         "name":"Meerut Cantt",
         "lat":28.993757,
         "lng":77.682243
      },
      {  
         "id":1,
         "name":"Vedayapalem, Andhra Pradesh, India Vedayapalem, Andhra Pradesh, India",
         "lat":14.411602,
         "lng":79.957672
      },
      {  
         "id":1,
         "name":"Ramnagar, Bardoli, Gujarat, India Ramnagar, Bardoli, Gujarat, India",
         "lat":21.127951,
         "lng":73.103119
      },
      {  
         "id":1,
         "name":"Maangelwada, Jawhar, Maharashtra, India Maangelwada, Jawhar, Maharashtra, India",
         "lat":29.927359,
         "lng":-97.56471
      },
      {  
         "id":1,
         "name":"Durga Agraharam, Vijayawada, Andhra Pradesh, India Durga Agraharam, Vijayawada, Andhra Pradesh",
         "         lat":16.515804,
         "lng":80.633980
      },
      {  
         "id":1,
         "name":"Thirunagar, Tamil Nadu, India Thirunagar, Tamil Nadu, India",
         "lat":21.192572,
         "lng":72.799736
      },
      {  
         "id":1,
         "name":"Suthiya Pura, Bharuch, Gujarat, India Suthiya Pura, Bharuch, Gujarat, India",
         "lat":21.699881,
         "lng":72.993675
      },
      {  
         "id":1,
         "name":"Humchand Nagar, Kannad, Maharashtra, India Humchand Nagar, Kannad, Maharashtra, India",
         "lat":20.261080,
         "lng":75.133263
      },
      {  
         "id":1,
         "name":"Changra Nagar, Saahrsa, Bihar, India Changra Nagar, Saahrsa, Bihar, India",
         "lat":25.883163,
         "lng":86.613335
      },
      {  
         "id":1,
         "name":"Kavi Nagar, Ghaziabad, Uttar Pradesh, India Kavi Nagar, Ghaziabad, Uttar Pradesh, India",
         "lat":28.663649,
         "lng":77.452271
      },
      {  
         "id":1,
         "name":"Royal City, Thanjavur, Tamil Nadu, India Royal City, Thanjavur, Tamil Nadu, India",
         "lat":10.794356,
         "lng":79.152161
      },
      {  
         "id":1,
         "name":"Mangal Nagar, Saharanpur, Uttar Pradesh, India Mangal Nagar, Saharanpur, Uttar Pradesh, India",
         "lat":29.967157,
         "lng":77.552391
      },
      {  
         "id":1,
         "name":"Arundelpet, Guntur, Andhra Pradesh, India Arundelpet, Guntur, Andhra Pradesh, India",
         "lat":16.305141,
         "lng":80.440300
      },
      {  
         "id":1,
         "name":"Shahapur, Belgaum, Karnataka, India Shahapur, Belgaum, Karnataka, India",
         "lat":15.842956,
         "lng":74.517593
      },
      {  
         "id":1,
         "name":"Kapileswar Colony, Belgaum, Karnataka, India Kapileswar Colony, Belgaum, Karnataka, India",
         "lat":15.848490,
         "lng":74.519058
      },
      {  
         "id":1,
         "name":"Eiswari Nagar, Thanjavur, Tamil Nadu, India Eiswari Nagar, Thanjavur, Tamil Nadu, India",
         "lat":10.764780,
         "lng":79.111809
      },
      {  
         "id":1,
         "name":"Juhi, Kanpur, Uttar Pradesh, India Juhi, Kanpur, Uttar Pradesh, India",
         "lat":26.441172,
         "lng":80.318527
      },
      {  
         "id":1,
         "name":"Nature Valley Homes Saroli, Surat, Gujarat, India Nature Valley Homes Saroli, Surat, Gujarat, India",
         "lat":21.194984,
         "lng":72.885963
      },
      {  
         "id":1,
         "name":"Enayat Colony, Gaya, Bihar, India Enayat Colony, Gaya, Bihar, India",
         "lat":24.793182,
         "lng":85.003525
      },
      {  
         "id":1,
         "name":"Edalakudi, Nagercoil, Tamil Nadu, India Edalakudi, Nagercoil, Tamil Nadu, India",
         "lat":8.145766,
         "lng":7.428604
      },
      {  
         "id":1,
         "name":"Sevvalpatti, Kovilpatti, Tamil Nadu, India Sevvalpatti, Kovilpatti, Tamil Nadu, India",
         "lat":9.179168,
         "lng":7.873825
      },
      {  
         "id":1,
         "name":"Tandon Bagicha, Damoh, Madhya Pradesh, India Tandon Bagicha, Damoh, Madhya Pradesh, India",
         "lat":23.831814,
         "lng":79.435226
      },
      {  
         "id":1,
         "name":"Rangirkhari, Silchar, Assam, India Rangirkhari, Silchar, Assam, India",
         "lat":24.811365,
         "lng":92.796753
      },
      {  
         "id":1,
         "name":"Bajepratappur, Burdwan, West Bengal, India Bajepratappur, Burdwan, West Bengal, India",
         "lat":23.259977,
         "lng":87.876320
      },
      {  
         "id":1,
         "name":"West Vinod Nagar, New Delhi, Delhi, India West Vinod Nagar, New Delhi, Delhi, India",
         "lat":28.702398,
         "lng":77.220932
      },
      {  
         "id":1,
         "name":"Nathayyapalem",
         "lat":17.711826,
         "lng":83.196381
      },
      {  
         "id":1,
         "name":"Hmar Veng, Kolasib, Mizoram, India Hmar Veng, Kolasib, Mizoram, India",
         "lat":24.236986,
         "lng":92.676147
      },
      {  
         "id":1,
         "name":"Bhaba Nagar, Brahmapur, Odisha, India Bhaba Nagar, Brahmapur, Odisha, India",
         "lat":19.312681,
         "lng":84.804306
      },
      {  
         "id":1,
         "name":"Krishna Colony, Hindaun City, Rajasthan, India Krishna Colony, Hindaun City, Rajasthan, India",
         "lat":26.737024,
         "lng":77.026207
      },
      {  
         "id":1,
         "name":"Kareemabad, Warangal, Telangana, India Kareemabad, Warangal, Telangana, India",
         "lat":17.960342,
         "lng":79.593246
      },
      {  
         "id":1,
         "name":"Bekarbandh, Dhanbad, Jharkhand, India Bekarbandh, Dhanbad, Jharkhand, India",
         "lat":23.801523,
         "lng":86.425964
      },
      {  
         "id":1,
         "name":"Palakkad, Pollachi, Tamil Nadu, India Palakkad, Pollachi, Tamil Nadu, India",
         "lat":10.660207,
         "lng":76.996727
      },
      {  
         "id":1,
         "name":"Morya Nagar, Nala Sopara, Maharashtra, India Morya Nagar, Nala Sopara, Maharashtra, India",
         "lat":16.694265,
         "lng":78.910080
      },
      {  
         "id":1,
         "name":"Jamb, Hinganghat, Maharashtra, India Jamb, Hinganghat, Maharashtra, India",
         "lat":20.538774,
         "lng":78.831268
      },
      {  
         "id":1,
         "name":"Esplanade, Chennai, Tamil Nadu, India Esplanade, Chennai, Tamil Nadu, India",
         "lat":13.084411,
         "lng":80.281616
      },
      {  
         "id":1,
         "name":"Namarer Bagan, Chandannagar, West Bengal, India Namarer Bagan, Chandannagar, West Bengal, India",
         "lat":22.846764,
         "lng":88.367058
      },
      {  
         "id":1,
         "name":"Kali Bazar, Gangasagar, West Bengal, India Kali Bazar, Gangasagar, West Bengal, India",
         "lat":21.647655,
         "lng":88.076469
      },
      {  
         "id":1,
         "name":"Kaliket Nagar, Danapur, Bihar, India Kaliket Nagar, Danapur, Bihar, India",
         "lat":25.611723,
         "lng":85.046730
      },
      {  
         "id":1,
         "name":"Shah-Hamdan Colony, Srinagar, Kashmir, India Shah-Hamdan Colony, Srinagar, Kashmir, India",
         "lat":17.494944,
         "lng":78.399734
      },
      {  
         "id":1,
         "name":"Kanaknagar, Rajkot, Gujarat, India Kanaknagar, Rajkot, Gujarat, India",
         "lat":22.297983,
         "lng":70.824631
      },
      {  
         "id":1,
         "name":"H block, Sector 63, Noida, Uttar Pradesh, India H block, Sector 63, Noida, Uttar Pradesh, India",
         "lat":28.628454,
         "lng":77.376945
      },
      {  
         "id":1,
         "name":"Santoshpur, Kolkata, West Bengal, India Santoshpur, Kolkata, West Bengal, India",
         "lat":22.487022,
         "lng":88.387131
      },
      {  
         "id":1,
         "name":"Birla Nagar, Gwalior, Madhya Pradesh, India Birla Nagar, Gwalior, Madhya Pradesh, India",
         "lat":26.233717,
         "lng":78.187790
      },
      {  
         "id":1,
         "name":"Kendua Sonatore, West Bengal, India Kendua Sonatore, West Bengal, India",
         "lat":23.899002,
         "lng":87.538818
      }
   ]
};
        console.log("Markers: ", markers);
        var records = markers.markers;
        console.log(records);
        for (var i = 0; i < records.length; i++) {

          var record = records[i];

          // Check if the marker has already been added
          if (!markerExists(record.lat, record.lng)) {
              console.log(record.lat);
              var markerPos = {lat: record.lat, lng: record.lng};
              var title = record.name; 
              // add the marker
              var marker = new google.maps.Marker({
                    position: markerPos,
                    map: map,
                    title: title
              });


 
              // Add the marker to the markerCache so we know not to add it again later
              var markerData = {
                lat: record.lat,
                lng: record.lng,
                marker: marker
              };

              markerCache.push(markerData);

              var infoWindowContent = "<h4>" + record.name + "</h4>";          

              addInfoWindow(marker, infoWindowContent, record);
          }          

        }

      // });    
  }

  function markerExists(lat, lng){
      var exists = false;
      var cache = markerCache;
      for(var i = 0; i < cache.length; i++){
        if(cache[i].lat === lat && cache[i].lng === lng){
          exists = true;
        }
      }
      
      return exists;
  }

  function getBoundingRadius(center, bounds){
    return getDistanceBetweenPoints(center, bounds.northeast, 'miles');    
  }

  function getDistanceBetweenPoints(pos1, pos2, units){

    var earthRadius = {
        miles: 3958.8,
        km: 6371
    };
    
    var R = earthRadius[units || 'miles'];
    var lat1 = pos1.lat;
    var lon1 = pos1.lng;
    var lat2 = pos2.lat;
    var lon2 = pos2.lng;
    
    var dLat = toRad((lat2 - lat1));
    var dLon = toRad((lon2 - lon1));
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    
    return d;

  }

  function toRad(x){
      return x * Math.PI / 180;
  }

  function addInfoWindow(marker, message, record) {

      var infoWindow = new google.maps.InfoWindow({
          content: message
      });

      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
      });
      
  }

  function addConnectivityListeners(){

    if(ionic.Platform.isWebView()){

      // Check if the map is already loaded when the user comes online, if not, load it
      $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
        checkLoaded();
      });

      // Disable the map when the user goes offline
      $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
        disableMap();
      });
     
    }
    else {

      //Same as above but for when we are not running on a device
      window.addEventListener("online", function(e) {
        checkLoaded();
      }, false);    

      window.addEventListener("offline", function(e) {
        disableMap();
      }, false);  
    }

  }

  return {
    init: function(key){

      if(typeof key != "undefined"){
        apiKey = key;
      }

      if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.warn("Google Maps SDK needs to be loaded");

        disableMap();

        if(ConnectivityMonitor.isOnline()){
          loadGoogleMaps();
        }
      }
      else {
        if(ConnectivityMonitor.isOnline()){
          initMap();
          enableMap();
        } else {
          disableMap();
        }
      }

      addConnectivityListeners();

    }
  }

})

.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork){

  return {
    isOnline: function(){

      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();    
      } else {
        return navigator.onLine;
      }

    },
    ifOffline: function(){

      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();    
      } else {
        return !navigator.onLine;
      }

    }
  }
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {

});