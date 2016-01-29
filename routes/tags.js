var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


router.get('/', function(req, res) {
    res.render("tag", {
        doc: {title:"标签"},
        theme: theme_config,
        config:global_config,
        site:db.data
    });
});

router.get('/:tag', function(req, res) {
    var tag = req.params.tag;
    console.log(tag);
    res.render("child_tag", {
        the_tag: tag,
        posts: db.data.tags[tag],
        doc: {title: tag + " | 标签"},
        theme: theme_config,
        config:global_config,
        site:db.data
    });
});



module.exports = router;
