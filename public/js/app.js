const form = document.querySelector(".form");
const locationParagraph = document.querySelector(".location");
const forecastParagraph = document.querySelector(".forecast");

form.addEventListener("submit", event => {
  console.log("client-side JS");

  event.preventDefault();
  locationParagraph.textContent = "";
  forecastParagraph.textContent = "";

  const location = document.querySelector(".input").value;

  if (!location || location.trim().length === 0) {
    alert("You must enter an address");
    return;
  }

  forecastParagraph.textContent = "Loading...";

  fetch(`/weather?address=${location}`) //sending an http request to the demo API built by us
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }
      const { location, forecastMessage } = data;
      locationParagraph.textContent = location;
      forecastParagraph.textContent = forecastMessage;
    })
    .catch(error => {
      forecastParagraph.textContent = error;
    });
});
