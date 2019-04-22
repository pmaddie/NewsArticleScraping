//dependencies
var express = require("express");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Require all models
var db = require("./models");

var PORT = 3000;

//Initialize express
var app = express();
// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/", { useNewUrlParser: true });


//Routes
//route code here

// check connection status
let db = mongoose.connection;
db.on('error', (error)=>{
    console.log(`Connection error ${error}`);
});

// start server
app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`);
});
