const mongoose = require("mongoose");

const VlSchema = mongoose.Schema({
    name: String,
    role: String,
    email: String,
    image: String,
    publicationLink: String
});

module.exports = mongoose.model("VentureLab", VlSchema);