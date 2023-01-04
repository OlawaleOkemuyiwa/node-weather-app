const fetch = require("node-fetch");

//To get the geographical coordinates of a location
const getLocationData = async location => {
  try {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiaWp1c3RkZXkiLCJhIjoiY2t6cGFkbWF2MDA3ZTJvbXJ5dTBqemFvNCJ9.jlD8PrUuflTUZ2mlw-5FDQ&limit=1`;
    const response = await fetch(geocodeURL);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unsuccessful request sent");
    }

    if (data.features.length === 0) {
      throw new Error("Unable to find location. Try another search.");
    }

    return {
      longitude: data.features[0].center[0],
      lattitude: data.features[0].center[1],
      location: data.features[0].place_name,
    };
  } catch (error) {
    console.log(
      error.message || "Unable to connect to location services in geo-code"
    );
  }
};

module.exports = getLocationData;
