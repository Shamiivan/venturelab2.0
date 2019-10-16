const express = require('express'),
    app = express(),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    flash = require("connect-flash"),
    methodOverride = require('method-override'),
    passport = require("passport"),
    localStrategy = require("passport-local").Strategy,
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/User");

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
app.use(flash());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
//AUTHETINCATION 

//PASSPORT CONFIGc9

app.use(require("express-session")({
    secret: "VentureLab Site",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//CLOUDINARY CONFIG
cloudinary.config({
    cloud_name: 'dafz217d6',
    api_key: '572979141449619',
    api_secret: 'FHjoFJmSDMNRFwneHtiY2rR60n0'
});

// ROUTES
// const header = require('./routes/header.js');
app.use(require('./auth.js'))
app.use(require('./routes/index.js'));
app.use(require('./routes/forum.js'));
app.use('/projects', require('./routes/project.js'));
app.use('/projects/:id/section', require('./routes/section.js'));
app.use('/projects/:id/team', require('./routes/team.js'));
app.use('/projects/:id/news', require('./routes/news.js'));
app.use('/projects/:id/logo', require('./routes/logo.js'));
app.use('/ventureLabTeam', require('./routes/venturelabTeam.js'));


let port = process.env.PORT || 5000

app.listen(port, process.env.IP, () => {
    console.log('SERVER STARTED BABY on http://localhost:5000');
});