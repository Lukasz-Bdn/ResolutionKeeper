var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware/middleware");

router.get("/", function(req, res) {
    res.render("journal/journal");
});

router.get("/new", function(req, res) {
    res.render("journal/new");
});

router.post("/", function(req, res) {
    console.log(req.body.journal);
    var newJournal = req.body.journal;
    if (req.body.formPrivate === "on") {
       req.body.journal.private = true;
    } else {
        req.body.journal.private = false;
    }
    console.log(req.body.journal);
   res.redirect("/journal/new");
});

module.exports = router;