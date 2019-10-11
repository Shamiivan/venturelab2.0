const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    title: String,
    description: String,
    image: String,
    url: String,
    type: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("News", newsSchema);