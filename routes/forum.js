const express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    Discussion = require("../models/Forum"),
    Comment = require("../models/Comment"),
    middleware = require("../middleware/index");

function seedDB() {
    Comment.remove({}, (err) => {
        if (err) {
            console('error while removing seed data', err);
        }
        console.log('datatabase seeded');
    });
}
// seedDB();

router.get('/forum', middleware.isLoggedIn, (req, res) => {
    Discussion.find({}, (err, foundDiscussions) => {
        if (err) {
            console.log(err)
        } else {
            res.render('forum/index', {
                Discussions: foundDiscussions
            });
        }
    });
});

//New 

router.get('/forum/newDiscussion', (req, res) => {
    res.render('forum/new')
});


router.post('/forum/newDiscussion', middleware.isLoggedIn, (req, res) => {
    let {
        topic: topic,
        content: content,
        created: created,
    } = req.body;
    let newDiscussion = {
        topic: topic,
        content: content,
        created: created,
    };
    newDiscussion.author = {
        id: req.user._id,
        username: req.user.username
    }
    Discussion.create(newDiscussion, (err, newDiscussion) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/forum')
    });


});

//SHOW  
router.get('/forum/discussion/:id', (req, res) => {
    Discussion.findById(req.params.id).populate('comments').exec((err, foundDiscussion) => {
        if (err) {
            console.log('err getting one discussion', err)
        } else {
            res.render('forum/show', {
                discussion: foundDiscussion
            });
        }
    })
});



//COMMENT SECTION

//NEW
router.get("/forum/discussion/:id/comments/new", (req, res) => {
    Discussion.findById(req.params.id, (err, foundDiscussion) => {
        if (err) {
            console.log("ERROR FINDING DISCUSSIN ID FOR COMMENT CREATION: " + err);
        } else {
            res.render("forum/comments/new", {
                discussion: foundDiscussion
            });

        }
    });
});

//CREATE
router.post("/forum/discussion/:id/comments", (req, res) => {
    Discussion.findById(req.params.id, (err, foundDiscussion) => {
        if (err) {
            console.log("ERROR FINDING THE DISCUSSION ID: " + err);
            res.redirect("/");
        } else {
            // let newComment = req.body.comment;
            // newComment.author = foundDiscussion.author.username;
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log("ERROR CREATING COMMENT: " + err);
                } else {
                    // comment.author.id = req.user.id;
                    // comment.author.username = req.user.username;
                    comment.author = foundDiscussion.author;
                    comment.save();
                    foundDiscussion.comments.push(comment);
                    foundDiscussion.save();
                    res.redirect('/forum/discussion/' + foundDiscussion._id);
                    console.log(comment);
                }
            });
        }
    });
});

//EDIT 
// router.get("/:comment_id/edit", (req, res) => {
//     Comment.findById(req.params.comment_id, (err, foundComment) => {
//         if (err) {
//             res.redirect("back");
//         } else {
//             res.render("/forum/comments/edit", {
//                 campground_id: req.params.id,
//                 comment: foundComment
//             });
//         }
//     });
// });

//UPDATE
// router.put("/:comment_id", (req, res) => {
//     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
//         if (err) {
//             res.redirect("back");
//         } else {
//             res.redirect("/campgrounds/" + req.params.id);
//         }
//     });
// });

// DESTROY
router.delete("/forum/discussion/:id/:comment_id/delete/", (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            console.log("ERROR DELETING COMMENT :" + err);
            res.redirect("back");
        } else {
            res.redirect("/forum");
        }
    });
});

module.exports = router;






module.exports = router;