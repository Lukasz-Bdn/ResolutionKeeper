var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware/middleware");

router.get("/", function(req, res) {
    res.render("journal/journal");
});

module.exports = router;