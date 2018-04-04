var User = require("../models/user");
var Journal = require("../models/journal");

var middlewareObj = {};

middlewareObj.isRegistrationDataValid = function(req, res, next) {
    if(req.body.password.length < 5) {
        req.flash("error", "Password must be at least 6 characters long.");
        res.redirect("/register");
    } else if (req.body.username.length < 5) {
        req.flash("error", "Username must be at least 6 characters long.");
        res.redirect("/register");
    } else if(req.body.password !== req.body.confirmPassword) {
        req.flash("error", "Please make sure both entered passwords match.");
        res.redirect("/register");
    } else {
        next();
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You need to be logged in.");
        res.redirect("/login");
    }
};

middlewareObj.checkJournalOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Journal.findById(req.params.journal_id, function(err, foundJournal) {
            if(err) {
                req.flash("error", "Journal not found");
                res.redirect("/journals");
            } else {
                if(foundJournal.author.id.equals(req.user._id)) {
                    next(); 
                } else {
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("/journals");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
};

module.exports = middlewareObj;