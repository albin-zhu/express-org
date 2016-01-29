var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    console.log(req);
    res.send("Success!");
});

module.exports = router;
