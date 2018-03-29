var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: Date,
    private: Boolean
});