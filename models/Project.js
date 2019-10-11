const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    videoUrl: String,
    teamImage: String,
    logos: [{
        imageUrl: String
    }],
    Sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    }],
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }],

    news: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News'
    }]
});

module.exports = mongoose.model("Project", projectSchema);