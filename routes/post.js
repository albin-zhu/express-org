var express = require('express');
var router = express.Router();
var path = require('path');
var exec = require('child_process').exec;

/* GET home page. */
router.post('/', function(req, res) {
    var commits = req.body.commits;
    var git_path = path.resolve('.');
    exec("cd " + git_path + "&& git pull origin master", function(err, stdout, stderr) {
        if(err) {
            res.send(err);
        }else {
            commits.added.forEach(function(file) {
                db.add(file);
            });

            commits.removed.forEach(function(){
                db.remove(file);
            });

            commits.modified.forEach(function(){
                db.mod(file);
            });
            res.send(200);
        }
    })
});

module.exports = router;
