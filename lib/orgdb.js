#!/bin/env node

var fs = require("fs"),
    walk = require("walk"),
    org = require("org"),
    exec = require("child_process").exec,
    cheerio = require("cheerio"),
    path = require("path");

(function(){
    function trim(s) {
        return s.replace(/(^\s*)|(\s*$)/g, "");
    }

    function getYear(d) {
        return d.substring(0, 4);
    }

    function getFullDate(d) {
        return d.substring(1, d.length - 1);
    }

    var OrgDB = function(){
        this.data = {
            categories: {},
            recent: [],
            orgs: {},
            tags: {},
            archives: [],
        };
        this.archives = {};
    }

    OrgDB.prototype.init = function(sources) {
        var walker = walk.walk(sources);
        var self = this;
        walker.on("file", function(root, fileStats, next){
            var filename = path.join(root, fileStats.name);
            if(path.extname(filename) == ".org"){
                console.log("[INFO] process: " + filename);
                self.genOrg(filename);
            }
            next();
        });

        walker.on("errors", function(root, erros, next){
            next();
        })

        walker.on("end", function(){
            console.log("Done!");
            self.save();
        })
    }

    OrgDB.prototype.save = function() {
        var keys = [];
        for(var i in this.archives) {
            keys.push(i);
            this.archives[i].sort(function(a, b) {return b.data > a.date});
        }
        keys.sort(function(a,b) {return b > a});
        for(var i = 0; i < keys.length; i++) {
            var tmp = {};
            tmp.year = keys[i];
            tmp.posts = this.archives[keys[i]];
            this.data.archives.push(tmp);
        }
        var postCount = 0;
        for(var i in this.data.archives) {
            var posts = this.data.archives[i].posts;
            for(var post in posts) {
                if(postCount >= 10)
                    break;
                this.data.recent.push(posts[post]);
                postCount ++;
            }
        }
        console.log(this.data);
    }

    OrgDB.prototype.genOrg = function(org_path) {
        var self = this;
        var data = fs.readFileSync(org_path);
        var doc = new org.Parser().parse(data.toString());
        doc.uri = org_path;
        var date = getFullDate(doc.directiveValues["date:"]);
        var year = getYear(date);
        var tags = doc.directiveValues["tags:"];
        var cat = org_path.split(path.sep)[1];
        doc = doc.convert(org.ConverterHTML, {});
        doc.date = date;
        if(!self.data.categories[cat])
            self.data.categories[cat] = [];
        self.data.categories[cat].push(doc);
        var data = self.archives[year] || [];
        self.data.orgs[org_path] = doc;
        doc.uri = org_path;
        data.push(doc);
        self.archives[year] = data;
        var trimed_tags = [];
        tags.split(',').forEach(function(tag){
            tag = trim(tag);
            trimed_tags.push(tag);
            if(!self.data.tags[tag])
                self.data.tags[tag] = [];
            self.data.tags[tag].push(doc);
        });
        doc.tags = trimed_tags;
        doc.category = cat;
    }
    module.exports = OrgDB;
})();
