const express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router({
        mergeParams: true
    }),
    Project = require('../models/Project');

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
    Project.remove({}, (err) => {
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
            res.render('logo/new', {
                project: project
            });
        })
        .catch(err => console.log('Error finding the project', err));
});

// router.post('/', parser.single("image"), (req, res) => {
//     let logoImage = {}
//     if (req.file == undefined) {
//         logoImage.url = '';
//     } else {
//         logoImage.url = req.file.url;
//     }
//     console.log(logoImage);
//     Project.findById(req.params.id, (err, foundProject) => {
//         if (err) {
//             console.log(err)
//         } else {
//             Logo.create(logoImage, (err, logoImageUrl) => {
//                 if (err) {
//                     console.log('error while creating', err)
//                 } else {
//                     logoImageUrl.save();
//                     foundProject.logos.push(logoImage);
//                     foundProject.save();
//                     // res.redirect('/study/' + foundProject._id + '/edit');
//                     res.redirect("/projects/" + req.params.id + '/edit');
//                     console.log(foundProject);

//                 }
//             });
//         }
//     });
// });

router.post('/', parser.single("image"), (req, res) => {
    let logo = {}
    if (req.file == undefined) {
        logo.imageUrl = '';
    } else {
        logo.imageUrl = req.file.url;
    }
    console.log(logo);
    Project.findById(req.params.id, (err, foundProject) => {
        if (err) {
            console.log(err)
        } else {
            foundProject.logos.push(logo);
            foundProject.save();
            // res.redirect('/study/' + foundProject._id + '/edit');
            res.redirect("/projects/" + req.params.id + '/edit');
            console.log(foundProject);
        }

    });
});

router.delete("/:logo_id/delete/", (req, res) => {
    Logo.findByIdAndRemove(req.params.Logo_id, (err) => {
        if (err) {
            console.log("ERROR DELETING COMMENT :" + err);
            res.redirect("back");
        } else {
            res.redirect('/projects/' + req.params.id + '/edit');
            console.log('Logo CARD DELETED ', );
        }
    });
});
module.exports = router;