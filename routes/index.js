var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render("index", {
    doc: {title:global_config.title},
    theme: theme_config,
    config:global_config,
    site:db.data
  });
});

module.exports = router;
