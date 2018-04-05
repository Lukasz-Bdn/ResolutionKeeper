var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Journal = require("../models/journal");
var middleware = require("../middleware/middleware");

router.get("/", middleware.isLoggedIn, function(req, res) {
        Journal.find({'author.username': req.user.username}, function(err, userJournals) {
            if(err) {
                console.log(err);
                res.redirect("/");
            } else {
                console.log(userJournals);
                res.render("journal/journal", {userJournals : userJournals});
            }
        });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("journal/new");
});

router.post("/", middleware.isLoggedIn, function(req, res) {
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

router.get("/:journal_id/edit", middleware.checkJournalOwnership, function(req, res) {
    Journal.findById(req.params.journal_id, function(err, foundJournal) {
        if(err) {
            req.flash("Journal not found");
            res.redirect("/journals");
        } else {
            res.render("journal/edit", {journal : foundJournal});
        }
    });
});

router.put("/:journal_id", middleware.checkJournalOwnership, function(req, res) {
    req.body.journal.private = (req.body.formPrivate === "on");
    Journal.findByIdAndUpdate(req.params.journal_id, req.body.journal, 
                                function(err, updatedJournal) {
        if(err) {
            req.flash("error", "You cannot edit this journal");
            res.redirect("/journals");
        } else {
            res.redirect("/journals/");
        }
    });
});

router.get("/:journal_id/delete", middleware.checkJournalOwnership, function(req, res) {
    Journal.findByIdAndRemove(req.params.journal_id, function(err) {
        if(err) {
            req.flash("error", "Cannot delete journal.");
            res.redirect("/journals");
       } else {
            req.flash("success", "Successfully deleted journal.");
            res.redirect("/journals");
       }
   });
});

module.exports = router;