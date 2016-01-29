var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


router.get('/', function(req, res) {
    res.render("archives", {
        doc: {title:"归档"},
        theme: theme_config,
        config:global_config,
        site:db.data
    });
});

module.exports = router;
