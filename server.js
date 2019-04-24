//dependencies
var express = require("express");
 //Initialize express
var app = express();
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");


// Make public a static folder
app.use(express.static("public"));


// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



mongoose.connect("mongodb://localhost/mongoHeadlines");
// check connection status
let db = mongoose.connection;
db.on('error', (error)=>{
    console.log(`Connection error ${error}`);
});




var PORT = 3000;
// start server
app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`);
});










// // Require all models
// var db = require("./models");

// // Configure middleware
// // Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());




// // If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";



// //Routes
// //route code here

