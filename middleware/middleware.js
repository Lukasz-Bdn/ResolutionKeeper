var User = require("../models/user");

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

module.exports = middlewareObj;