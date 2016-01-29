var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


router.get('/', function(req, res) {
    res.render("cat", {
        doc:{title:"分类"},
        theme: theme_config,
        config:global_config,
        site:db.data
    });
});

router.get('/:cat', function(req, res) {
    var cat = req.params.cat;
    res.render("child_cat", {
        the_cat: cat,
        posts: db.data.categories[cat],
        doc: {title: cat + " | 分类"},
        theme: theme_config,
        config:global_config,
        site:db.data
    });
});

module.exports = router;
