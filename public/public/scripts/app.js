(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var clientAjax = require("./client-ajax");
var PreviewableArticle = require("./templates/previewable-article");
var Gui = require("./gui");

var validate = require('./../common/validate');

var AddProposalGui = (function (_super) {
    __extends(AddProposalGui, _super);
    function AddProposalGui() {
        _super.call(this);
        this.id = "-1";
        this.proposeBtn = this.propertize('button#propose');
        this.changesDescription = this.propertize("#changesDescription", "val");
        var _self = this;
        $(document).ready(function () {
            _self.changesDescription = _self.propertize("#changesDescription", "val");
            _self.article = new PreviewableArticle();
            _self.id = $("[type=hidden]#article-id").val();
            _self.article.fetchDBArticle({ id: _self.id }).then(function () {
                _self.oldStr = _self.article.input.content.val;
            });
            _self.proposeBtn.jq.click(function () {
                var description = _self.changesDescription.val;
                var its = validate.version.changesDescription(description);
                if (!its.ok) {
                    var api = _self.changesDescription.jq.qtip({
                        content: { text: its.because },
                        show: { when: false, ready: true },
                        position: { my: 'top left', at: 'bottom center' },
                        hide: false
                    });
                    setTimeout(api.qtip.bind(api, 'destroy'), 5000);
                    return;
                }
                clientAjax.proposal.add({ proposal: {
                        article: { id: _self.id },
                        description: _self.changesDescription.val,
                        modifiedContent: _self.article.input.content.val
                    } });
            });
        });
    }
    AddProposalGui.prototype.saveArticle = function () {
    };
    return AddProposalGui;
})(Gui);
exports.AddProposalGui = AddProposalGui;

if (guiName == 'AddProposalGui') {
    gui = new AddProposalGui();
}
//# sourceMappingURL=add-proposal-gui.js.map

},{"./../common/validate":20,"./client-ajax":4,"./gui":7,"./templates/previewable-article":15}],2:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var clientAjax = require("./client-ajax");

var RenderedArticle = require('./templates/rendered-article');
var Gui = require("./gui");
var url = require("./../common/url");
var Arrows = require('./utils/score-arrow');

var ArticleGui = (function (_super) {
    __extends(ArticleGui, _super);
    function ArticleGui() {
        _super.call(this);
        this.id = "-1";
        this.addProposalBtn = this.propertize("button#addProposal");
        this.viewProposalsBtn = this.propertize("button#viewProposals");
        var _self = this;
        $(document).ready(function () {
            _self.dependenciesTemplate = _self.propertize("#dependencies-template");
            _self.article = new RenderedArticle();
            _self.id = $("[type=hidden]#article-id").val();
            _self.articleScore = new Arrows.ArticleScore({
                up: 'input#up-score', down: 'input#down-score',
                score: 'div#article-score' }, { id: _self.id });
            clientAjax.article.get({ article: { id: _self.id } }).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                _self.article.title.val = result.title;
                _self.article.content.val = marked(result.content);
            });

            return;
            clientAjax.article.getDependencies({
                article: { id: _self.id }
            }).done(function (res) {
                var deps = res.result;
                var length = deps.length;
                for (var i = 0; i < length; i++) {
                    deps[i].url = url.article.get(deps[i].id);
                }
                var template = _self.dependenciesTemplate.jq.html();
                Mustache.parse(template);
                var rendered = Mustache.render(template, { deps: deps });
                _self.dependenciesTemplate.jq.after(rendered);
            });
        });
    }
    ArticleGui.prototype.getEditBtn = function () {
        return $("#editBtn");
    };
    return ArticleGui;
})(Gui);
exports.ArticleGui = ArticleGui;

