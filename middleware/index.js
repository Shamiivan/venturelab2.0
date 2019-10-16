const User = require("../models/User"),
    Topic = require("../models/Forum"),
    Comment = require("../models/Comment");


let middlewareObj = {};
middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
middlewareObj.checkTopicOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Topic.findById(req.params.id, function (err, foundTopic) {
            if (err) {
                // req.flash("error", "Topic not found");
                res.redirect("back");
            } else {
                // does user own the Topic?
                if (foundTopic.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        // req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}
middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                // does user own the comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        // req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}
// middlewareObj.isLoggedIn = (req,res,next)=>{
//     if(req.isUnauthenticated === false){
//     return next()
//     } else {
//          return res.status(422).json({
//           errors: {
//               message: "YOU HAVE TO LOG IN TO DO THAT",
//           },
//       });   
//     }

// };


// middlewareObj.isLoggedIn = (req, res, next) => {
//     console.log(req.session.passport)
//     if (req.session.passport === undefined) {
//         res.redirect("/login")

//     } else if (req.session.passport.user !== undefined) {
//         console.log("GOOD JOB");
//         return next();
//     }
// };
module.exports = middlewareObj;