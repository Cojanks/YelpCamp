var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX route - show all campgrounds
router.get("/", function(req, res){
    //get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});  
        }
    });
});

//CREATE route - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // use for testing: res.send("You hit a POST request");
    //get data from form and add to campgrounds array:
    var name = req.sanitize(req.body.name);
    var price = req.sanitize(req.body.price);
    var image = req.sanitize(req.body.image);
    var desc = req.sanitize(req.body.description);
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    //create new Campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            // redirect back to /campgrounds if successful/no errors
             res.redirect("/campgrounds");
        }
    });
});

//NEW route - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW route- shows more info about a particular campground
router.get("/:id", function(req, res){
    //Find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       // note about above: the .populate("comments") is there because currently the comments associated with each campground object is just an ID
       // The populate will find the reference from that id and then populate the data (text, author, etc) when the Campground.findById fires.
        if(err){
            console.log(err);
        }else{
            //render show template with that campground (show.ejs)
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});
//This HAS to be below /campgrounds/new, otherwise it will treat "/new" as an id route

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update correct campground
     Campground.findByIdAndUpdate(req.params.id, req.sanitize(req.body.campground), function(err, updatedCampground){
         // findbyIdAndUpdate takes 3 arguements: id to find by, the data to update it with, and the callback to run afterwards
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id); // you can also use updatedCampground._id instead of req.params.id
        } 
     });
});

//DESTROY
router.delete("/:id/", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//middleware


module.exports = router;