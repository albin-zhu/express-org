var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
    console.log(req);
    res.send(200, "Success!");
});

module.exports = router;
