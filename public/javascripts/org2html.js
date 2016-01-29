#!/usr/bin/env node

var org  = require("org"),
    walk = require("walk"),
    fs   = require('fs'),
    path = require('path');

(function(){
    tags_dict = {};
    cat_dict = {};
    date_dict = {};

    function parseAndOutputHTML() {
        var orgDocument = parser.parse(orgCode);
        var orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {});
        console.log(orgHTMLDocument.toString());
    }

    function genCats(uri) {
        var t = uri.split(path.sep);
        if(t.length == 3) {
            var cat = t[1];
            var arr = cat_dict[cat];
            if(!arr) {
                arr = [];
                cat_dict[cat] = arr;
            }
            arr.push(uri);
        }
    }

    function genTags(root, fileStat, next) {
        var uri = path.join(root,fileStat.name);
        console.log(fileStat.atime);
        if(path.extname(uri) == '.org') {
            genCats(uri);
            // 这里不能用readFile,最好还是用readFileSync
            var buffer = fs.readFileSync(path.resolve(root, fileStat.name));
            var doc = new org.Parser().parse(buffer.toString());
            var tags = doc.directiveValues["tags:"];
            if(tags.length > 0) {
                tags.split(',').forEach(function(t) {
                    var arr = tags_dict[t];
                    if(!arr) {
                        arr = [];
                        tags_dict[t] = arr;
                    }
                    arr.push(uri);
                });
            }
        }
        next();
    };

    module.exports = {
        org2html : function(worksrc) {
            walker = walk.walk(worksrc, { followLinks: true});
            walker.on("file", genTags);
            walker.on("errors", function(root, nodeStatesArray, next){
                nodeStatesArray.forEach(function(n){
                    console.error("[ERROR] " + n.name)
                    console.error(n.error.message || (n.error.code + ": " + n.error.path));
                });
                next();
            });
            walker.on("end", function(){
                console.log("All done!")
                console.log(tags_dict);
                console.log(cat_dict);
                fs.writeFileSync("db.json", JSON.stringify({tags:tags_dict, cats:cat_dict}));
            });
        }
    };
})();