if (guiName == 'ArticleGui') {
    gui = new ArticleGui();
}
//# sourceMappingURL=article-gui.js.map

},{"./../common/url":19,"./client-ajax":4,"./gui":7,"./templates/rendered-article":16,"./utils/score-arrow":17}],3:[function(require,module,exports){
//# sourceMappingURL=browse-gui.js.map

},{}],4:[function(require,module,exports){
var baseAjax = require('./../common/base-ajax');
var AjaxType = baseAjax.AjaxType;

function buildAjax(url, type, params) {
    var obj = { p: JSON.stringify(params) };
    switch (type) {
        case AjaxType.GET:
            return $.get(url, obj);
            break;
        case AjaxType.POST:
            return $.post(url, obj);
            break;
    }
}
exports.buildAjax = buildAjax;

function buildIAjax(ajax, params) {
    return exports.buildAjax(ajax.url(), ajax.type(), params);
}
exports.buildIAjax = buildIAjax;

(function (article) {
    var _get = baseAjax.article.get;
    function get(params) {
        return exports.buildAjax(_get.url(), _get.type(), params);
    }
    article.get = get;

    var _create = baseAjax.article.create;
    function create(params) {
        return exports.buildIAjax(new _create.Ajax(), params);
    }
    article.create = create;

    var _getAll = baseAjax.article.getAll;
    function getAll(params) {
        return exports.buildAjax(_getAll.url(), _getAll.type(), params);
    }
    article.getAll = getAll;

    var _update = baseAjax.article.update;
    function update(params) {
        return exports.buildAjax(_update.url(), _update.type(), params);
    }
    article.update = update;

    var _query = baseAjax.article.queryTitle;
    function query(params) {
        return exports.buildAjax(_query.url(), _query.type(), params);
    }
    article.query = query;

    var _addDep = baseAjax.article.addDependency;
    function addDependency(params) {
        return exports.buildAjax(_addDep.url(), _addDep.type(), params);
    }
    article.addDependency = addDependency;

    var _getDeps = baseAjax.article.getDependencies;
    function getDependencies(params) {
        return exports.buildAjax(_getDeps.url(), _getDeps.type(), params);
    }
    article.getDependencies = getDependencies;

    var _RemDep = baseAjax.article.remDependency;
    function remDependency(params) {
        return exports.buildAjax(_RemDep.url(), _RemDep.type(), params);
    }
    article.remDependency = remDependency;

    var _getScore = baseAjax.article.getScore;
    function getScore(params) {
        return exports.buildAjax(_getScore.url(), _getScore.type(), params);
    }
    article.getScore = getScore;

    var _getScoreByUser = baseAjax.article.getScoreByUser;
    function getScoreByUser(params) {
        return exports.buildAjax(_getScoreByUser.url(), _getScoreByUser.type(), params);
    }
    article.getScoreByUser = getScoreByUser;

    var _UpScore = baseAjax.article.upScore;
    function upScore(params) {
        return exports.buildAjax(_UpScore.url(), _UpScore.type(), params);
    }
    article.upScore = upScore;

    var _DownScore = baseAjax.article.downScore;
    function downScore(params) {
        return exports.buildAjax(_DownScore.url(), _DownScore.type(), params);
    }
    article.downScore = downScore;
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (proposal) {
    var _AddProp = baseAjax.proposal.add;
    function add(params) {
        return exports.buildAjax(_AddProp.url(), _AddProp.type(), params);
    }
    proposal.add = add;

    var _getAll = baseAjax.proposal.getAll;
    function getAll(params) {
        return exports.buildAjax(_getAll.url(), _getAll.type(), params);
    }
    proposal.getAll = getAll;
})(exports.proposal || (exports.proposal = {}));
var proposal = exports.proposal;

(function (user) {
    var _Register = baseAjax.user.register;
    function register(params) {
        return exports.buildAjax(_Register.url(), _Register.type(), params);
    }
    user.register = register;

    var _Auth = baseAjax.user.auth;
    function auth(params) {
        return exports.buildAjax(_Auth.url(), _Auth.type(), params);
    }
    user.auth = auth;
})(exports.user || (exports.user = {}));
var user = exports.user;
//# sourceMappingURL=client-ajax.js.map

},{"./../common/base-ajax":18}],5:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var clientAjax = require("./client-ajax");
var PreviewableArticle = require("./templates/previewable-article");
var Gui = require("./gui");
var url = require("./../common/url");

var CreateArticleGui = (function (_super) {
    __extends(CreateArticleGui, _super);
    function CreateArticleGui() {
        _super.call(this);
        var _self = this;
        $(document).ready(function () {
            _self.previewArticle = new PreviewableArticle();
            _self.previewArticle.input.content.val = _self.contentPreviewExample();
            _self.previewArticle.input.title.val = _self.titlePreviewExample();
            $("#create").click(function () {
                debugger;
                console.log('Trying to create: ');
                var article = _self.previewArticle.article;
                console.log(article);
                clientAjax.article.create(article).done(function (res) {
                    var id = res.result.id;
                    _self.redirect(url.article.get(id));
                });
            });
        });
    }
    CreateArticleGui.prototype.contentPreviewExample = function () {
        return "An h1 header\n============\n\nParagraphs are separated by a blank line.\n\n2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists\nlook like:\n\n  * this one\n  * that one\n  * the other one\n\nNote that --- not considering the asterisk --- the actual text\ncontent starts at 4-columns in.\n\n> Block quotes are\n> written like so.\n>\n> They can span multiple paragraphs,\n> if you like.\n\nUse 3 dashes for an em-dash. Use 2 dashes for ranges (ex., \"it's all\nin chapters 12--14\"). Three dots ... will be converted to an ellipsis.\nUnicode is supported. ☺\n\n\n\nAn h2 header\n------------\n\nHere's a numbered list:\n\n 1. first item\n 2. second item\n 3. third item\n\nNote again how the actual text starts at 4 columns in (4 characters\nfrom the left side). Here's a code sample:\n\n    # Let me re-iterate ...\n    for i in 1 .. 10 { do-something(i) }\n\nAs you probably guessed, indented 4 spaces. By the way, instead of\nindenting the block, you can use delimited blocks, if you like:\n\n~~~\ndefine foobar() {\n    print \"Welcome to flavor country!\";\n}\n~~~\n\n(which makes copying & pasting easier). You can optionally mark the\ndelimited block for Pandoc to syntax highlight it:\n\n~~~python\nimport time\n# Quick, count to ten!\nfor i in range(10):\n    # (but not *too* quick)\n    time.sleep(0.5)\n    print i\n~~~\n\n\n\n### An h3 header ###\n\nNow a nested list:\n\n 1. First, get these ingredients:\n\n      * carrots\n      * celery\n      * lentils\n\n 2. Boil some water.\n\n 3. Dump everything in the pot and follow\n    this algorithm:\n\n        find wooden spoon\n        uncover pot\n        stir\n        cover pot\n        balance wooden spoon precariously on pot handle\n        wait 10 minutes\n        goto first step (or shut off burner when done)\n\n    Do not bump wooden spoon or it will fall.\n\nNotice again how text always lines up on 4-space indents (including\nthat last line which continues item 3 above).\n\nHere's a link to [a website](http://foo.bar), to a [local\ndoc](local-doc.html), and to a [section heading in the current\ndoc](#an-h2-header). Here's a footnote [^1].\n\n[^1]: Footnote text goes here.\n\nTables can look like this:\n\nsize  material      color\n----  ------------  ------------\n9     leather       brown\n10    hemp canvas   natural\n11    glass         transparent\n\nTable: Shoes, their sizes, and what they're made of\n\n(The above is the caption for the table.) Pandoc also supports\nmulti-line tables:\n\n--------  -----------------------\nkeyword   text\n--------  -----------------------\nred       Sunsets, apples, and\n          other red or reddish\n          things.\n\ngreen     Leaves, grass, frogs\n          and other things it's\n          not easy being.\n--------  -----------------------\n\nA horizontal rule follows.\n\n***\n\nHere's a definition list:\n\napples\n  : Good for making applesauce.\noranges\n  : Citrus!\ntomatoes\n  : There's no \"e\" in tomatoe.\n\nAgain, text is indented 4 spaces. (Put a blank line between each\nterm/definition pair to spread things out more.)\n\nHere's a \"line block\":\n\n| Line one\n|   Line too\n| Line tree\n\nand images can be specified like so:\n\n![example image](http://upload.wikimedia.org/wikipedia/commons/a/a9/Example.jpg \"An exemplary image\")\n\nInline math equations go in like so: $\omega = d\phi / dt$. Display\nmath should get its own line and be put in in double-dollarsigns:\n\n$$I = \int \rho R^{2} dV$$\n\nAnd note that you can backslash-escape any punctuation characters\nwhich you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.';";
    };
    CreateArticleGui.prototype.titlePreviewExample = function () {
        return 'How to write markdown';
    };
    return CreateArticleGui;
})(Gui);

if (guiName == 'CreateArticleGui') {
    gui = new CreateArticleGui();
}
//# sourceMappingURL=create-article-gui.js.map

},{"./../common/url":19,"./client-ajax":4,"./gui":7,"./templates/previewable-article":15}],6:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var clientAjax = require("./client-ajax");
var PreviewableArticle = require("./templates/previewable-article");
var Gui = require("./gui");
var url = require("./../common/url");
var validate = require("./../common/validate");
var baseAjax = require("./../common/base-ajax");

