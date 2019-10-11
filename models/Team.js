const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    name: String,
    role: String,
    email: String
});

module.exports = mongoose.model("Team", teamSchema);