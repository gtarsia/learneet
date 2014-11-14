import clientAjax = require("./client-ajax");
import PreviewableArticle = require("./templates/previewable-article");
import Gui = require("./gui");
import url = require("./../common/url");
import val = require("./../common/validation");

declare function marked(c: string);

export class EditArticleGui extends Gui {
    id: string = "-1";
    contentPreviewExample() {
        var content = "An h1 header\n============\n\nParagraphs are separated by a blank line.\n\n2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists\nlook like:\n\n  * this one\n  * that one\n  * the other one\n\nNote that --- not considering the asterisk --- the actual text\ncontent starts at 4-columns in.\n\n> Block quotes are\n> written like so.\n>\n> They can span multiple paragraphs,\n> if you like.\n\nUse 3 dashes for an em-dash. Use 2 dashes for ranges (ex., \"it's all\nin chapters 12--14\"). Three dots ... will be converted to an ellipsis.\nUnicode is supported. ☺\n\n\n\nAn h2 header\n------------\n\nHere's a numbered list:\n\n 1. first item\n 2. second item\n 3. third item\n\nNote again how the actual text starts at 4 columns in (4 characters\nfrom the left side). Here's a code sample:\n\n    # Let me re-iterate ...\n    for i in 1 .. 10 { do-something(i) }\n\nAs you probably guessed, indented 4 spaces. By the way, instead of\nindenting the block, you can use delimited blocks, if you like:\n\n~~~\ndefine foobar() {\n    print \"Welcome to flavor country!\";\n}\n~~~\n\n(which makes copying & pasting easier). You can optionally mark the\ndelimited block for Pandoc to syntax highlight it:\n\n~~~python\nimport time\n# Quick, count to ten!\nfor i in range(10):\n    # (but not *too* quick)\n    time.sleep(0.5)\n    print i\n~~~\n\n\n\n### An h3 header ###\n\nNow a nested list:\n\n 1. First, get these ingredients:\n\n      * carrots\n      * celery\n      * lentils\n\n 2. Boil some water.\n\n 3. Dump everything in the pot and follow\n    this algorithm:\n\n        find wooden spoon\n        uncover pot\n        stir\n        cover pot\n        balance wooden spoon precariously on pot handle\n        wait 10 minutes\n        goto first step (or shut off burner when done)\n\n    Do not bump wooden spoon or it will fall.\n\nNotice again how text always lines up on 4-space indents (including\nthat last line which continues item 3 above).\n\nHere's a link to [a website](http://foo.bar), to a [local\ndoc](local-doc.html), and to a [section heading in the current\ndoc](#an-h2-header). Here's a footnote [^1].\n\n[^1]: Footnote text goes here.\n\nTables can look like this:\n\nsize  material      color\n----  ------------  ------------\n9     leather       brown\n10    hemp canvas   natural\n11    glass         transparent\n\nTable: Shoes, their sizes, and what they're made of\n\n(The above is the caption for the table.) Pandoc also supports\nmulti-line tables:\n\n--------  -----------------------\nkeyword   text\n--------  -----------------------\nred       Sunsets, apples, and\n          other red or reddish\n          things.\n\ngreen     Leaves, grass, frogs\n          and other things it's\n          not easy being.\n--------  -----------------------\n\nA horizontal rule follows.\n\n***\n\nHere's a definition list:\n\napples\n  : Good for making applesauce.\noranges\n  : Citrus!\ntomatoes\n  : There's no \"e\" in tomatoe.\n\nAgain, text is indented 4 spaces. (Put a blank line between each\nterm/definition pair to spread things out more.)\n\nHere's a \"line block\":\n\n| Line one\n|   Line too\n| Line tree\n\nand images can be specified like so:\n\n![example image](example-image.jpg \"An exemplary image\")\n\nInline math equations go in like so: $\omega = d\phi / dt$. Display\nmath should get its own line and be put in in double-dollarsigns:\n\n$$I = \int \rho R^{2} dV$$\n\nAnd note that you can backslash-escape any punctuation characters\nwhich you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.';";
        $("textarea.article-content").html(content);
        $("div.article-content").html(marked(content));
    }
    titlePreviewExample() {
        var title = 'How to write markdown';
        $("input.article-title").val(title);
        $("h1.article-title").html(title);
    }
    query(s: string) {
        
    }
    removeDependency(jq) {
        var id = $(jq).siblings(this.dependencyIds.jq).val();
        clientAjax.article.remDependency({
            dependentId: this.id,
            dependencyId: id
        })
        .then(res => {
            if (res.result == true) {
                $(jq).parent(this.dependency.jq).remove();
            }
        });
    }
    saveBtn = { get jq() { return $('button#save') } };
    cancelBtn = { get jq() { return $('button#cancel') } };
    dependency;
    dependencyFound;
    addDependencyBtn;
    removeDependencyBtns;
    dependencyIds;
    article: PreviewableArticle;
    dependenciesTemplate;
    changesDescription;
    saveArticle() {
        var description = this.changesDescription.val;
        var its = val.version.changesDescription(description);
        if (!its.ok) {
            var api = this.changesDescription.jq.qtip({ // Grab some elements to apply the tooltip to
                content: { text: its.because },
                show: { when: false, ready: true },
                position: { my: 'top left', at: 'bottom center' },
                hide: false
            })
            setTimeout(api.qtip.bind(api, 'destroy'), 5000)
        }
        return;
        var article = this.article.article;
        clientAjax.article.update({
            article: {
                id: this.id, 
                title: article.title, 
                content: article.content
            },
            version: {
                changesDescription: this.changesDescription.val
            }
        })
        .done(function(res) {
            if (!res.ok) console.log(res.why);
            else console.log('Se actualizo el articulo');
            this.redirect(url.article.get(this.id)); 
        });
    }
    constructor() {
        super();
        var _self = this;
        $(document).ready(function() {
            _self.dependencyFound = _self.propertize("select#dependencyFound", 'val');
            _self.addDependencyBtn = _self.propertize("button#add");
            _self.dependenciesTemplate = _self.propertize("#dependencies-template");
            _self.removeDependencyBtns = _self.propertize(".removeDependency");
            _self.dependencyIds = _self.propertize(".dependencyId");
            _self.dependency = _self.propertize(".dependency")
            _self.changesDescription = _self.propertize("#changesDescription", "val")
            _self.article = new PreviewableArticle();
            _self.id = $("[type=hidden]#article-id").val();
            _self.dependencyFound.jq.selectize({
                create: false,
                valueField: 'id',
                labelField: 'title',
                searchField: 'title',
                load: function(query, callback) {
                    if (!query.length) return callback();
                    clientAjax.article.query({query: query})
                    .then(res => {
                        callback(res.result);
                    })
                },
                render: {
                    option: function(item, escape) {
                        return '<div>' +
                            '<span class="dependency">' +
                                '<span class="dependency-title">' + item.title + '</span>' +
                                '<span class="dependency-by"></span>' +
                            '</span>' +
                        '</div>';
                    }
                }
            });
            $(".selectize-control").attr("placeholder", "Type words contained in the article's title");
            clientAjax.article.get({ id: _self.id })
            .done(function(res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result
                _self.article.input.title.val = result.title;
                _self.article.input.content.val = result.content;
                _self.article.output.title.val = result.title;
                _self.article.output.content.val = marked(result.content);
            });
            clientAjax.article.getDependencies({ id: _self.id})
            .done(res => {
                var deps: any = res.result;
                var length = deps.length;
                for (var i = 0; i < length; i++) {
                    deps[i].url = url.article.get(deps[i].id);
                }
                var template = _self.dependenciesTemplate.jq.html();
                Mustache.parse(template);   // optional, speeds up future uses
                var rendered = Mustache.render(template, 
                    { deps: deps});
                _self.dependenciesTemplate.jq.after(rendered);
                _self.removeDependencyBtns.jq.on("click", () => {
                    var myThis = eval("this");
                    _self.removeDependency(myThis);
                })
            })
            _self.saveBtn.jq.click(() => {
                _self.saveArticle();
            });
            _self.cancelBtn.jq.click(() => {
                _self.redirect(url.article.get(_self.id));
            });
            _self.addDependencyBtn.jq.click(() => {
                var id = _self.dependencyFound.jq.val();
                if (id != "") {
                    clientAjax.article.addDependency({
                        dependentId: _self.id,
                        dependencyId: id
                    })
                    .then(res => {
                        console.log(res);
                    });
                }
            });
        });
    }
}


declare var guiName;
declare var gui;
if (guiName == 'EditArticleGui') {
    gui = new EditArticleGui();
}