var EditArticleGui = (function (_super) {
    __extends(EditArticleGui, _super);
    function EditArticleGui() {
        _super.call(this);
        this.id = "-1";
        this.saveBtn = { get jq() {
                return $('button#save');
            } };
        this.cancelBtn = { get jq() {
                return $('button#cancel');
            } };
        var _self = this;
        $(document).ready(function () {
            _self.dependencyFound = _self.propertize("select#dependencyFound", 'val');
            _self.addDependencyBtn = _self.propertize("button#add");
            _self.dependenciesTemplate = _self.propertize("#dependencies-template");
            _self.removeDependencyBtns = _self.propertize(".removeDependency");
            _self.dependencyIds = _self.propertize(".dependencyId");
            _self.dependency = _self.propertize(".dependency");
            _self.changesDescription = _self.propertize("#changesDescription", "val");
            _self.article = new PreviewableArticle();
            _self.id = $("[type=hidden]#article-id").val();
            _self.dependencyFound.jq.selectize({
                create: false,
                valueField: 'id',
                labelField: 'title',
                searchField: 'title',
                load: function (query, callback) {
                    if (!query.length)
                        return callback();
                    clientAjax.article.query({ query: query }).then(function (res) {
                        callback(res.result);
                    });
                },
                render: {
                    option: function (item, escape) {
                        return '<div>' + '<span class="dependency">' + '<span class="dependency-title">' + item.title + '</span>' + '<span class="dependency-by"></span>' + '</span>' + '</div>';
                    }
                }
            });
            $(".selectize-control").attr("placeholder", "Type words contained in the article's title");
            clientAjax.article.get({ article: { id: _self.id } }).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                _self.article.input.title.val = result.title;
                _self.article.input.content.val = result.content;
                _self.article.output.title.val = result.title;
                _self.article.output.content.val = marked(result.content);
            });
            clientAjax.article.getDependencies({ article: { id: _self.id } }).done(function (res) {
                var deps = res.result;
                var length = deps.length;
                for (var i = 0; i < length; i++) {
                    deps[i].url = url.article.get(deps[i].id);
                }
                var template = _self.dependenciesTemplate.jq.html();
                Mustache.parse(template);
                var rendered = Mustache.render(template, { deps: deps });
                _self.dependenciesTemplate.jq.after(rendered);
                _self.removeDependencyBtns.jq.on("click", function () {
                    var myThis = eval("this");
                    _self.removeDependency(myThis);
                });
            });
            _self.saveBtn.jq.click(function () {
                _self.saveArticle();
            });
            _self.cancelBtn.jq.click(function () {
                _self.redirect(url.article.get(_self.id));
            });
            _self.addDependencyBtn.jq.click(function () {
                var id = _self.dependencyFound.jq.val();
                if (id != "") {
                    clientAjax.article.addDependency({
                        dependent: { id: _self.id },
                        dependency: { id: id }
                    }).then(function (res) {
                        console.log(res);
                    });
                }
            });
        });
    }
    EditArticleGui.prototype.contentPreviewExample = function () {
        var content = "An h1 header\n============\n\nParagraphs are separated by a blank line.\n\n2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists\nlook like:\n\n  * this one\n  * that one\n  * the other one\n\nNote that --- not considering the asterisk --- the actual text\ncontent starts at 4-columns in.\n\n> Block quotes are\n> written like so.\n>\n> They can span multiple paragraphs,\n> if you like.\n\nUse 3 dashes for an em-dash. Use 2 dashes for ranges (ex., \"it's all\nin chapters 12--14\"). Three dots ... will be converted to an ellipsis.\nUnicode is supported. ☺\n\n\n\nAn h2 header\n------------\n\nHere's a numbered list:\n\n 1. first item\n 2. second item\n 3. third item\n\nNote again how the actual text starts at 4 columns in (4 characters\nfrom the left side). Here's a code sample:\n\n    # Let me re-iterate ...\n    for i in 1 .. 10 { do-something(i) }\n\nAs you probably guessed, indented 4 spaces. By the way, instead of\nindenting the block, you can use delimited blocks, if you like:\n\n~~~\ndefine foobar() {\n    print \"Welcome to flavor country!\";\n}\n~~~\n\n(which makes copying & pasting easier). You can optionally mark the\ndelimited block for Pandoc to syntax highlight it:\n\n~~~python\nimport time\n# Quick, count to ten!\nfor i in range(10):\n    # (but not *too* quick)\n    time.sleep(0.5)\n    print i\n~~~\n\n\n\n### An h3 header ###\n\nNow a nested list:\n\n 1. First, get these ingredients:\n\n      * carrots\n      * celery\n      * lentils\n\n 2. Boil some water.\n\n 3. Dump everything in the pot and follow\n    this algorithm:\n\n        find wooden spoon\n        uncover pot\n        stir\n        cover pot\n        balance wooden spoon precariously on pot handle\n        wait 10 minutes\n        goto first step (or shut off burner when done)\n\n    Do not bump wooden spoon or it will fall.\n\nNotice again how text always lines up on 4-space indents (including\nthat last line which continues item 3 above).\n\nHere's a link to [a website](http://foo.bar), to a [local\ndoc](local-doc.html), and to a [section heading in the current\ndoc](#an-h2-header). Here's a footnote [^1].\n\n[^1]: Footnote text goes here.\n\nTables can look like this:\n\nsize  material      color\n----  ------------  ------------\n9     leather       brown\n10    hemp canvas   natural\n11    glass         transparent\n\nTable: Shoes, their sizes, and what they're made of\n\n(The above is the caption for the table.) Pandoc also supports\nmulti-line tables:\n\n--------  -----------------------\nkeyword   text\n--------  -----------------------\nred       Sunsets, apples, and\n          other red or reddish\n          things.\n\ngreen     Leaves, grass, frogs\n          and other things it's\n          not easy being.\n--------  -----------------------\n\nA horizontal rule follows.\n\n***\n\nHere's a definition list:\n\napples\n  : Good for making applesauce.\noranges\n  : Citrus!\ntomatoes\n  : There's no \"e\" in tomatoe.\n\nAgain, text is indented 4 spaces. (Put a blank line between each\nterm/definition pair to spread things out more.)\n\nHere's a \"line block\":\n\n| Line one\n|   Line too\n| Line tree\n\nand images can be specified like so:\n\n![example image](example-image.jpg \"An exemplary image\")\n\nInline math equations go in like so: $\omega = d\phi / dt$. Display\nmath should get its own line and be put in in double-dollarsigns:\n\n$$I = \int \rho R^{2} dV$$\n\nAnd note that you can backslash-escape any punctuation characters\nwhich you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.';";
        $("textarea.article-content").html(content);
        $("div.article-content").html(marked(content));
    };
    EditArticleGui.prototype.titlePreviewExample = function () {
        var title = 'How to write markdown';
        $("input.article-title").val(title);
        $("h1.article-title").html(title);
    };
    EditArticleGui.prototype.query = function (s) {
    };
    EditArticleGui.prototype.removeDependency = function (jq) {
        var _this = this;
        var id = $(jq).siblings(this.dependencyIds.jq).val();
        clientAjax.article.remDependency({
            dependent: { id: this.id },
            dependency: { id: id }
        }).then(function (res) {
            if (res.result == true) {
                $(jq).parent(_this.dependency.jq).remove();
            }
        });
    };

    EditArticleGui.prototype.saveArticle = function () {
        var description = this.changesDescription.val;
        var its = validate.version.changesDescription(description);
        if (!its.ok) {
            var api = this.changesDescription.jq.qtip({
                content: { text: its.because },
                show: { when: false, ready: true },
                position: { my: 'top left', at: 'bottom center' },
                hide: false
            });
            setTimeout(api.qtip.bind(api, 'destroy'), 5000);
        }
        var article = baseAjax.article.WrapFieldWithId(this.article.article, this.id);
        clientAjax.article.update(article).done(function (res) {
            if (!res.ok)
                console.log(res.why);
            else
                console.log('Se actualizo el articulo');
            this.redirect(url.article.get(this.id));
        });
    };
    return EditArticleGui;
})(Gui);
exports.EditArticleGui = EditArticleGui;

