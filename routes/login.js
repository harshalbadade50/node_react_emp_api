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
    db = client.db('login');
    let collection = db.collection('logincreds');
    //collection.insertOne({ email: "harsh@gmail.comm", pwd: "admin", role: "admin" });
    //collection.insertOne({ email: "john@gmail.com", pwd: "user", role: "user" });
})

router.post('/doLogin', function (req, res, next) {
    let collection = db.collection('logincreds');
    collection.find({
        email: req.body.email,
        pwd: req.body.password
    }).toArray((err, result) => {
        if (err) {
            console.log("Error in fetching employees - ", err);
            res.send("Error in fetching all Employees");
        }
        res.send(JSON.stringify(result));
    });
});

module.exports = router;
