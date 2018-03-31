var mongoose = require("mongoose");

var journalSchema = new mongoose.Schema({
    title: String,
    description: String,
    created: Date,
    private: Boolean,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
});

module.exports = mongoose.model("Journal", journalSchema);