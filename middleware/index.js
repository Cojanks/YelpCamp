// All middleware goes here
//The reason for naming this index.js is because when you requre a directory, the only file that is actually pulled up is the index.js file of that directory. 
// Look at campgrounds.js, the require statement is just var middleware = require("../middleware") instead of var middleware = require("../middleware/somefile.js")
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err){
                req.flash("error", "Campground not found");
               res.redirect("back");
           }  else {
            // does user own the campground?
            //note: You would think that you could use if(foundCampground.author.id === req.user._id) but you cant. foundCampground.author.id is a mongoose object and req.user._id is a string so this will fail
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do this");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
            // does user own the comment?
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do this");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};



module.exports = middlewareObj;