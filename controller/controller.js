var express = require("express");
var router = express.Router();

var cheerio = require("cheerio");
var axios = require("axios");


var Note = require("../models/Note");
var Article = require("../models/Article");

router.get("/", function(req, res){
    res.redirect("/articles");
});

router.get("/scrape", function(req, res){
    request("http://www.theverge.com",function(error, response,html){
        var $= cheerio.load(html);
        var titlesArray = [];

        $(".c-entry-box--compact__title").each(function(i, element){
            var result();

            //add text and href of every link
            result.title = $(this)
            .children("a")
            .text();
            result.link = $(this)
            .children("a")
            .attr("href");


            // check for dupes and empties
            if(result.title !== "" && result.link !==""){
                if (titlesArray.indexOf(result.title) == -1){
                    titlesArray.push(result.title);

                    Article.count({ title: result.title }, function(err, test){
                        if (test === 0) {
                            var entry = new Article(result);

                            entry.save(function(err, doc){
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(doc);
                                }
                            })
                        }
                    })
                }else {
                    console.log("Article already exists.");
                }
            }else {
                console.log("Not saved to DB");
            }
        });
        res.redirect("/");
    });
});


//populate DOM in "/" 
router.get("/articles", function(req, res){
    Article.find().sort({ _id: -1}).exec(function(err, doc){
        if (err) {
        console.log(err);
    } else {
        var artc1 = { article: doc };
        res.render("index", artc1);
    }
});
});


//articles JSON route. from mongo DB to JSON
router.get("/article-json", function(req, res){
    Article.find({}, function(err, doc){
        if (err) {
            console.log(err);
        } else {
            res.json(doc);
        }
    });
});

module.exports = router;