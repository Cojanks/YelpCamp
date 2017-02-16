var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    methodOverride  = require("method-override"),
    expressSanitizer = require('express-sanitizer'),
    flash           = require('connect-flash');

// Route requiring    
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    userRoutes      = require("./routes/user"),
    indexRoutes      = require("./routes/index");
   
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
// The above tells the app to use body-parser which allows use to pull information from forms *important*
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.use(expressSanitizer());
// seedDB(); //seed the database

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "There is no cow level",    //for express session, 'secret' is used to encode and decode sessions, passwords, etc. 
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;  //for all local pages, the currentUser information will be pulled from req.user. If no user is logged in, this will return undefined, otherwise will return with the username and id
    // The following are the two types of flash messages that will be available to all pages. You can have as many as you want as long as they are named (in this case, only "success" and "error" are available)
    // Tn the other pages you will see req.flash("error", "Logged out") where error is the type of flash and the "Logged out" is the message within the flash
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    
    next();
});

app.use(indexRoutes); // Originally app.use(indexRoutes); 
app.use("/campgrounds", campgroundRoutes); // Originally app.use(campgroundRoutes); When we refactored, originally all routes within this route.js started with "/campgrounds". In order to dry this, we deleted all "/campgrounds" from the routes and added the code here to append the "/campgrounds" before all routes in this js file.
app.use("/campgrounds/:id/comments", commentRoutes); // Originally app.use(indexRoutes); with the "/campgrounds/:id/comments" in all the routes within this route.js file
app.use("/user", userRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server Has Started");
});