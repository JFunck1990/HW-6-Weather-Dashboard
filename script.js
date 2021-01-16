$(document).ready(function () {
  var searchBtn = $("#searchBtn");

  var apiKey = "f0a0222c2ff140f616209ec3a5abfc21";

  // search button function
  searchBtn.on("click", function () {
    var citInput = $("#cityInput").val();
    var data = JSON.parse(localStorage.getItem("cities")) || [];
    data.push(citInput);
    localStorage.setItem("cities", JSON.stringify(data));
    weatherData(citInput);
    $("#cityInput").val("");

    function weatherData(cityName) {
      displayCity();

      // The URL for current weather
      var currentUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=" +
        apiKey;
      // five day forecast

      console.log(currentUrl);

      // current weather
      $.ajax({
        url: currentUrl,
        method: "GET",
      }).then(function (response) {
        var timeUTC = new Date(response.dt * 1000);

        let tempF = (response.main.temp - 273.15) * 1.8 + 32;
        // city name and time
        console.log(
          "the name is: " + response.name + timeUTC.toLocaleDateString("en-US")
        );
        $("#cityName").append(
          response.name + ": " + "(" + timeUTC.toLocaleDateString("en-US") + ")"
        );
        // current Temp
        $("#temperature").append("Temperature: " + tempF.toFixed(0) + "F");
        //  current humidity
        $("#humidity").append("Humidity: " + response.main.humidity + "%");
        // wind speed
        $("#windSpeed").append("Wind Speed: " + response.wind.speed + " MPH");

        // lat & Lon
        var lat = response.coord.lat;
        var lon = response.coord.lon;

        // uvIndex

        var uvQueryURL =
          "http://api.openweathermap.org/data/2.5/uvi?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          apiKey;

        $.ajax({
          url: uvQueryURL,
          method: "Get",
        }).then(function (uvresponse) {
          console.log("Uv response: " + uvresponse);
          // var lat = response.coord.lat;
          //var lon = response.coord.lon;
          console.log("lat: " + lat);
          console.log("lon " + lon);
          console.log("UV Response: " + uvresponse.value);
          $("#uvIndex").append("UV Index: " + uvresponse.value);
        });
      });
      var fiveDayUrl =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName +
        "&appid=" +
        apiKey;
      console.log("This is the 5 day URl: " + fiveDayUrl);

      // five day weather
      $.ajax({
        url: fiveDayUrl,
        method: "GET",
      }).then(function (response) {
        console.log(response.list[0].main.temp);
        console.log("This is the 5 day Response: " + response);
       // var timeUTC =response.list[0].dt_txt;
       
        var fiveDayCl = response.list;
        var wf = $("#weatherForcast");
       
        for (var i = 0; i < 5; i++) {
            var container = $("<div>");
          console.log(fiveDayCl[i]);
          container.append("<p class='style'>" + fiveDayCl[i].dt_txt + "</p>");
          container.append("<p>" + fiveDayCl[i].main.temp + "</p>");
          container.append("<p>" + fiveDayCl[i].main.humidity + "% </p>")
          wf.append(container);
        }
      });
    }

    function displayCity() {
      $("#cityList").empty();
      var data = JSON.parse(localStorage.getItem("cities")) || [];

      //pulling and listing city name
      for (var i = 0; i < data.length; i++) {
        //var cityN = localStorage.getItem(i);

        var cityName = $("#cityList").addClass("cityL");

        cityName.append(
          "<button data-city=" +
            data[i] +
            " class='cityBtn'>" +
            data[i] +
            "</button>" +
            "<br>"
        );
      }
    }

    $(document).on("click", ".cityBtn", function (e) {
      e.preventDefault();
      console.log("Inside cityBtn");
      var city = $(this).attr("data-city");
      console.log("City Name: " + city);
      weatherData(city);
    });
    $("#clear").on("click", function(event){
        $("#cityList").empty();


    });
    displayCity();
  });
});
