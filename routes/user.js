var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var User = require("../models/user");

// Index &show
router.get("/:id", middleware.isLoggedIn, function(req, res){
    // res.send(res.locals.currentUser);
    res.render("users/show", {user: res.locals.currentUser});
      
});

//DESTROY
router.delete("/:id/", middleware.isLoggedIn, function(req, res){
    User.findByIdAndRemove(res.locals.currentUser.id, function(err){
        if(err){
            res.send("THERE WAS AN ERROR");
        }else{
            res.redirect("/");
        }
    });
});

module.exports = router;