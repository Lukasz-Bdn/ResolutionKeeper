var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware/middleware");

router.get("/", function(req, res) {
    res.render("landing");
});

router.get("/register", function(req,res) {
    res.render("register");
});

router.post("/register", middleware.isRegistrationDataValid, function(req, res) {
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, function(err,user) {
        if(err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to Resolution Keeper " + user.username);
            res.redirect("/");
        });
    });
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", 
    {
        failureRedirect: "/login",
        successRedirect: "/"
    }), function(req, res) {
});

router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Logged you out, thanks for visiting.");
   res.redirect("/");
});

module.exports = router;