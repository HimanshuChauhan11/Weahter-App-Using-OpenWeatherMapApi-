# Weahter-App-Using-OpenWeatherMap API
Weather App  Using OpenWeatherMapApi In Pure Node Js

## Technologies Used 
- Node Js
- OpenWeatherMap API

# Installation

### Step 1

```
$ npm i 
```

### Step 2

```
nodemon index.js
```

### Step 3

```
localhost:3000
```

#### Node: Kindly Please update {city}, {API key} with your own City Name and API key in index.js 
## Example: 
``
const server = http.createServer(function (req, res) {
  if (req.url == "/") {
    requests(
      "http://api.openweathermap.org/data/2.5/weather?q=Saharanpur&appid=7196fe2feb5202ad5fc8e02c802ae33d"
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
``
