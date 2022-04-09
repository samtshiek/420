var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

module.exports = router;

/*
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// routes will go here
app.listen(port);
console.log('Server started at http://localhost:8080' + port);
 router = express.Router();

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('index.html');
});

module.exports = router;
*/