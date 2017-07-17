$(document).ready(function(){
    getData();
    $('#product_content').hide();
    
});

function getData(){
    $.ajax({
        url:"../js/acme.json",
        dataType: "Json",
        success: function (data){
            console.log(data);
            
        $("#Home").html(data.Navegation.link1);
        $("#Anvils").html(data.Navegation.link2);
        $("#Explosives").html(data.Navegation.link3);
        $("#Decoys").html(data.Navegation.link4);
        $("#Traps").html(data.Navegation.link5);
            
        }
    });
}

$("#nav_bar").on("click", "a", function (evt){
    evt.preventDefault();
    var link = $(this).text();
    console.log(link);
    
    if (link != 'home'){
        $('#home_section').hide();
        $('#product_content').show();
        
    $.ajax({
        url: "../js/acme.json",
        dataType: "json",
        success: function (data){
            console.log(data);
            
            var picPath =(data[link].path);
            console.log(picPath);
            $('title').replaceWith("<title>" + link + ' | Acme' + " '</title>");
            $('#content_title').text(data[link].name);
            $('#product_pic').html("<img src='" + picPath + "'alt=' + link + '>");
            $('#product_info').text(data[link].description);
            $('#product_maker').text(data[link].manufacturer);
            $('#product_price').text('Price: $' + data[link].price);
            $('#product_reviews').text(data[link].reviews + '/5 stars');
        }
    });
    }
    else {
        $('#title').replaceWith("<title>" + 'Home | Acme' + "'</title>");
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
