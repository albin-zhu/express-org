var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render("special", {
    doc: {title:global_config.title},
    theme: theme_config,
    config:global_config,
    site:db.data
  });
});

router.get('/jenes', function(req, res){
  res.render("jsnes", {
    doc: {title:"JSNES", date:"2016-03-11 五", uri:"/jsnes"},
    roms: roms
  })
});

module.exports = router;
