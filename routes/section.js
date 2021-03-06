const express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router({
        mergeParams: true
    }),
    Project = require('../models/Project'),
    Section = require('../models/Section');


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


// ROUTES

//NEW
// router.get("/new", (req, res) => {
//     Project.findById(req.params.id, (err, project) => {
//         if (err) {
//             console.log("ERROR FINDING DESTINATION ID FOR COMMENT CREATION: " + err);
//         } else {
//             res.render("section/new", {
//                 section: section
//             });
//         }
//     });
// });

function deleteDb() {
    Project.remove({}, (err) => {
        if (err) {
            console('error while removing seed data', err);
        }
        console.log('DELETED SOME STUFFS');
    });
}

// deleteDb();
router.get('/new', (req, res) => {
    Project.findById(req.params.id)
        .then((project) => {
            res.render('section/new', {
                project: project
            });
        })
        .catch(err => console.log('Error finding the project', err));
});

//CREATE
router.post('/', parser.single("image"), (req, res) => {
    const sectionObj = {};
    sectionObj.title = req.body.title,
        sectionObj.p1 = req.body.p1,
        sectionObj.p2 = req.body.p2,
        sectionObj.p3 = req.body.p3;
    if (req.file == undefined) {
        sectionObj.image = '';
    } else {
        sectionObj.image = req.file.url
    }
    Project.findById(req.params.id, (err, foundProject) => {
        if (err) {
            console.log(err)
        } else {
            console.log(foundProject);
            Section.create(sectionObj, (err, createdSection) => {
                if (err) {
                    console.log('error while creating', err)
                } else {
                    createdSection.save();
                    foundProject.Sections.push(createdSection);
                    foundProject.save();
                    console.log('CREATED SECTION', createdSection);
                    // res.redirect('/study/' + foundProject._id + '/edit');
                    res.redirect('/projects/' + req.params.id + '/edit');


                }
            });
        }
    });
});

// router.get('/:section_id/edit', (req, res) => {
//     console.log(req.params.id.section_id);
//     res.json(req.params.id.section_id);
//     Section.findById(req.params.id.section_id)
//         .then((section) => {

//             console.log(section);
//             res.render('section/edit', {
//                 project_id: req.params.id,
//                 section: section,
//             });
//         })
//         .catch(err => console.log('Error finding the project', err));
// });


router.get("/:section_id/edit", (req, res) => {
    Section.findById(req.params.section_id, (err, section) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("section/edit", {
                project_id: req.params.id,
                section: section
            });
            // console.log('NEWS ID', req.params.news_id);
        }
    });
});

router.put('/:section_id/', parser.single("image"), (req, res) => {
    console.log(req.file)
    if (req.file == undefined) {
        const udpdatedSection = {};
        udpdatedSection.title = req.body.title;
        udpdatedSection.p1 = req.body.p1;
        udpdatedSection.p2 = req.body.p2;
        udpdatedSection.p3 = req.body.p3;
        Section.findByIdAndUpdate(req.params.section_id, udpdatedSection)
            .then(updatedSection => {
                res.redirect('/projects/' + req.params.id + '/edit');
                console.log('UPDATED PROJECT', updatedSection);
            })
            .catch(err => console.log(err));
    } else {
        const udpdatedSection = {};
        udpdatedSection.name = req.body.title;
        udpdatedSection.p1 = req.body.p1;
        udpdatedSection.p2 = req.body.p2;
        udpdatedSection.p3 = req.body.p3;
        udpdatedSection.image = req.file.url;
        Section.findByIdAndUpdate(req.params.section_id, udpdatedSection)
            .then(updatedSection => {
                res.redirect('/projects/' + req.params.id + '/edit');
                console.log('UPDATED Section: ', updatedSection);
            })
            .catch(err => console.log(err));
    }
});

router.delete("/:section_id/delete/", (req, res) => {
    Section.findByIdAndRemove(req.params.section_id, (err) => {
        if (err) {
            console.log("ERROR DELETING COMMENT :" + err);
            res.redirect("back");
        } else {
            res.redirect('/projects/' + req.params.id + '/edit');
        }
    });
});

module.exports = router;