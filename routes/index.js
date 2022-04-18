const { Console } = require('console');
const express = require('express');
const router = express.Router();
var fs = require('fs');
//Setting up mongo support
const mongoose = require("mongoose");
const cdSchema = require("../cdSchema");

const dbURI =
"mongodb+srv://BCstudent:Hawaii@luizacluster.kgcpu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//"mongodb+srv://Rocks:Rock@sam-cluster0.mcrbf.mongodb.net/CdDB?retryWrites=true&w=majority";

//Make Mongoose use findOneAndUpdate()
mongoose.set('useFindAndModify', false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
}

mongoose.connect(dbURI, options).then(
  () => { console.log("Database connection successful!")},
  err => { console.log("Error connecting to the database due to ", err)}
);

let cdProductArray = [];

/* GET users listing */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});

router.post('/order', function(req, res) {
  const order = req.body;
  console.log(order);
  res.json(order)
});

router.post('/SubmitOne', function(req, res) {
  console.log(req.body);
});

router.post('/Submit500', function(req, res) {
  cdProductArray = req.body;

  for (let i = 0; i < cdProductArray.length; i++) {
    let newCd = new cdSchema(cdProductArray[i]);
    newCd.save((err, todo) => {
      if(err) {
        res.status(500).send(err);
      }
    })
  }

  var response = {
    status: 200,
    success: 'added successfully'
  }
  res.end(JSON.stringify(response));

});

router.get('/FilterData1', function(req, res) {
  cdSchema.aggregate([
    {$group: {_id: "$storeID", count: { $sum: "$pricePaid"}}}
  ])

  .sort('count')

  .exec(function (err, storeRanking) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(storeRanking);
    res.status(200).json(storeRanking);
  })
});

router.get('/FilterData2', function(req, res) {
  cdSchema.aggregate([
    //{ $match : { cdID: 123456}},
    {$group: {_id: "$cdID", count: { $sum: "$pricePaid"}}}
  ])

  .sort('-count')

  .exec(function (err, storeRanking) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    console.log(storeRanking);
    res.status(200).json(storeRanking);
  })
});

//SAVE TO FILE
/*router.post('/Submit500', function(req, res) {
  cdProductArray = req.body;
  console.log(cdProductArray);
  let data = JSON.stringify(cdProductArray);
  fs.writeFileSync('entries.json', data);
});*/

module.exports = router;