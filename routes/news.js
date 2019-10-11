const express = require('express'),
    bodyParser = require('body-parser'),
    router = express.Router({
        mergeParams: true
    }),
    Project = require('../models/Project'),
    News = require('../models/News');


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
    News.remove({}, (err) => {
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
            res.render('news/new', {
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
router.post('/', parser.single("image"), (req, res) => {
    const newsObj = {}
    newsObj.title = req.body.title;
    newsObj.description = req.body.description;
    newsObj.type = req.body.type
    newsObj.url = req.body.url;
    if (req.file == undefined) {
        newsObj.image = '';
    } else {
        newsObj.image = req.file.url
    }
    console.log(newsObj);
    Project.findById(req.params.id, (err, foundProject) => {
        if (err) {
            console.log(err)
        } else {
            News.create(newsObj, (err, newsCard) => {
                if (err) {
                    console.log('error while creating', err)
                } else {
                    newsCard.save();
                    foundProject.news.push(newsCard);
                    foundProject.save();
                    // res.redirect('/study/' + foundProject._id + '/edit');
                    res.redirect("/projects/" + req.params.id + '/edit');

                }
            });
        }
    });
});

router.get("/:news_id/edit", (req, res) => {
    News.findById(req.params.news_id, (err, foundNews) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("news/edit", {
                project_id: req.params.id,
                news: foundNews
            });
        }
    });
});




router.put('/:news_id/', parser.single("image"), (req, res) => {
    if (req.file == undefined) {
        const updatedNewsObj = {};
        updatedNewsObj.title = req.body.title;
        updatedNewsObj.description = req.body.description;
        updatedNewsObj.type = req.body.type;
        updatedNewsObj.url = req.body.url;
        News.findByIdAndUpdate(req.params.news_id, updatedNewsObj)
            .then(updatedNews => {
                res.redirect('/projects/' + req.params.id + '/edit');
                console.log('UPDATED PROJECT', updatedNews);
            })
            .catch(err => console.log(err));
    } else {
        const updatedNewsObj = {};
        updatedNewsObj.name = req.body.title;
        updatedNewsObj.description = req.body.description;
        updatedNewsObj.type = req.body.type;
        updatedNewsObj.url = req.body.url;
        updatedNewsObj.image = req.file.url;
        News.findByIdAndUpdate(req.params.news_id, updatedNewsObj)
            .then(updatedNews => {
                res.redirect('/projects/' + req.params.id + '/edit');
                console.log('UPDATED News: ', req.file);
            })
            .catch(err => console.log(err));
    }
});

router.delete("/:news_id/delete/", (req, res) => {
    News.findByIdAndRemove(req.params.news_id, (err) => {
        if (err) {
            console.log("ERROR DELETING COMMENT :" + err);
            res.redirect("back");
        } else {
            res.redirect('/projects/' + req.params.id + '/edit');
            console.log('NEWS CARD DELETED ', );
        }
    });
});
module.exports = router;