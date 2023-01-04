const fetch = require("node-fetch");

const getLocationData = require("./geo-code");

//To get the weather info of a location based on its geographical coordinates(Long&Lat gotten from its inner geeo-code function)
const getWeatherInfo = async place => {
  try {
    const { lattitude, longitude, location } = await getLocationData(place);

    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=479b184ecee01f179a839cf761021115&query=${lattitude},${longitude}&units=m`
    );
    const data = await response.json();

    if (!response.ok) {
      //this is done bcos the fetch API doesnt treat error status codes as real errors. It will not throw a technical error which can be caught in the try/catch block if there is an unsuccessful msg/error response from the request sent. So the status of the response is manually checked and if it has an unsuccessful status code [40x, 50x] then the response is not ok and an error msg is thrown which is caught in the try/catch block.
      throw new Error(data.message || "Unsuccessful request sent!");
    }

    if (data.error) {
      throw new Error("Unable to find location, Try another search");
    }

    return {
      location,
      forecastMessage: `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out.`,
    };
  } catch (error) {
    console.log(
      error.message || "Unable to connect to weather services in forecast"
    );
  }
};

module.exports = getWeatherInfo;
