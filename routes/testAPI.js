//import MyDatabase from "../db/createDB.js";
var express = require('express');
var router = express.Router();
const mongo = require('mongodb').MongoClient;
//const url = 'mongodb://localhost:27017';
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
  const collection = db.collection('empdetails');
  console.log('collection - ', collection);
})

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('call to get api');
  res.send('Test Api working fine');
});

module.exports = router;
