$(document).ready(function (){
    getData();
    $('#product_content').hide();
});
    


function getData() {
	$.ajax({
		url: "acme/js/acme.json",
		dataType: "json",
		success: function (data) {
            console.log(data);

//fill the empty list items in the html with the navigation link names in the JSON Navigation object
            
			$("#home_1").html(data.Navigation.link1);
			$("#Anvils_2").html(data.Navigation.link2);
			$("#Explosives_3").html(data.Navigation.link3);
			$("#Decoys_4").html(data.Navigation.link4);
			$("#Traps_5").html(data.Navigation.link5);
		}
	});
}

// Intercept the menu link clicks
$("#nav_bar").on("click", "a", function (evt) {
	// Intercept the menu link clicks
	evt.preventDefault();
	//get the link that was clicked on
	var link = $(this).text();
	console.log(link);

	//hide home page and show the product page
	if (link != 'Home') {
		$('#home_section').hide();
		$('#product_content').show();

	$.ajax({
		url: "acme/js/acme.json",
		dataType: "json",
		success: function (data) {
			console.log(data);
			//find the path to the +product .png
			var picPath=(data[link].path);
			console.log(picPath);
			//insert the product content
			$('#product_name').text(data[link].name);
			$("#product_pic").html("<img src='" + picPath + "'>");
			$('#product_info').text(data[link].description);
			$('#product_maker').text(' ' + data[link].manufacturer);
            $('#product_price').text('Price: $' + data[link].price);
			$('#product_reviews').text(data[link].reviews + '/5 stars');
		}
	});
	}
	else{
		$('#home_section').show();
		$('#product_content').hide();
		$('#content_title').text("Welcome to Acme!");

	}
});
            
            
            
            
            
/*$("#page-nav").on("click", "a", function (evt) {
    evt.preventDefault();    
    var jsonCity = $(this).text(); 
    console.log(jsonCity); 
    
    

    var name = jsonData[pageName].name;
    console.log(name);

    var path = jsonData[pageName].path;
    console.log(path);

    var description = jsonData[pageName].description;
    console.log(description);

    var manufacturer = jsonData[pageName].manufacturer;
    console.log(manufacturer);

    var price = jsonData[pageName].price;
    console.log(price);

    var reviews = jsonData[pageName].reviews;
    console.log(reviews);*/
