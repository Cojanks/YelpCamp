var express = require("express");
var router = express.Router({mergeParams:true});    //mergeParams will pass along information important to the "app.use("/campgrounds/:id/comments", commentRoutes);" in app.js. Specifically the ":id" portion important to the "Campground.findById(req.params.id" down below
// If that was not there, the route would fail due to the route not neing able to find the id of the campground (due to it not being passed along).
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//COMMENTS NEW
router.get("/new", middleware.isLoggedIn, function(req, res){ //isLoggedIn will check to see is user is authenticated, check out this middleware at the bottom
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
          res.render("comments/new", {campground: campground});
        }
    });
});

//COMMENTS CREATE
router.post("/", middleware.isLoggedIn, function(req, res){ //even though there is a isLoggedIn in order to see the comment form (above route), a user can still load up postman and fire off a post request which the server will take. This forces authentication for the post request 
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    //sanitize text
                    comment.text = req.sanitize(comment.text)
                    //add username and id to comment
                    comment.author.id = req.user._id;   //associates the comment author id to the user who is currently signed in
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.sanitize(req.body.comment), function(err, updatedComment){
        // 3 arguements: id of comment(req.params.comment_id), data to update text with(req.body.comment), callback
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
        });
});

//DESTROY (DELETE) ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Middleware


module.exports = router;