const express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router({
        mergeParams: true
    }),
    Project = require('../models/Project'),
    Section = require('../models/Section'),
    News = require('../models/News'),
    Team = require('../models/Team'),
    Image = require('../models/ProjectImage');


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


router.put("/:id/teamImage/", parser.single("image"), (req, res) => {
    const teamImage = req.file.url;
    Project.findByIdAndUpdate(req.params.id, teamImage)
        .then(updatedProject => {
            res.redirect('/projects/' + updatedProject._id + '/edit');
            console.log('UPDATED PROJECT', updatedProject);
        })
        .catch(err => console.log(err));
});




// ROUTES


// PUBLIC ROUTES
router.get('/public/46fBxzRSz3bmj/', (req, res) => {
    Project.find({}, (err, Projects) => {
        res.render('public/index', {
            Projects: Projects
        });
    })

});
router.get('/:id/showToPublic/46fBxzRSz3bmj', (req, res) => {
    Project.findById(req.params.id)
        .populate('Sections')
        .populate('teamMembers')
        .populate('news')
        .exec((err, projectToUpdate) => {
            if (err) {
                console.log('ERROR RENDERING THE EDIT PAGE', err)
            } else {
                res.render("public/show", {
                    project: projectToUpdate
                });
            }
        })


});


// PRIVATE ROUTES
router.get('/', (req, res) => {
    Project.find({}, (err, Projects) => {
        res.render('project/index', {
            Projects: Projects
        });
    })

});


router.get('/new', (req, res) => {
    res.render('project/new');
});

router.post('/', parser.single("image"), (req, res) => {
    const project = {};
    project.name = req.body.name;
    project.description = req.body.description;
    project.image = req.file.url;
    // console.log(project);
    Project.create(project)
        .then(newProject => res.redirect('/projects/' + newProject._id + '/edit'))
        .catch(err => console.log(err));
});

router.get('/:id/edit', (req, res) => {
    Project.findById(req.params.id)
        .populate('Sections')
        .populate('teamMembers')
        .populate('news')
        .exec((err, projectToUpdate) => {
            if (err) {
                console.log('ERROR RENDERING THE EDIT PAGE', err)
            } else {
                res.render("project/edit", {
                    project: projectToUpdate
                });
            }
        })


});

router.put("/:id/", parser.single("image"), (req, res) => {
    console.log(req.file);
    if (req.file == undefined) {
        const udpdatedProject = {};
        udpdatedProject.name = req.body.name;
        udpdatedProject.description = req.body.description;
        Project.findByIdAndUpdate(req.params.id, udpdatedProject)
            .then(updatedProject => {
                res.redirect('/projects/' + updatedProject._id + '/edit');
                console.log('UPDATED PROJECT', updatedProject);
            })
            .catch(err => console.log(err));
    } else {
        const udpdatedProject = {};
        udpdatedProject.name = req.body.name;
        udpdatedProject.description = req.body.description;
        udpdatedProject.image = req.file.url;
        Project.findByIdAndUpdate(req.params.id, udpdatedProject)
            .then(updatedProject => {
                res.redirect('/projects/' + updatedProject._id + '/edit');
                console.log('UPDATED PROJECT', updatedProject);
            })
            .catch(err => console.log(err));
    }

});

router.delete("/:id/delete/", (req, res) => {
    Project.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log("ERROR DELETING Project:" + err);
            res.redirect("back");
        } else {
            res.redirect('/projects/');
        }
    });
});

module.exports = router;