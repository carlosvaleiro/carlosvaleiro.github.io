// Current Location Scripts
$(function () {

    var status = $('#status');

    (function getGeoLocation() {
        status.text('Getting Location...');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                // Call the getData function, send the lat and long
                getData(lat, long);

            });
        } else {
            status.text("Your browser doesn't support Geolocation or it is not enabled!");
        }

    })();

    // Get the data from the wunderground API
    function getData(lat, long) {
        $.ajax({

            url: "http://api.wunderground.com/api/2a32c49c490f6b17/geolookup/conditions/q/" + lat + "," + long + ".json",
            dataType: "jsonp",
            success: function (parsed_json) {
                var location = parsed_json['location']['city'];
                var stateName = parsed_json['current_observation']['display_location']['state_name'];
                var temp_f = parsed_json['current_observation']['temp_f'];
                var sum = parsed_json['current_observation']['weather'];
                var feelslike = parsed_json['current_observation']['feelslike_f'];
                var humidity = parsed_json['current_observation']['relative_humidity'];
                var wind = parsed_json['current_observation']['wind_mph']
                var local_time = parsed_json['current_observation']['local_time_rfc822'];
                $("#currentTemp").html( Math.round(temp_f) + "&#8457");
                $("#cityDisplay").text( location + ", " + stateName);
                $("#summary").text(sum);
                $("#feelslk").text("Feels like: " + feelslike);
                $("#humidity_2").text("Humidity: " + humidity);
                $("#wind").text("Wind: " + wind + " " + "mph");
                $("#local_time").text(local_time);
                
                
                
                /*$("#page-header").load("/jsonweather-html/modules/header.html");
                $("#page-nav").load("/jsonweather-html/modules/navigation.html");
                $("#footer-content").load("/jsonweather-html/modules/footer.html");*/
                
                
                $("#cover").fadeOut(250);
                //alert("Current temperature in " + location + " is: " + temp_f);
                console.log(parsed_json);
                

    }
});

}

// A function for changing a string to TitleCase
function toTitleCase(str) {
    return str.replace(/\w+/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
});
