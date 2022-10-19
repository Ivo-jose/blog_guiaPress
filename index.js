//Importing libraries
const express = require("express");
const bodyParser = require("body-parser");
//Creating instance of express
const app = express();

//Importing connection
const connection = require('./database/connection');

//Setting view engine ejs
app.set('view engine', 'ejs');

//Setting express to work static file
app.use(express.static('public'))

//Use body-parser
//Form data
app.use(bodyParser.urlencoded({extended:false}));
//Json data
app.use(bodyParser.json());


//Connecting DB
connection
    .authenticate()
    .then(() => {
        console.log('DB successfully conected!')
    }).catch((err) => {
        console.log(err);
    })


//Main route
app.get("/", (req,res) => {
    res.render("index");
})



//Starting serve
app.listen(8080, () => {
    console.log("Server running!")
})