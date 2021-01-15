$(document).ready(function(){
var searchBtn = $("#searchBtn");

var apiKey = "f0a0222c2ff140f616209ec3a5abfc21";





// search button function
searchBtn.on("click", function(){

    var citInput = $("#cityInput").val();
    var data = JSON.parse(localStorage.getItem("cities")) || [];
    data.push(citInput);
    localStorage.setItem("cities", JSON.stringify(data));
    weatherData(citInput);
    $("#cityInput").val("");

});

function weatherData(cityName){
    displayCity();
    
   // The URL for current weather
var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey; 
// five day forecast
var fiveDayUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey; 

console.log (currentUrl);

// current weather
$.ajax({
    url: currentUrl,
    method: "GET"
}).then(function(response){


});

// five day weather 
$.ajax({
    url: fiveDayUrl,
    method: "GET"
}).then(function(response){



});
}

function displayCity(){
    $("#cityList").empty();
    var data = JSON.parse(localStorage.getItem("cities")) || [];

    //pulling and listing city name
for(var i = 0; i < data.length; i++){
    //var cityN = localStorage.getItem(i);

    var cityName = $("#cityList").addClass("cityL");

    cityName.append("<button data-city="+data[i]+" class='cityBtn'>" + data[i] + "</button>");
}
}

$(document).on("click", ".cityBtn", function(e){
    e.preventDefault();
    console.log("Inside cityBtn");
    var city = $(this).attr("data-city");
    console.log("City Name: "+city);
    weatherData(city);
})

displayCity();

});
