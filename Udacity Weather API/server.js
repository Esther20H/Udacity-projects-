// Setup empty JS objects to act as endpoint for all routes

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
// Start up an instance of app
// Setup empty JS objects to act as endpoint for all routes
let projectData = {};

app.use(express.json());
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
const cors = require('cors');

// Initialize the main project folder
app.use(express.static('website'));
app.use(cors());

app.post('/all', async(req, res) =>{
    const info = await req.body;
    projectData = info;
    res.send(projectData);
});

app.get('/all', async(req, res) =>{
    if (projectData) {
        res.send(projectData);
    }
});
app.listen(port, function(){console.log(`listening on port ${port}`)});