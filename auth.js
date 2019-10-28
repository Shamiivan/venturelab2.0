var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/User"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    router = express.Router({
        mergeParams: true
    });


//============
// ROUTES
//============

// Auth Routes

//show sign up form
router.get("/register", function (req, res) {
    res.render("user/register");
});
//handling user sign up
router.post("/FG3ffhNj79BkGhNLWtAgBMFyLkTA/register/", function (req, res) {
    User.register(new User({
        username: req.body.username
    }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/forum");
        });
    });
});

// LOGIN ROUTES
//render login form
router.get("/login", function (req, res) {
    res.render("user/login", {
        message: req.flash("error", "You have to login before accessing our portal")
    });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/forum",
    failureRedirect: "/login"
}), function (req, res) {});

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("sucess", "You have sucessfuly logged out");
    res.redirect("/");
});



module.exports = router;