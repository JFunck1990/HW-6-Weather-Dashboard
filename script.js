
var searchBtn = $("#searchBtn");

var apiKey = "f0a0222c2ff140f616209ec3a5abfc21";

var citInput = $("#cityInput").val();
// The URL
var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + citInput + "&appid=" + apiKey; 

var fiveDayUrl ="https://api.openweathermap.org/data/2.5/forecast?q=" + citInput + "&appid=" + apiKey; 

console.log (currentUrl);