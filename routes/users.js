var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:cat/:org', function(req, res) {
  var id = req.params.org;
  var cat =req.params.cat;
  console.log(db);
  var doc = db.data.orgs["orgs/" + cat + "/" + id];
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
