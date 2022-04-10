const express = require('express');
const router = express.Router();
var fs = require('fs');

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
  console.log(cdProductArray);
  let data = JSON.stringify(cdProductArray);
  fs.writeFileSync('entries.json', data);
});

module.exports = router;