if (guiName == 'EditArticleGui') {
    gui = new EditArticleGui();
}
//# sourceMappingURL=edit-article-gui.js.map

},{"./../common/base-ajax":18,"./../common/url":19,"./../common/validate":20,"./client-ajax":4,"./gui":7,"./templates/previewable-article":15}],7:[function(require,module,exports){
var ClientAjax = require('./client-ajax');

clientAjax = ClientAjax;

var Gui = (function () {
    function Gui() {
        $(document).ready(function () {
            $('#main').find('button').velocity({ opacity: 0 }, { duration: 0 });
            $('#main').find('button').velocity({ opacity: 1 }, { duration: 500 });
        });
    }
    Gui.prototype.redirect = function (view) {
        window.location.href = view;
    };
    Gui.prototype.propertize = function (selector, valFnName) {
        var obj = {
            get jq() {
                return $(selector);
            },
            get selector() {
                return selector;
            }
        };
        if (valFnName != '')
            Object.defineProperty(obj, "val", {
                get: function () {
                    return obj.jq[valFnName]();
                },
                set: function (val) {
                    obj.jq[valFnName](val);
                }
            });
        return obj;
    };
    return Gui;
})();

module.exports = Gui;
//# sourceMappingURL=gui.js.map

},{"./client-ajax":4}],8:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var clientAjax = require("./client-ajax");

var url = require("./../common/url");
var Gui = require("./gui");

