const express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router({
        mergeParams: true
    }),
    Lab = require('../models/VentureLab');

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'venturelabMembers',
    allowedFormats: ["jpg", "png", "jpeg"],
    transformation: [{
        width: 400,
        height: 400,
        crop: 'limit'
    }]
});
const parser = multer({
    storage: storage
});


// 
// PUBLIC ROUTES

// PRIVATE ROUTES
router.get('/', (req, res) => {
    Lab.find({}, (err, members) => {
        res.render('Lab/index', {
            members: members
        });
    });
});


router.get('/new', (req, res) => {
    res.render('Lab/new');
});

router.post('/', parser.single("image"), (req, res) => {
    const member = {};
    member.name = req.body.name;
    member.role = req.body.role;
    member.email = req.body.email;
    member.publicationLink = req.body.publicationLink;
    member.image = req.file.url;
    console.log(member);
    Lab.create(member)
        .then(newMemeber => res.redirect('/ventureLabTeam'))
        .catch(err => console.log(err));
});

router.get('/:id/edit', (req, res) => {
    Lab.findById(req.params.id)
        .then((member) => {
            res.render("Lab/edit", {
                member: member
            });
        })
        .catch(err => console.log('ERROr FINDING ONE VL MEMBER', err));
});

router.put("/:id/", parser.single("image"), (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
        const member = {};
        member.name = req.body.name;
        member.role = req.body.role;
        member.email = req.body.email;
        member.publicationLink = req.body.publicationLink;
        Lab.findByIdAndUpdate(req.params.id, member)
            .then(updatedLab => {
                res.redirect('/ventureLabTeam');
                console.log('UPDATED Lab', updatedLab);
            })
            .catch(err => console.log(err));
    } else {
        const member = {};
        member.name = req.body.name;
        member.role = req.body.role;
        member.email = req.body.email;
        member.publicationLink = req.body.publicationLink;
        member.image = req.file.url;
        Lab.findByIdAndUpdate(req.params.id, member)
            .then(updatedLab => {
                res.redirect('ventureLabTeam');
            })
            .catch(err => console.log(err));
    }
});


router.delete("/:id/delete/", (req, res) => {
    Lab.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log("ERROR DELETING member :" + err);
            res.redirect("back");
        } else {
            res.redirect('/ventureLabTeam');
        }
    });
});



module.exports = router;