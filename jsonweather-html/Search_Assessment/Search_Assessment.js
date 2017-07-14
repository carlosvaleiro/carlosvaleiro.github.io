var returned;

$('#query').keyup(function () {
    var value = $('#query').val();
    var rExp = new RegExp(value, "i");
    $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
        console.log(data); // test for JSON received
        // Begin building output
        var output = '<ol>';
        $.each(data.RESULTS, function (key, val) {
            if (val.name.search(rExp) != -1) {
                output += '<li>';
                output += '<a href="//www.wunderground.com"' + ' onclick="getData(' + val.lat + ',' + val.lon + ')"' + ' title="See results for ' + val.name + '">' + val.name + '</a>';
                output += '</li>';
            }
        }); // end each
        output += '</ol>';
        $("#searchResults").html(output); // send results to the page
    }); // end getJSON
}); // end onkeyup


$("#searchResults").on("click", "a", function (evt) {
    evt.preventDefault();
    $()
    // With the text value get the needed value from the weather.json file
    var jsonCity = $(this).text(); // Franklin, etc...
    console.log(jsonCity);
    index = $(this).index("a");

    getData(index.lat, index.lon);

    $('#searchResults').hide();
    document.getElementById('searchResults').style.display = 'none';
});

function getData(lat, lon){
    $.ajax({
        url:"https://api.wunderground.com/api/2a32c49c490f6b17/geolookup/conditions/q/" + lat + ',' + lon + ".json",
        dataType : "jsonp",
        success : function(parsed_json) {
            var location = parsed_json['location'];
            var temp_f = parsed_json.temp_f;
            $('#currentTemp').html(Math.round(temp_f) +  " &#8457" );

            $("title").text(parsed_json.current_observation.display_location.full);
            $("#cityDisplay").text(parsed_json.current_observation.display_location.full);
            $("#summary").text(parsed_json.current_observation.weather);
            
           

            $("#cover").fadeOut(250);

            console.log(parsed_json);
        }

    });

}