var IndexGui = (function (_super) {
    __extends(IndexGui, _super);
    function IndexGui() {
        _super.call(this);
        var _self = this;
        $(document).ready(function () {
            _self.createBtn = _self.propertize("#create");
            clientAjax.article.getAll({}).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var articles = res.result;
                var length = articles.length;
                for (var i = 0; i < length; i++) {
                    articles[i].url = url.article.get(articles[i].id);
                    articles[i].content = articles[i].content.substr(0, 130) + '...';
                }
                var template = $("#article-thumb-template").html();
                Mustache.parse(template);
                var rendered = Mustache.render(template, { articles: articles });
                $("#article-thumb-template").after(rendered);
                $('.article-thumb').velocity({ opacity: 0 }, { duration: 0 });
                $.each($('.article-thumb'), function (i, el) {
                    setTimeout(function () {
                        $(el).velocity({
                            opacity: 1.0, translateX: '100px'
                        }, 250);
                    }, (i * 100));
                });
            });
            _self.createBtn.jq.click(function () {
                _self.redirect(url.article.create());
            });
        });
    }
    IndexGui.prototype.setThumbs = function (html) {
    };
    IndexGui.prototype.buildArticleThumbsTemplate = function (articles) {
        return articles.toString();
    };
    return IndexGui;
})(Gui);

if (guiName == 'IndexGui') {
    gui = new IndexGui();
}
//# sourceMappingURL=index-gui.js.map

},{"./../common/url":19,"./client-ajax":4,"./gui":7}],9:[function(require,module,exports){
var parser = require("./parser");

exports.previousNumberOfLines = 0;

function getSourceDom(id) {
    return $("#" + id)[0];
}

function reparse(sourceId, targetId) {
    var source = $("#" + source)[0];
    var lines = source.value.split("\n");
    var length = lines.length;
    for (var i = 0; i < length; i++) {
        parser.parseToDiv(lines[i], i, targetId);
    }
    return length;
}

function parseLine(currentLine, lineNumber, targetId) {
    parser.parseToDiv(currentLine, lineNumber, targetId);
}

function bind(sourceId, targetId) {
    reparse(sourceId, targetId);
    $('#source').bind('input propertychange', function () {
        var source = $("#" + sourceId);
        var lines = source.value.split("\n");
        var length = lines.length;
        if (length - exports.previousNumberOfLines != 0) {
            console.log('Number of lines changed');
            console.log('Length ' + length + 'vs previous ' + exports.previousNumberOfLines);
            reparse(sourceId, targetId);
            return;
        }
        var sourceTilCursor = source.value.substr(0, source.selectionStart);
        var lineNumber = sourceTilCursor.split("\n").length - 1;
        var currentLine = lines[lineNumber];
        parseLine(currentLine, lineNumber, targetId);
    });
}
exports.bind = bind;
//# sourceMappingURL=live-parser.js.map

},{"./parser":11}],10:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./gui');
var clientAjax = require('./client-ajax');

var LogInGui = (function (_super) {
    __extends(LogInGui, _super);
    function LogInGui() {
        _super.call(this);
        var _self = this;
        _self.loginBtn = _self.propertize('button#login');
        _self.username = _self.propertize('input#username', 'val');
        _self.password = _self.propertize('input#password', 'val');
        _self.form = _self.propertize('form.form-inner');
        $(document).ready(function () {
            _self.username.jq.focus();
            _self.form.jq.submit(function (event) {
                event.preventDefault();
                var user = _self.getUser();
                clientAjax.user.auth(user).done(function (res) {
                    console.log('Logged in');
                    _self.redirect('/');
                }).fail(function (res) {
                    console.log('Couldn\'t log');
                });
            });
        });
    }
    LogInGui.prototype.getUser = function () {
        return {
            username: this.username.val,
            password: this.password.val
        };
    };
    return LogInGui;
})(Gui);

if (guiName == 'LogInGui') {
    gui = new LogInGui();
}
//# sourceMappingURL=login-gui.js.map

},{"./client-ajax":4,"./gui":7}],11:[function(require,module,exports){
function writeLineDiv(html, number, targetId) {
    var div = $('#line' + number);
    if (!(div.length)) {
        $("#" + targetId).append("<div id='line" + number + "'></div>");
    }
    $("#line" + number).html(html);
}
exports.writeLineDiv = writeLineDiv;

function translateLine(line) {
    var html = "";
    if (line.substr(0, 7) == '@katex ') {
        line = line.substr(7);
        html = katex.renderToString("\\displaystyle " + line);
    } else {
        html = line;
    }
    return html;
}
exports.translateLine = translateLine;

function parseToDiv(line, lineNumber, targetId) {
    var html = exports.translateLine(line);
    exports.writeLineDiv(html, lineNumber, targetId);
}
exports.parseToDiv = parseToDiv;
//# sourceMappingURL=parser.js.map

},{}],12:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var clientAjax = require("./client-ajax");

var Gui = require("./gui");
var url = require("./../common/url");

var ProposalsGui = (function (_super) {
    __extends(ProposalsGui, _super);
    function ProposalsGui() {
        _super.call(this);
        this.id = "-1";
        this.proposalsTemplate = this.propertize("#proposals-template");
        this.acceptBtns = this.propertize(".acceptBtn");
        this.rejectBtns = this.propertize(".rejeectBtn");
        var _self = this;
        $(document).ready(function () {
            _self.id = $("[type=hidden]#article-id").val();
            clientAjax.proposal.getAll({
                proposal: {
                    article: { id: _self.id }
                }
            }).done(function (res) {
                var proposals = res.result.proposals;
                var length = proposals.length;
                for (var i = 0; i < length; i++) {
                    proposals[i].url = url.article.get(proposals[i].id);
                }
                var template = _self.proposalsTemplate.jq.html();
                Mustache.parse(template);
                var rendered = Mustache.render(template, { props: proposals });
                _self.proposalsTemplate.jq.after(rendered);
            });
            _self.acceptBtns.jq.click(function () {
                console.log("rejected");
            });
            _self.rejectBtns.jq.click(function () {
                console.log("accepted");
            });
        });
    }
    return ProposalsGui;
})(Gui);
exports.ProposalsGui = ProposalsGui;

if (guiName == 'ProposalsGui') {
    gui = new ProposalsGui();
}
//# sourceMappingURL=proposals-gui.js.map

},{"./../common/url":19,"./client-ajax":4,"./gui":7}],13:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./gui');
var clientAjax = require('./client-ajax');

