var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Chatogram' });
});

router.get('/chat', function (req, res, next) {
  res.render('chat', { title: 'Chatogram' });
});

module.exports = router;
