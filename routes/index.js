const express = require('express');
const router = express.Router();

/* GET users listing */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});

router.post('/order', function(req, res) {
  const order = req.body;
  console.log(order);
  res.json(order)
});

module.exports = router;