var RegisterGui = (function (_super) {
    __extends(RegisterGui, _super);
    function RegisterGui() {
        _super.call(this);
        var _self = this;
        _self.registerBtn = _self.propertize('button#register');
        _self.username = _self.propertize('input#username', 'val');
        _self.password = _self.propertize('input#password', 'val');
        _self.email = _self.propertize('input#email', 'val');
        _self.form = _self.propertize('form.form-inner');
        $(document).ready(function () {
            _self.username.jq.focus();
            _self.form.jq.submit(function (event) {
                event.preventDefault();
                var user = _self.getUser();
                clientAjax.user.register(user).done(function (res) {
                    if (!res.ok) {
                        console.log('Couldn\'t register because ' + res.why);
                        return;
                    }
                    _self.redirect('/');
                });
            });
        });
    }
    RegisterGui.prototype.validateUsername = function () {
    };
    RegisterGui.prototype.validate = function () {
    };
    RegisterGui.prototype.getUser = function () {
        return {
            username: this.username.val,
            password: this.password.val,
            email: this.email.val
        };
    };
    return RegisterGui;
})(Gui);

if (guiName == 'RegisterGui') {
    gui = new RegisterGui();
}
//# sourceMappingURL=register-gui.js.map

},{"./client-ajax":4,"./gui":7}],14:[function(require,module,exports){
var EditableArticle = (function () {
    function EditableArticle() {
        var _self = this;
        this.content = {
            get jq() {
                return $("textarea.article-content");
            },
            get val() {
                return _self.content.jq.val();
            },
            set val(val) {
                _self.content.jq.val(val);
            }
        };
        this.title = {
            get jq() {
                return $("input.article-title");
            },
            get val() {
                return _self.title.jq.val();
            },
            set val(val) {
                _self.title.jq.val(val);
            }
        };
    }
    Object.defineProperty(EditableArticle.prototype, "article", {
        get: function () {
            return { article: { title: this.title.val, content: this.content.val } };
        },
        enumerable: true,
        configurable: true
    });
    return EditableArticle;
})();

module.exports = EditableArticle;
//# sourceMappingURL=editable-article.js.map

},{}],15:[function(require,module,exports){
var RenderedArticle = require('./rendered-article');
var EditableArticle = require("./editable-article");
var clientAjax = require(".././client-ajax");

var PreviewableArticle = (function () {
    function PreviewableArticle() {
        this.input = new EditableArticle();
        this.output = new RenderedArticle();
        this.ignoreScroll = false;
        this.bindTitlePreview();
        this.bindContentPreview();
        this.bindScrolls();
    }
    Object.defineProperty(PreviewableArticle.prototype, "article", {
        get: function () {
            return this.input.article;
        },
        enumerable: true,
        configurable: true
    });
    PreviewableArticle.prototype.bindScrolls = function () {
        var _self = this;
        function getPercent(el) {
            return 100 * el.scrollTop() / (el[0].scrollHeight - el.height());
        }
        function setPercent(el, percent) {
            el.scrollTop((el[0].scrollHeight - el.height()) * percent / 100);
        }
        function bindScroll(src, dest) {
            src.scroll(function () {
                if (_self.ignoreScroll) {
                    _self.ignoreScroll = false;
                    return;
                }
                _self.ignoreScroll = true;
                setPercent(dest, getPercent(src));
            });
        }
        _self.input.content.jq.bind("change keyup mouseup", function () {
            var line = this.value.substr(0, this.selectionStart).split("\n").length - 1;
            _self.output.scroll(line);
            console.log(line);
        });
    };

    PreviewableArticle.prototype.bindTitlePreview = function () {
        var inputTitle = this.input.title;
        var outputTitle = this.output.title;
        inputTitle.jq.keyup(function (e) {
            var title = inputTitle.val;
            outputTitle.val = title;
        });
    };
    PreviewableArticle.prototype.translateWithParsing = function (content) {
        var output = '';
        var occurenceIndex = 0;
        var openKatex = false;
        var startIndex = 0;
        var length = content.length;
        while (occurenceIndex != -1 && startIndex < length) {
            occurenceIndex = content.indexOf('$$', startIndex);

            var endIndex = (occurenceIndex == -1 ? length : occurenceIndex);

            var section = content.substring(startIndex, endIndex);

            if (openKatex)
                section = katex.renderToString("\\displaystyle {" + section + "}");

            output += section;

            startIndex = endIndex + 2;

            if (occurenceIndex != -1) {
                openKatex = !openKatex;
            }
        }
        return output;
    };
    PreviewableArticle.prototype.bindContentPreview = function () {
        var _self = this;
        var inputContent = this.input.content;
        var outputContent = this.output.content;
        inputContent.jq.keyup(function (e) {
            var content = inputContent.val;
            content = _self.translateWithParsing(content);

            outputContent.val = marked(content);
        });
    };
    PreviewableArticle.prototype.fetchDBArticle = function (args) {
        var _self = this;
        return clientAjax.article.get({ article: args }).then(function (res) {
            if (!res.ok) {
                console.log(res.why);
                return;
            }
            var result = res.result;
            _self.input.title.val = result.title;
            _self.input.content.val = result.content;
            _self.output.title.val = result.title;
            _self.output.content.val = marked(result.content);
            return null;
        });
    };
    return PreviewableArticle;
})();

module.exports = PreviewableArticle;
//# sourceMappingURL=previewable-article.js.map

},{".././client-ajax":4,"./editable-article":14,"./rendered-article":16}],16:[function(require,module,exports){
var RenderedArticle = (function () {
    function RenderedArticle() {
        var _self = this;
        this.content = {
            get jq() {
                return $("div.article-content");
            },
            get val() {
                return _self.content.jq.html();
            },
            set val(val) {
                _self.content.jq.html(val);
            }
        };
        this.title = {
            get jq() {
                return $("h1.article-title");
            },
            get val() {
                return _self.title.jq.html();
            },
            set val(val) {
                _self.title.jq.html(val);
            }
        };
    }
    RenderedArticle.prototype.scroll = function (line) {
        var outputLine = $(".line" + line);
        if (outputLine.length) {
            $(".selected").removeClass("selected");
            outputLine.addClass("selected");
            this.content.jq.scrollTop((this.content.jq.scrollTop() - this.content.jq.offset().top) + outputLine.offset().top - this.content.jq.height() / 2);
        }
    };
    return RenderedArticle;
})();

module.exports = RenderedArticle;
//# sourceMappingURL=rendered-article.js.map

},{}],17:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./../gui');
var clientAjax = require('./../client-ajax');

