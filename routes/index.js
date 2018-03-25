var express = require("express");
var router = express.Router();
var passport = require("passport");
// var User = require("../models/user");


router.get("/", function(req, res) {
    res.send("Is this app working?");
});

module.exports = router;