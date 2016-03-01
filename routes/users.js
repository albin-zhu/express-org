var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/:cat/:org', function(req, res) {
  var id = req.params.org;
  var cat =req.params.cat;
  var doc = db.data.orgs[path.join("orgs", cat, id)];
  console.log(doc);
  res.render("org", {
    doc: doc,
    title:doc.title,
    description:"test",
    theme:theme_config,
    config:global_config,
    site:db.data
  });
});

module.exports = router;