var ScoreArrow = (function (_super) {
    __extends(ScoreArrow, _super);
    function ScoreArrow(arrowSelector, offImageUrl, onImageUrl) {
        _super.call(this);
        this.isTurnedOn = false;
        this.arrow = this.propertize(arrowSelector);
        this.offImageUrl = offImageUrl;
        this.onImageUrl = onImageUrl;
    }
    ScoreArrow.prototype.changeImage = function (url) {
        var _self = this;
        _self.arrow.jq.attr('src', url);
    };
    ScoreArrow.prototype.toggle = function () {
        if (this.isTurnedOn)
            this.turnOff();
        else
            this.turnOn();
    };
    ScoreArrow.prototype.turnOff = function () {
        this.isTurnedOn = false;
        this.changeImage(this.offImageUrl);
    };
    ScoreArrow.prototype.turnOn = function () {
        this.isTurnedOn = true;
        this.changeImage(this.onImageUrl);
    };
    return ScoreArrow;
})(Gui);
exports.ScoreArrow = ScoreArrow;

var upScore = (function (_super) {
    __extends(upScore, _super);
    function upScore(arrowSelector) {
        _super.call(this, arrowSelector, '/images/up-score.png', '/images/up-score-hover.png');
    }
    return upScore;
})(ScoreArrow);
exports.upScore = upScore;

var downScore = (function (_super) {
    __extends(downScore, _super);
    function downScore(arrowSelector) {
        _super.call(this, arrowSelector, '/images/down-score.png', '/images/down-score-hover.png');
    }
    return downScore;
})(ScoreArrow);
exports.downScore = downScore;

var Score = (function (_super) {
    __extends(Score, _super);
    function Score(selector) {
        _super.call(this);
        this.score = this.propertize(selector, 'html');
    }
    Score.prototype.set = function (args) {
        this.score.val = args.article.score;
    };
    return Score;
})(Gui);
exports.Score = Score;

var ArticleScore = (function () {
    function ArticleScore(selectors, article) {
        var _self = this;
        this.article = article;
        this.upScore = new upScore(selectors.up);
        this.downScore = new downScore(selectors.down);
        this.score = new Score(selectors.score);
        this.upScore.arrow.jq.click(function () {
            if (_self.downScore.isTurnedOn && !_self.upScore.isTurnedOn)
                _self.downScore.turnOff();
            _self.upScore.toggle();
        });
        this.downScore.arrow.jq.click(function () {
            if (_self.upScore.isTurnedOn && !_self.downScore.isTurnedOn)
                _self.upScore.turnOff();
            _self.downScore.toggle();
        });
        clientAjax.article.getScore({
            article: { id: _self.article.id }
        }).done(function (res) {
            _self.score.set(res.result);
        });
        $(document).ready(function () {
            clientAjax.article.getScoreByUser({
                article: { id: _self.article.id },
                user: { id: '1' }
            }).then(function (res) {
                var article = res.result.article;
                if (article.score == 1)
                    _self.upScore.turnOn();
                else if (article.score == -1)
                    _self.downScore.turnOn();
            });
        });
    }
    return ArticleScore;
})();
exports.ArticleScore = ArticleScore;
//# sourceMappingURL=score-arrow.js.map

},{"./../client-ajax":4,"./../gui":7}],18:[function(require,module,exports){
exports.AjaxType = {
    GET: "GET",
    POST: "POST"
};

(function (_article) {
    function WrapFieldWithId(fields, id) {
        return { article: { title: fields.article.title, content: fields.article.content, id: id } };
    }
    _article.WrapFieldWithId = WrapFieldWithId;

    (function (create) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/create_article';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.POST;
            };
            return Ajax;
        })();
        create.Ajax = Ajax;
    })(_article.create || (_article.create = {}));
    var create = _article.create;

    (function (get) {
        function url() {
            return '/api/get';
        }
        get.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        get.type = type;
    })(_article.get || (_article.get = {}));
    var get = _article.get;

    (function (getTitleWithId) {
        function url() {
            return '/api/gettitleandid';
        }
        getTitleWithId.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        getTitleWithId.type = type;
    })(_article.getTitleWithId || (_article.getTitleWithId = {}));
    var getTitleWithId = _article.getTitleWithId;

    (function (getAll) {
        function url() {
            return '/api/getall';
        }
        getAll.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        getAll.type = type;
    })(_article.getAll || (_article.getAll = {}));
    var getAll = _article.getAll;

    (function (update) {
        function url() {
            return '/api/update';
        }
        update.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        update.type = type;
    })(_article.update || (_article.update = {}));
    var update = _article.update;

    (function (queryTitle) {
        function url() {
            return '/api/querytitle';
        }
        queryTitle.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        queryTitle.type = type;
    })(_article.queryTitle || (_article.queryTitle = {}));
    var queryTitle = _article.queryTitle;

    (function (getScore) {
        function url() {
            return '/api/get_article_score';
        }
        getScore.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        getScore.type = type;
    })(_article.getScore || (_article.getScore = {}));
    var getScore = _article.getScore;

    (function (getScoreByUser) {
        function url() {
            return '/api/get_score_by_user';
        }
        getScoreByUser.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        getScoreByUser.type = type;
    })(_article.getScoreByUser || (_article.getScoreByUser = {}));
    var getScoreByUser = _article.getScoreByUser;

    (function (upScore) {
        function url() {
            return '/api/up_score_article';
        }
        upScore.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        upScore.type = type;
    })(_article.upScore || (_article.upScore = {}));
    var upScore = _article.upScore;

    (function (downScore) {
        function url() {
            return '/api/down_score_article';
        }
        downScore.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        downScore.type = type;
    })(_article.downScore || (_article.downScore = {}));
    var downScore = _article.downScore;

    (function (addDependency) {
        function url() {
            return '/api/adddependency';
        }
        addDependency.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        addDependency.type = type;
    })(_article.addDependency || (_article.addDependency = {}));
    var addDependency = _article.addDependency;

    (function (getDependencies) {
        function url() {
            return '/api/getdependencies';
        }
        getDependencies.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        getDependencies.type = type;
    })(_article.getDependencies || (_article.getDependencies = {}));
    var getDependencies = _article.getDependencies;

    (function (remDependency) {
        function url() {
            return '/api/remdependency';
        }
        remDependency.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        remDependency.type = type;
    })(_article.remDependency || (_article.remDependency = {}));
    var remDependency = _article.remDependency;
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (proposal) {
    (function (add) {
        function url() {
            return '/api/add_proposal';
        }
        add.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        add.type = type;
    })(proposal.add || (proposal.add = {}));
    var add = proposal.add;

    (function (getAll) {
        function url() {
            return '/api/get_all';
        }
        getAll.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        getAll.type = type;
    })(proposal.getAll || (proposal.getAll = {}));
    var getAll = proposal.getAll;
})(exports.proposal || (exports.proposal = {}));
var proposal = exports.proposal;

