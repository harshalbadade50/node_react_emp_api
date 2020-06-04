var express = require('express');
var router = express.Router();
const mongo = require('mongodb').MongoClient;
var ObjectId = require("mongodb").ObjectID;
const url = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
let db = "";

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.error(err);
        return
    }
    db = client.db('performancereview');
})

router.post('/createReview', function (req, res, next) {
    let collection = db.collection('feedbackdetails');
    collection.insertOne({
        reviewer: req.body.reviewer,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        requireFeedback: req.body.requireFeedback,
        feedback: req.body.feedback
    }, (err, result) => {
        if (err) {
            console.log("Error in Saving Performance Review - ", err);
            res.send("Error in Saving Performance Review");
        }
        res.send(JSON.stringify(result));
    });
});

router.get('/getAssignedReviews/:reviewer', function (req, res, next) {
    let reviewer = req.params.reviewer;
    let collection = db.collection('feedbackdetails');
    collection.find({
        reviewer: reviewer
    }).toArray((err, result) => {
        console.log('fetch result - ', result);
        if (err) {
            console.log("Error in fetching Review details - ", err);
            res.send("Error in fetching Review details");
        }
        res.send(JSON.stringify(result));
    });
});

router.put('/updateFeedback', function (req, res, next) {
    let collection = db.collection('feedbackdetails');
    collection.updateOne(
        {
            _id: ObjectId(req.body._id)
        }, 
        {
            '$set': {
                feedback: req.body.feedback,
                requireFeedback: req.body.requireFeedback
            }
        },
        (err, result) => {
        if (err) {
            console.log('error in updating feedback - ', err);
            res.send("Error in Updating Feedback");
        }
        res.send(JSON.stringify(result));
    })
});

module.exports = router;
