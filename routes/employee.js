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
    db = client.db('employee');
    let collection = db.collection('empdetails');
    //collection.insertOne({ _id: "itemId", seqValue: 0 });
})

/* GET users listing. */
router.get('/', function (req, res, next) {
    let collection = db.collection('empdetails');
    collection.find({}).toArray((err, result) => {
        console.log('fetch result - ', result);
        if (err) {
            console.log("Error in fetching employees - ", err);
            res.send("Error in fetching all Employees");
        }
        res.send(JSON.stringify(result));
    });
});

router.post('/addEmployee', function (req, res, next) {
    let collection = db.collection('empdetails');
    collection.insertOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        gender: req.body.gender,
        email: req.body.email
    }, (err, result) => {
        if (err) {
            console.log('error in adding employee - ', err);
            res.send("Error in adding employee");
        }
        res.send(JSON.stringify(result));
    })
});

router.delete('/deleteEmployee/:id', function (req, res, next) {
    let empId = req.params.id;
    let collection = db.collection('empdetails');
    collection.deleteOne({_id: ObjectId(empId) }, (err, result) => {
        if (err) {
            console.log("Error in deleting employee - ", err);
            res.send("Error in fetching all Employees");
        }
        res.send(JSON.stringify(result));
    });
});

router.put('/updateEmployee', function (req, res, next) {
    let collection = db.collection('empdetails');
    collection.updateOne(
        {
            _id: ObjectId(req.body._id)
        }, 
        {
            '$set': {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                city: req.body.city,
                gender: req.body.gender,
                email: req.body.email,
            }
        },
        (err, result) => {
        if (err) {
            console.log('error in adding employee - ', err);
            res.send("Error in adding employee");
        }
        res.send(JSON.stringify(result));
    })
});

function getSequenceNextValue(seqName) {
    let collection = db.collection('empdetails');
    var seqDoc = collection.findAndModify({
        query: { _id: seqName },
        update: { $inc: { seqValue: 1 } },
        new: true
    });

    return seqDoc.seqValue;
}

module.exports = router;
