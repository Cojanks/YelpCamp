var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

//ROOT ROUTE
router.get("/", function(req, res){
    res.render("landing");
});

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle sign-up logic
router.post("/register", function(req, res){
    var newUser= new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);    //err is the error that the browser sends. Its an object containing a "message" property where the error actually is.
            return res.redirect("/register");
 
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelp Camp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login forms
router.get("/login", function(req, res){
    res.render("login");
});

//handling login logic
// this is essentially the same logic as the register but the register route creates a new user (if it can) and then will login the user. This route assumes the user exists aleady and then checks to authenticate
router.post("/login", passport.authenticate("local", //this middleware is only usable because of "passport.use(new LocalStrategy(User.authenticate()));" which contains the .authenticate() method
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged out")
    res.redirect("/campgrounds");
});


module.exports = router;