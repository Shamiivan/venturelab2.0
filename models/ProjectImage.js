const mongoose = require("mongoose");
const imageSchema = mongoose.Schema({
    url: String,
    id: String
});

module.exports = mongoose.model("HeaderImage", imageSchema);