(function (user) {
    (function (register) {
        function url() {
            return '/api/register';
        }
        register.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        register.type = type;
    })(user.register || (user.register = {}));
    var register = user.register;

    (function (auth) {
        function url() {
            return '/api/auth';
        }
        auth.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        auth.type = type;
        ;
    })(user.auth || (user.auth = {}));
    var auth = user.auth;
})(exports.user || (exports.user = {}));
var user = exports.user;

if (typeof customExports != 'undefined')
    customExports[getScriptName()] = exports;
//# sourceMappingURL=base-ajax.js.map

},{}],19:[function(require,module,exports){
var url;
(function (url) {
    (function (article) {
        function get(id) {
            return (id != null ? "/articles/" + id : "/articles/:id");
        }
        article.get = get;
        function create() {
            return "/create_article";
        }
        article.create = create;
        function edit(id) {
            return (id != null ? "/edit_article/" + id : "/edit_article/:id");
        }
        article.edit = edit;
    })(url.article || (url.article = {}));
    var article = url.article;
    (function (proposals) {
        function add(id) {
            return (id != null ? "/add_proposal/" + id : "/add_proposal/:id");
        }
        proposals.add = add;
        function getAll(id) {
            return (id != null ? "/proposals/" + id : "/proposals/:id");
        }
        proposals.getAll = getAll;
    })(url.proposals || (url.proposals = {}));
    var proposals = url.proposals;
    (function (user) {
        function register() {
            return "/register";
        }
        user.register = register;
    })(url.user || (url.user = {}));
    var user = url.user;
})(url || (url = {}));

module.exports = url;
//# sourceMappingURL=url.js.map

},{}],20:[function(require,module,exports){
function notOkBase(base) {
    return function (reason) {
        return { ok: false, because: base + ' ' + reason };
    };
}
exports.notOkBase = notOkBase;

function ok() {
    return { ok: true, because: '' };
}
exports.ok = ok;

(function (version) {
    function changesDescription(changesDescription) {
        var notOk = exports.notOkBase('Changes description should');
        if (typeof changesDescription != 'string')
            return notOk('be of type string');
        if (changesDescription.length <= 15)
            return notOk('be longer than 15 characters');
        return exports.ok();
    }
    version.changesDescription = changesDescription;
})(exports.version || (exports.version = {}));
var version = exports.version;

(function (user) {
    function isUsernameTaken(username) {
    }
    user.isUsernameTaken = isUsernameTaken;
    function isPasswordSafeEnough(password) {
    }
    user.isPasswordSafeEnough = isPasswordSafeEnough;
    function isEmailTaken() {
    }
    user.isEmailTaken = isEmailTaken;
})(exports.user || (exports.user = {}));
var user = exports.user;
//# sourceMappingURL=validate.js.map

},{}],21:[function(require,module,exports){
function notOkBase(base) {
    return function (reason) {
        return { ok: false, because: base + ' ' + reason };
    };
}
exports.notOkBase = notOkBase;

function ok() {
    return { ok: true, because: '' };
}
exports.ok = ok;

(function (version) {
    function changesDescription(changesDescription) {
        var notOk = exports.notOkBase('Changes description should');
        if (typeof changesDescription != 'string')
            return notOk('be of type string');
        if (changesDescription.length <= 15)
            return notOk('be longer than 15 characters');
        return exports.ok();
    }
    version.changesDescription = changesDescription;
})(exports.version || (exports.version = {}));
var version = exports.version;

(function (user) {
    function isUsernameTaken(username) {
    }
    user.isUsernameTaken = isUsernameTaken;
    function isPasswordSafeEnough(password) {
    }
    user.isPasswordSafeEnough = isPasswordSafeEnough;
    function isEmailTaken() {
    }
    user.isEmailTaken = isEmailTaken;
})(exports.user || (exports.user = {}));
var user = exports.user;
//# sourceMappingURL=validation.js.map

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,18,19,20,21]);
