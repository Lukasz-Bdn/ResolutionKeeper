var mongoose = require("mongoose");

var journalSchema = new mongoose.Schema({
    title: String,
    description: String,
    started: Date,
    private: Boolean,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

module.exports = mongoose.model("Journal", journalSchema);