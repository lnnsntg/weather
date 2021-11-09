console.log("Client side javascritpt file is loaded!");
"geolocation" in navigator
    ? console.log("Geolocation is available!")
    : console.log("Geolocation not available!");

//--------------------------------------------------------------

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");
const messageThree = document.getElementById("message-3");

//--------------------------------------------------------------

function launchRocket(location) {
    fetch(`/weather?address=${ location }`)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = ""
                messageTwo.innerHTML = `
                <li>Search term: ${ data["Search term"] } </li>
                <li>Coordinate found: ${ data['Coordinate found according to search term'] }</li>
                <li>Location: ${ data['Return location according to the coordinates sent to weatherstack.com'] }</li>
                <li>Weather description: ${ data["Weather description"] }</li>
                <li>Temperature: ${ data["Actual Temperature"] }</li>
                <li>Thermal sensation: ${ data["Thermal sensation"] }</li>     
                `
            }
        })
}

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading..."
    launchRocket(location);
});

/*
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  console.log(`Latitud: ${latitude}, Longitud: ${longitude}`);
});
 */


