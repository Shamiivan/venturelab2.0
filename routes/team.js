const express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router({
        mergeParams: true
    }),
    Project = require('../models/Project'),
    Team = require('../models/Team');


const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'venturelab',
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{
        width: 800,
        height: 800,
        crop: 'limit'
    }]
});
const parser = multer({
    storage: storage
});

function deleteDb() {
    Team.remove({}, (err) => {
        if (err) {
            console('error while removing seed data', err);
        }
        console.log('DELETED SOME STUFFS');
    });
}

// deleteDb();
// ROUTES

//NEW
router.get('/new', (req, res) => {
    Project.findById(req.params.id)
        .then((project) => {
            res.render('team/new', {
                project: project
            });
        })
        .catch(err => console.log('Error finding the project', err));
});

//CREATE

// router.post('/', (req, res) => {
//     console.log(req.body)
//     res.send('post route')
// });
router.post('/', (req, res) => {
    const newMemberObj = {}
    newMemberObj.name = req.body.name;
    newMemberObj.role = req.body.role;
    newMemberObj.email = req.body.email;
    Project.findById(req.params.id, (err, foundProject) => {
        if (err) {
            console.log(err)
        } else {
            Team.create(newMemberObj, (err, newMember) => {
                if (err) {
                    console.log('error while creating', err)
                } else {
                    newMember.save();
                    foundProject.teamMembers.push(newMember);
                    foundProject.save();
                    res.redirect("/projects/" + req.params.id + '/edit');

                }
            });
        }
    });
});

// EdIT AND UPDATE
router.get("/:teamMember_id/edit", (req, res) => {
    Team.findById(req.params.teamMember_id, (err, teamMember) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("team/edit", {
                project_id: req.params.id,
                member: teamMember
            });
        }
    });
});




router.put('/:teamMember_id/', (req, res) => {
    const updatedMemberObj = {};
    updatedMemberObj.name = req.body.name;
    updatedMemberObj.role = req.body.role;
    updatedMemberObj.email = req.body.email;
    Team.findByIdAndUpdate(req.params.teamMember_id, updatedMemberObj)
        .then(updatedMember => {
            res.redirect('/projects/' + req.params.id + '/edit');
            console.log('UPDATED MEMEBER', updatedMember);
        })
        .catch(err => console.log('EROOR UPDATE A MEMBER :', err));

});

router.delete("/:teamMember/delete/", (req, res) => {
    Team.findByIdAndRemove(req.params.teamMember, (err) => {
        if (err) {
            console.log("ERROR DELETING COMMENT :" + err);
            res.redirect("back");
        } else {
            res.redirect('/projects/' + req.params.id + '/edit');
        }
    });
});

module.exports = router;