var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Journal = require("../models/journal");
var middleware = require("../middleware/middleware");

router.get("/", function(req, res) {
    Journal.find({'author.username': req.user.username}, function(err, userJournals) {
        if(err) {
            console.log(err);
        } else {
            res.render("journal/journal", {userJournals : userJournals});
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("journal/new");
});

router.post("/", function(req, res) {
    var newJournal = req.body.journal;
    req.body.journal.private = (req.body.formPrivate === "on");
    newJournal.created = new Date();
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    newJournal.author = author;
    Journal.create(newJournal, function(err, newlyCreatedJournal) {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/journals/");
        }
    });
});

router.get("/:journal_id/edit", function(req, res) {
   res.send("edit path"); 
});

module.exports = router;