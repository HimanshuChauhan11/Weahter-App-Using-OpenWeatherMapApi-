const http = require("http");
const fs = require("fs");
var requests = require("requests");
const indexHome = fs.readFileSync("../public/index.html", "utf-8");

const replaceVal = (dummyVal, realVal) => {
  // convert Temprature kelvin to celcius
  let todayTemp = Math.floor(realVal.main.temp - 273.15);
  let todayTempMin = Math.floor(realVal.main.temp_min - 273.15);
  let todayTempMax = Math.floor(realVal.main.temp_max - 273.15);
  let temperature = dummyVal.replace("{%temp%}", todayTemp);
  temperature = temperature.replace("{%tempMin%}", todayTempMin);
  temperature = temperature.replace("{%tempMax%}", todayTempMax);
  temperature = temperature.replace("{%city%}", realVal.name);
  temperature = temperature.replace("{%country%}", realVal.sys.country);
  temperature = temperature.replace("{%weather%}", realVal.weather[0].main);

  return temperature;
};

const server = http.createServer(function (req, res) {
  if (req.url == "/") {
    requests(
      "http://api.openweathermap.org/data/2.5/weather?q={city}&appid={ApiKey}"
    )
      .on("data", function (chunk) {
        const weatherData = JSON.parse(chunk);
        const arrdata = [weatherData];
        const realTimeData = arrdata
          .map((val) => replaceVal(indexHome, val))
          .join("");
        res.write(realTimeData);
      })
      .on("end", function (err) {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
      });
  } else {
    res.end("File not found | 404");
  }
});
server.listen(3000, function () {
  console.log("Server is running at port no 3000!");
});
