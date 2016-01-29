$(function () {
  String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
  }

  var $resultArea = $("#result");

  var orgParser = new Org.Parser();

  function getCode() {
    return $orgInputArea.val();
  }

  function setCode(code, updateView) {
    $orgInputArea.val(code);
    if (updateView)
      updateHTML();
  }

  function setHTMLFromCode(code, cat_path) {
    try {
      var orgDoc = orgParser.parse(code);
      var doc = orgDoc.convert(Org.ConverterHTML, {
        translateSymbolArrow: true
      });
      document.title = doc.title + " | Albin's Note";
      $("#content-title")[0].innerText = doc.title;
      $resultArea.html(doc.contentHTML);
      $("#text-table-of-contents").html(doc.tocHTML);
      table_update();

      var tags = orgDoc.tags;
      if(tags) {
        tags = tags.split(',');
        var tagsHtml = $("#dynamic-tags");
        var html = "";
        var cat;
        var t = cat_path.split('/');
        if(t.length >= 3) {
          cat = decodeURI(t[t.length - 2]);
          html += '<li><a href="/cats/'+ cat +'.html"><i class="fa fa-folder"></i>'+ cat +'</a></li>'

        }
        for(var i in tags) {
          var t = tags[i].trim();
          html += '<li><a href="/tags/' + t + '.html"><i class="fa fa-tags"></i>' + t + '</a></li>';
        }
        tagsHtml.html(html);
      }
    } catch (x) {
      $resultArea.empty();
      $resultArea.append($("<pre>").text(x));
      return;
    }
  }

  function updateHTML() {
    setHTMLFromCode(getCode());
    prettyPrint();
  }

  function updateIndex(data) {

  }

  var urlv = document.location.search.substr(1);
  urlv.split('&').forEach(function(kv){
    var vars = kv.split('=');
    var k = vars[0];
    var v = vars[1];
    switch(k) {
    case "org": {
      $.get(v, "", function(data){
        setHTMLFromCode(data, v);
        prettyPrint();
      })
      break;
    }
    case "cat": {
      break;
    }
    case "tag": {
      break;
    }
    default: {
      $.get("db.json", "", updateIndex);
      break;
    }
    }
  });
});
