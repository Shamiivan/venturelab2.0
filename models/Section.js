const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    title: String,
    p1: String,
    p2: String,
    p3: String,
    p4: String,
    image: String

});

module.exports = mongoose.model("Section", sectionSchema);