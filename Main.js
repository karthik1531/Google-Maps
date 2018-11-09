
var map;
var myLatLng = { lat: 12.9, lng: 77.5 };
var directionsService;
var directionsDisplay;

// calcRoute function
function calcRoute() {

    console.log("incalc");

    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, 
        unitSystem: google.maps.UnitSystem.METRIC
    }

    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //DISLAYING DISTANCE AND TIME
            $("#output").html("<div>From: " + document.getElementById("from").value + 
                ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance: " + 
                result.routes[0].legs[0].distance.text + ".<br />Duration: " + 
                result.routes[0].legs[0].duration.text + ".</div>");

            //display route
            directionsDisplay.setDirections(result);
        } else {
            
            directionsDisplay.setDirections({ routes: [] });
            //SET MAP TO MYLATLAG
            map.setCenter(myLatLng);

            //error message
            $("#output").html("<div>Could not retrieve driving distance.</div>");
        }
    });

}


function intialize(){

var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
 map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);


directionsService = new google.maps.DirectionsService();

directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);
console.log("aftermap");
}

$(document).ready(function(){

    intialize();
    $(".btn-submit").on('click', function(){
        console.log("hi");
        calcRoute();
    });
});
