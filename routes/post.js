var express = require('express');
var router = express.Router();
var path = require('path');
var exec = require('child_process').exec;

/* GET home page. */
router.post('/', function(req, res) {
    console.log(req);
    try{
        var commits = req.body.head_commit;
        console.log(commits);
        var git_path = path.resolve('.');
        exec("cd " + git_path + "&& git pull origin master", function(err, stdout, stderr) {
            if(err) {
                res.send(err);
            }else {
                if(commits.removed.length) {
                    for(var i = 0; i < commits.removed.length; i++) {
                        var file = commits.removed[i];
                        if(file.match(/orgs\/.*.\w.org/)){
                            db.reload("orgs/");
                            return;
                        }
                    }
                };

                if(commits.modified.length) {
                    for(var i = 0; i < commits.modified.length; i++) {
                        var file = commits.modified[i];
                        if(file.match(/orgs\/.*.\w.org/)){
                            db.reload("orgs/");
                            return;
                        }
                    }
                };

                var added = commits.added;
                var flag = false;
                for(var i = 0; i < added.length; i++) {
                    if(added[i].match(/orgs\/.*.\w.org/)) {
                        db.add(added[i]);
                        flag = true;
                    }
                }
                if(flag) db.save();

                res.send(200);
            }
        })
    } catch(e) {
        res.send(e);
    }
});

module.exports = router;
