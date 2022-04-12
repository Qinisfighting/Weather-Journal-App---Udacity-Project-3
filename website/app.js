/* Global Variables */

// Create a new date instance dynamically with JS

const d = new Date();
const newDate = d.toDateString();

// Personal API Key for OpenWeatherMap API
/* reference: 
https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/96d7d320-f8a8-4210-b502-c8de300b745e
https://home.openweathermap.org/api_keys
*/

const baseURL =
  "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
const apiKey = "&appid=b0c6dd1560b603095aed754d5d1756d0&units=imperial";

// Event listener to add function to existing HTML DOM element

document.getElementById("generate").addEventListener("click", performAction);

// Function called by event listener
// code reference: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/06b6f9e9-221f-4668-8d13-a70346b293d2

function performAction(e) {
  const feelings = document.getElementById("feelings").value;
  const newZip = document.getElementById("zip").value;

  getWeather(baseURL, newZip, apiKey)
    .then(function (data) {
      postData("/addData", {
        name: data.name,
        date: newDate,
        temp: data.main.temp,
        feelings: feelings
      });
    })
    .then(updateUI());
}

// Function to GET Web API Data

const getWeather = async (baseURL, newZip, apiKey) => {
  const request = await fetch(baseURL + newZip + apiKey);

  try {
    const allData = await request.json();

    //alert with statues of 404

    if (allData.message) {
      alert(allData.message);
    } else {
      return allData;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Function to POST data
//code reference:https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/6931a2aa-e847-4973-bb74-bb70e71b36a0

const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//Function to GET Project Data

const updateUI = async () => {
  const req = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await req.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("name").innerHTML = allData[120].name;
    document.getElementById("date").innerHTML = allData[120].date;
    document.getElementById("temp").innerHTML =
      Math.round(allData[120].temp) + " degrees fahrenheit";
    document.getElementById("content").innerHTML = "I am feeling "+allData[120].feelings;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
