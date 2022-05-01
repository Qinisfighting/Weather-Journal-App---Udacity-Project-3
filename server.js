//code reference: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1844/concepts/ecf2408b-6ab1-4906-bd28-8348d99bc95d

// Setup empty JS object to act as endpoint for all routes

projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/* Dependencies */

const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder

app.use(express.static('website'));

// Setup Server

const port = 8000;

//spin up the server

const server = app.listen(port, listening);

// Callback to debug

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}


// Initialize all route with a callback function
// Callback function to complete GET '/all'
//code reference: https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/c06e119b-710e-40f9-838e-123a36b650fc

app.get('/all', (req,res) => {
    res.send(projectData);  
})

// Post Route
/*code reference:
https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1845/concepts/f0b46126-a01c-43c9-8431-9e9e6ae4d85d
https://classroom.udacity.com/nanodegrees/nd0011/parts/cd0429/modules/d153872b-b417-4f32-9c77-d809dc21581d/lessons/ls1846/concepts/7232b6f5-7e1b-4f5e-87f1-aa6871e29868
*/

app.post('/addData', (req,res) => {
    newEntry = {
    date: req.body.date,
    name: req.body.name,
    temp: req.body.temp,
    feelings: req.body.feelings,
    }
    projectData = newEntry;
    res.send(projectData)
})