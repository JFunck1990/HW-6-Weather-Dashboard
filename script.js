
var searchBtn = $("#searchBtn");

var apiKey = "f0a0222c2ff140f616209ec3a5abfc21";





// search button function
searchBtn.on("click", function(){

    var citInput = $("#cityInput").val();

   // The URL for current weather
var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citInput + "&appid=" + apiKey; 
// five day forecast
var fiveDayUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + citInput + "&appid=" + apiKey; 

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
//pulling and listing city name
for(var i = 0; i < localStorage.length; i++){
    var cityN = localStorage.getItem(i);

    var cityName = $("#cityList").addClass("cityL");

    cityName.append("<li>" + cityName + "</li>");
}

});