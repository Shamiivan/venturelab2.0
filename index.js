const express = require('express'),
    app = express(),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

//DATABESE CONFIG
// let url = "mongodb://ivan:database1@ds211275.mlab.com:11275/traveldestiny"
let url = "mongodb+srv://shami:Venture123@vlcluster2-3hbwg.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("CONNECTED TO DATABASE BABY");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

// APP CONFIG
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));

//CLOUDINARY CONFIG
cloudinary.config({
    cloud_name: 'dafz217d6',
    api_key: '572979141449619',
    api_secret: 'FHjoFJmSDMNRFwneHtiY2rR60n0'
});


// ROUTES
// const header = require('./routes/header.js');
app.get('/', (req, res) => {
    res.render('public/home');
});
app.use('/projects', require('./routes/project.js'));
app.use('/projects/:id/section', require('./routes/section.js'));
app.use('/projects/:id/team', require('./routes/team.js'));
app.use('/projects/:id/news', require('./routes/news.js'));
app.use('/projects/:id/logo', require('./routes/logo.js'));


let port = process.env.PORT || 5000

app.listen(port, process.env.IP, () => {
    console.log('SERVER STARTED BABY on http://localhost:5000');
});