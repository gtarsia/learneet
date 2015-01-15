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

},{"./../common/validate":29,"./client-ajax":6,"./gui":10,"./templates/previewable-article":23}],2:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./client-ajax");

var RenderedArticle = require('./templates/rendered-article');
var ArticleChangePreviewTemplate = require('./templates/article-change-preview-template');

var SinglePageGui = require("./single-page-gui");
var url = require("./../common/url");
var Arrows = require('./utils/score-arrow');

var base = '.partial.article ';

var ArticleGui = (function (_super) {
    __extends(ArticleGui, _super);
    function ArticleGui(args) {
        _super.call(this, '.article.partial');
        this.article = { id: null, rendered: null };
        this.dependenciesTemplate = this.propertize("#dependencies-template");
        this.editArticleBtn = this.propertize("a#editArticle");
        this.addProposalBtn = this.propertize("button#addProposal");
        this.viewProposalsBtn = this.propertize("button#viewProposals");
        this.articleCrumb = this.propertize("#article-crumb");
        this.dependenciesLink = this.propertize(base + 'h1 a.dependencies');
        this.parseURL();
        var _self = this;
        $(document).ready(function () {
            _self.articleChanges = new ArticleChangePreviewTemplate({ id: _self.article.id });
            _self.setCrumb();
            _self.article.rendered = new RenderedArticle();
            _self.articleScore = new Arrows.ArticleScore(_self.article);
            ajax.article.get({ article: { id: _self.article.id } }).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                _self.article.rendered.title.val = result.title;
                _self.article.rendered.content.val = marked(result.content);
            });
            _self.editArticleBtn.transitionURL(url.article.edit(_self.article.id));
            _self.dependenciesLink.transitionURL(url.dependencies.get(_self.article.id));
            return;
            ajax.dependencies.getAll({
                article: _self.article
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

    ArticleGui.prototype.setCrumb = function () {
        this.articleCrumb.transitionURL(location.pathname);
    };
    ArticleGui.prototype.parseURL = function () {
        var re = url.article.get('(\\d+)');
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.article.id = matches[1];
    };
    return ArticleGui;
})(SinglePageGui);

module.exports = ArticleGui;
//# sourceMappingURL=article-gui.js.map

},{"./../common/url":28,"./client-ajax":6,"./single-page-gui":20,"./templates/article-change-preview-template":21,"./templates/rendered-article":24,"./utils/score-arrow":26}],3:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var url = require("./../common/url");
var Gui = require("./gui");

var ArticleGui = require("./article-gui");
var EditArticleGui = require("./edit-article-gui");
var ChangeGui = require("./change-gui");

var BaseArticleGui = (function (_super) {
    __extends(BaseArticleGui, _super);
    function BaseArticleGui() {
        _super.call(this);
        var _self = this;
        window.onpopstate = function () {
            console.log('pop state');
            _self.viewTransition(location.pathname, true);
        };
        $.get(url.article.partials()).done(function (res) {
            $(document).ready(function () {
                $("#main").append(res);

                subGui.main.jq[1].remove();
            });
        });
    }
    BaseArticleGui.prototype.viewTransition = function (urlToGo, isBack) {
        var before = performance.now();
        $("#main *").unbind();
        console.log(performance.now() - before);
        var _self = this;
        if (!isBack)
            history.pushState({}, '', urlToGo);

        $(".partial").hide();
        var partials = [
            {
                re: url.article.get('\\d+'),
                gui: function () {
                    return new ArticleGui({});
                },
                sel: '.article.partial' },
            {
                re: url.article.edit('\\d+'),
                gui: function () {
                    return new EditArticleGui({});
                },
                sel: '.edit-article-partial' },
            {
                re: url.change.get('\\d+', '\\d+'),
                gui: function () {
                    return new ChangeGui();
                },
                sel: '.change.partial' }
        ];
        partials.forEach(function (partial) {
            var match = location.pathname.match('^' + partial.re + '$');
            if (match) {
                subGui = partial.gui();
            }
        });
    };
    return BaseArticleGui;
})(Gui);

if (guiName == 'BaseArticleGui') {
    gui = new BaseArticleGui();
}

module.exports = BaseArticleGui;
//# sourceMappingURL=base-article-gui.js.map

},{"./../common/url":28,"./article-gui":2,"./change-gui":5,"./edit-article-gui":9,"./gui":10}],4:[function(require,module,exports){
//# sourceMappingURL=browse-gui.js.map

},{}],5:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./client-ajax");

var RenderedArticle = require('./templates/rendered-article');

var SinglePageGui = require("./single-page-gui");
var url = require("./../common/url");
var Arrows = require('./utils/score-arrow');

var base = ".partial.change ";

var ChangeGui = (function (_super) {
    __extends(ChangeGui, _super);
    function ChangeGui() {
        var _this = this;
        _super.call(this, base);
        this.title = this.propertize(base + '.title', 'html');
        this.description = this.propertize(base + '.description', 'html');
        this.state = this.propertize(base + '.state.octicon');
        this.date = this.propertize(base + '.date', 'html');
        this.acceptBtn = this.propertize(base + 'button.accept');
        this.articleCrumb = this.propertize(base + '.article-crumb');
        this.article = { id: "-1" };
        this.change = { id: "-1" };
        this.parseURL();
        var changeCb = ajax.changes.get({ article: this.article, change: this.change });
        this.renderedArticle = new RenderedArticle(base);
        var _self = this;
        $(document).ready(function () {
            _self.articleCrumb.transitionURL(url.article.get(_this.article.id));
            _self.changeScore = new Arrows.ChangeScore(_this.article, _this.change);
            changeCb.done(function (res) {
                var change = res.result.change;
                var article = res.result.article;
                _self.description.val = change.description;

                _self.date.val = change.date;
                var state = '';
                if (change.state == 'open')
                    state = 'octicon-issue-opened';
                if (change.state == 'close')
                    state = 'octicon-issue-closed';
                _self.state.jq.addClass(state);

                var changed = JsDiff.applyPatch(article.content, change.changes);
                var diff = JsDiff.diffChars(article.content, changed);

                var diffed = '';
                diff.forEach(function (part) {
                    var cls = part.added ? 'diff added' : part.removed ? 'diff removed' : null;
                    diffed += cls ? "<span class='" + cls + "'>" + part.value + '</span>' : part.value;
                });
                _self.renderedArticle.setContent(diffed);
                _self.renderedArticle.setTitle(article.title);
            });
        });
    }
    ChangeGui.prototype.getEditBtn = function () {
        return $("#editBtn");
    };
    ChangeGui.prototype.setCrumb = function () {
    };
    ChangeGui.prototype.parseURL = function () {
        var re = url.change.get('(\\d+)', '(\\d+)');
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.article.id = matches[1];
        this.change.id = matches[2];
    };
    return ChangeGui;
})(SinglePageGui);

module.exports = ChangeGui;
//# sourceMappingURL=change-gui.js.map

},{"./../common/url":28,"./client-ajax":6,"./single-page-gui":20,"./templates/rendered-article":24,"./utils/score-arrow":26}],6:[function(require,module,exports){
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
        return exports.buildIAjax(new _get.Ajax(), params);
    }
    article.get = get;

    var _create = baseAjax.article.create;
    function create(params) {
        return exports.buildIAjax(new _create.Ajax(), params);
    }
    article.create = create;

    var _getAll = baseAjax.article.getAll;
    function getAll(params) {
        return exports.buildIAjax(new _getAll.Ajax(), params);
    }
    article.getAll = getAll;

    var _getTitleWithId = baseAjax.article.getTitleWithId;
    function getTitleWithId(params) {
        return exports.buildIAjax(new _getTitleWithId.Ajax(), params);
    }
    article.getTitleWithId = getTitleWithId;

    var _update = baseAjax.article.update;
    function update(params) {
        return exports.buildIAjax(new _update.Ajax(), params);
    }
    article.update = update;

    var _query = baseAjax.article.queryTitle;
    function query(params) {
        return exports.buildIAjax(new _query.Ajax(), params);
    }
    article.query = query;
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (score) {
    var _get = baseAjax.score.get;
    function get(params) {
        return exports.buildIAjax(new _get.Ajax(), params);
    }
    score.get = get;

    var _getByUser = baseAjax.score.getByUser;
    function getByUser(params) {
        return exports.buildIAjax(new _getByUser.Ajax(), params);
    }
    score.getByUser = getByUser;

    var _up = baseAjax.score.up;
    function upVote(params) {
        return exports.buildIAjax(new _up.Ajax(), params);
    }
    score.upVote = upVote;

    var _removeUp = baseAjax.score.removeUp;
    function removeUpVote(params) {
        return exports.buildIAjax(new _removeUp.Ajax(), params);
    }
    score.removeUpVote = removeUpVote;

    var _down = baseAjax.score.down;
    function downVote(params) {
        return exports.buildIAjax(new _down.Ajax(), params);
    }
    score.downVote = downVote;

    var _removeDown = baseAjax.score.removeDown;
    function removeDownVote(params) {
        return exports.buildIAjax(new _removeDown.Ajax(), params);
    }
    score.removeDownVote = removeDownVote;
})(exports.score || (exports.score = {}));
var score = exports.score;

(function (dependencies) {
    var _add = baseAjax.dependencies.add;
    function add(params) {
        return exports.buildIAjax(new _add.Ajax(), params);
    }
    dependencies.add = add;

    var _getAll = baseAjax.dependencies.getAll;
    function getAll(params) {
        return exports.buildIAjax(new _getAll.Ajax(), params);
    }
    dependencies.getAll = getAll;

    var _getCurrentUserScore = baseAjax.dependencies.getCurrentUserScore;
    function getCurrentUserScore(params) {
        return exports.buildIAjax(new _getCurrentUserScore.Ajax(), params);
    }
    dependencies.getCurrentUserScore = getCurrentUserScore;

    var _remove = baseAjax.dependencies.remove;
    function remove(params) {
        return exports.buildIAjax(new _remove.Ajax(), params);
    }
    dependencies.remove = remove;
})(exports.dependencies || (exports.dependencies = {}));
var dependencies = exports.dependencies;

(function (changes) {
    var _getAll = baseAjax.changes.getAll;
    function getAll(params) {
        return exports.buildIAjax(new _getAll.Ajax(), params);
    }
    changes.getAll = getAll;

    var _get = baseAjax.changes.get;
    function get(params) {
        return exports.buildIAjax(new _get.Ajax(), params);
    }
    changes.get = get;

    var _getScore = baseAjax.changes.getScore;
    function getScore(params) {
        return exports.buildIAjax(new _getScore.Ajax(), params);
    }
    changes.getScore = getScore;

    var _getScoreByUser = baseAjax.changes.getScoreByUser;
    function getScoreByUser(params) {
        return exports.buildIAjax(new _getScoreByUser.Ajax(), params);
    }
    changes.getScoreByUser = getScoreByUser;

    var _upVote = baseAjax.changes.upVote;
    function upVote(params) {
        return exports.buildIAjax(new _upVote.Ajax(), params);
    }
    changes.upVote = upVote;

    var _removeUpVote = baseAjax.changes.removeUpVote;
    function removeUpVote(params) {
        return exports.buildIAjax(new _removeUpVote.Ajax(), params);
    }
    changes.removeUpVote = removeUpVote;
})(exports.changes || (exports.changes = {}));
var changes = exports.changes;

(function (user) {
    var _register = baseAjax.user.register;
    function register(params) {
        return exports.buildIAjax(new _register.Ajax(), params);
    }
    user.register = register;

    var _auth = baseAjax.user.auth;
    function auth(params) {
        return exports.buildIAjax(new _auth.Ajax(), params);
    }
    user.auth = auth;
})(exports.user || (exports.user = {}));
var user = exports.user;
//# sourceMappingURL=client-ajax.js.map

},{"./../common/base-ajax":27}],7:[function(require,module,exports){
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

},{"./../common/url":28,"./client-ajax":6,"./gui":10,"./templates/previewable-article":23}],8:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./client-ajax");
var url = require("./../common/url");
var SinglePageGui = require("./single-page-gui");

var base = '.partial.dependencies ';

var DependenciesGui = (function (_super) {
    __extends(DependenciesGui, _super);
    function DependenciesGui() {
        _super.call(this, base);
        this.articleCrumb = this.propertize(base + '.article.crumb');
        this.dependencies = this.propertize(base + '.dependency.list');
        this.dependenciesTemplate = this.propertize(base + '.template', 'html');
        this.dependenciesLinks = this.propertize(base + '.dependency a.dependencies');
        this.articlesLinks = this.propertize(base + '.dependency a.article');
        this.parseURL();
        var _self = this;
        var titleCb = ajax.article.getTitleWithId({ article: { id: _self.id } });
        var dependenciesCb = ajax.dependencies.getAll({ user: { id: '1' }, article: { id: _self.id } });
        $(document).ready(function () {
            _self.setBreadcrumb();
            _self.dependencies.jq.empty();
            titleCb.done(function (res) {
                var article = res.result;
                _self.articleCrumb.jq.html('Back to Article(' + article.title + ')');
            });
            dependenciesCb.done(function (res) {
                var deps = res.result;
                var none = 'display: none;';
                deps.forEach(function (dep) {
                    dep.dependencyId = dep.id;
                    dep.dependencyUrl = url.dependencies.get(dep.id);
                    dep.articleUrl = url.article.get(dep.id);
                    if (dep.starred == 'true') {
                        dep.starStyle = '';
                        dep.emptyStarStyle = none;
                    } else {
                        dep.starStyle = none;
                        dep.emptyStarStyle = '';
                    }

                    dep.arrowUpStyle = none;
                    dep.emptyArrowUpStyle = '';
                });
                console.log(deps);
                var template = _self.dependenciesTemplate.val;
                Mustache.parse(template);
                var rendered = Mustache.render(template, { dependencies: deps });
                _self.dependencies.jq.html(rendered);
                _self.dependenciesLinks.transitionURL('');
                _self.articlesLinks.transitionURL('');
            });
        });
    }
    DependenciesGui.prototype.parseURL = function () {
        var re = url.dependencies.get('(\\d+)');
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.id = matches[1];
    };
    DependenciesGui.prototype.setBreadcrumb = function () {
        this.articleCrumb.transitionURL(url.article.get(this.id));
    };
    return DependenciesGui;
})(SinglePageGui);

module.exports = DependenciesGui;
//# sourceMappingURL=dependencies-gui.js.map

},{"./../common/url":28,"./client-ajax":6,"./single-page-gui":20}],9:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./client-ajax");
var PreviewableArticle = require("./templates/previewable-article");

var url = require("./../common/url");
var SinglePageGui = require("./single-page-gui");
var validate = require("./../common/validate");
var baseAjax = require("./../common/base-ajax");

var EditArticleGui = (function (_super) {
    __extends(EditArticleGui, _super);
    function EditArticleGui(args) {
        _super.call(this, '.edit-article-partial');
        this.id = "-1";
        this.saveBtn = { get jq() {
                return $('button#save');
            } };
        this.cancelBtn = { get jq() {
                return $('button#cancel');
            } };
        this.articleCrumb = this.propertize(".edit-article-partial #article-crumb");
        this.articleHiddenId = this.propertize("[type=hidden]#article-id", "val");
        this.dependency = this.propertize(".dependency");
        this.dependencyFound = this.propertize("select#dependencyFound", 'val');
        this.addDependencyBtn = this.propertize("button#add");
        this.dependenciesTemplate = this.propertize("#dependencies-template");
        this.removeDependencyBtns = this.propertize(".removeDependency");
        this.dependencyIds = this.propertize(".dependencyId");
        this.changesDescription = this.propertize("#changesDescription", "val");
        this.parseURL();
        var _self = this;
        $(document).ready(function () {
            _self.articleCrumb.transitionURL(url.article.get(_self.id));
            _self.article = new PreviewableArticle();
            _self.dependencyFound.jq.selectize({
                create: false,
                valueField: 'id',
                labelField: 'title',
                searchField: 'title',
                load: function (query, callback) {
                    if (!query.length)
                        return callback();
                    ajax.article.query({ query: query }).then(function (res) {
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
            ajax.article.get({ article: { id: _self.id } }).done(function (res) {
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
            ajax.dependencies.getAll({ article: { id: _self.id } }).done(function (res) {
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
                    ajax.dependencies.add({
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
    EditArticleGui.prototype.parseURL = function () {
        var re = url.article.edit('(\\d+)');
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.id = matches[1];
    };
    EditArticleGui.prototype.removeDependency = function (jq) {
        var _this = this;
        var id = $(jq).siblings(this.dependencyIds.jq).val();
        ajax.dependencies.remove({
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
        ajax.article.update(article).done(function (res) {
            if (!res.ok)
                console.log(res.why);
            else
                console.log('Se actualizo el articulo');
            this.redirect(url.article.get(this.id));
        });
    };
    return EditArticleGui;
})(SinglePageGui);

module.exports = EditArticleGui;
//# sourceMappingURL=edit-article-gui.js.map

},{"./../common/base-ajax":27,"./../common/url":28,"./../common/validate":29,"./client-ajax":6,"./single-page-gui":20,"./templates/previewable-article":23}],10:[function(require,module,exports){
var _propertize = require('./utils/propertize');

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
        return _propertize(selector, valFnName);
    };
    return Gui;
})();

module.exports = Gui;
//# sourceMappingURL=gui.js.map

},{"./utils/propertize":25}],11:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var clientAjax = require("./client-ajax");

var url = require("./../common/url");
var SinglePageGui = require("./single-page-gui");

var base = '.index.partial ';

var IndexGui = (function (_super) {
    __extends(IndexGui, _super);
    function IndexGui() {
        _super.call(this, base);
        this.articleThumbs = this.propertize(base + '.article-thumbs');
        this.articleThumbTemplate = this.propertize(base + '#article-thumb-template');
        this.articleThumbsLinks = this.propertize(base + '.article-thumb a');
        var _self = this;
        _self.articleThumbs.jq.empty();
        $(document).ready(function () {
            _self.createBtn = _self.propertize("#create");
            clientAjax.article.getAll({}).done(function (res) {
                _self.articleThumbs.jq.empty();
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
                _self.articleThumbs.jq.html(rendered);
                _self.articleThumbsLinks.transitionURL('');
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
})(SinglePageGui);

module.exports = IndexGui;
//# sourceMappingURL=index-gui.js.map

},{"./../common/url":28,"./client-ajax":6,"./single-page-gui":20}],12:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require("./gui");

var LayoutGui = (function (_super) {
    __extends(LayoutGui, _super);
    function LayoutGui() {
        _super.call(this);
        this.logo = this.propertize('#logo');
        var _self = this;
        $(document).ready(function () {
            _self.logo.transitionURL('/');
        });
    }
    return LayoutGui;
})(Gui);

layoutGui = new LayoutGui();

module.exports = LayoutGui;
//# sourceMappingURL=layout-gui.js.map

},{"./gui":10}],13:[function(require,module,exports){
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

},{"./parser":15}],14:[function(require,module,exports){
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

},{"./client-ajax":6,"./gui":10}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./gui');

var Partial = (function (_super) {
    __extends(Partial, _super);
    function Partial(partialSel) {
        _super.call(this);
        this.base = partialSel;
        this.main = this.propertize(partialSel);
        var _self = this;
        $(document).ready(function () {
            _self.main.jq.show();
            _self.main.jq.velocity({ opacity: 0 }, { duration: 0 });
            _self.main.jq.velocity({ opacity: 1 }, { duration: 500 });
        });
    }
    return Partial;
})(Gui);

module.exports = Partial;
//# sourceMappingURL=partial.js.map

},{"./gui":10}],17:[function(require,module,exports){
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

},{"./../common/url":28,"./client-ajax":6,"./gui":10}],18:[function(require,module,exports){
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

},{"./client-ajax":6,"./gui":10}],19:[function(require,module,exports){
var url = require("./../common/url");

var IndexGui = require("./index-gui");
var ArticleGui = require("./article-gui");
var EditArticleGui = require("./edit-article-gui");
var DependenciesGui = require("./dependencies-gui");
var ChangeGui = require("./change-gui");

function findSinglePageGui(urlToGo) {
    var partials = [
        {
            re: '/',
            gui: function () {
                return new IndexGui();
            },
            sel: '.index.partial' },
        {
            re: url.article.get('\\d+'),
            gui: function () {
                return new ArticleGui({});
            },
            sel: '.article.partial' },
        {
            re: url.article.edit('\\d+'),
            gui: function () {
                return new EditArticleGui({});
            },
            sel: '.edit-article-partial' },
        {
            re: url.change.get('\\d+', '\\d+'),
            gui: function () {
                return new ChangeGui();
            },
            sel: '.change.partial' },
        {
            re: url.dependencies.get('\\d+'),
            gui: function () {
                return new DependenciesGui();
            },
            sel: '.dependencies.partial' }
    ];
    var _gui;
    partials.forEach(function (partial) {
        var match = urlToGo.match('^' + partial.re + '$');
        if (match && !_gui) {
            _gui = partial.gui;
        }
    });
    return _gui;
}
exports.findSinglePageGui = findSinglePageGui;

function viewTransition(urlToGo, isBack) {
    var before = performance.now();
    $(".partial.active *").unbind();
    $('.partial.active').removeClass('active');
    console.log(performance.now() - before);
    if (!isBack)
        history.pushState({}, '', urlToGo);
    $(".partial").hide();
    gui = exports.findSinglePageGui(urlToGo)();
    gui.main.jq.addClass('active');
}
exports.viewTransition = viewTransition;

function startSingleApp(gui) {
    window.onpopstate = function () {
        console.log('pop state');
        exports.viewTransition(location.pathname, true);
    };
    $(document).ready(function () {
        exports.viewTransition(location.pathname);
    });
}
exports.startSingleApp = startSingleApp;

var guiFound = exports.findSinglePageGui(location.pathname);
if (guiFound)
    exports.startSingleApp(guiFound);

singlePageApp.viewTransition = exports.viewTransition;
//# sourceMappingURL=single-page-app.js.map

},{"./../common/url":28,"./article-gui":2,"./change-gui":5,"./dependencies-gui":8,"./edit-article-gui":9,"./index-gui":11}],20:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./gui');

var SinglePageGui = (function (_super) {
    __extends(SinglePageGui, _super);
    function SinglePageGui(componentSel) {
        _super.call(this);
        this.base = componentSel;
        this.main = this.propertize(componentSel);
        var _self = this;
        $(document).ready(function () {
            _self.main.jq.show();
            _self.main.jq.velocity({ opacity: 0 }, { duration: 0 });
            _self.main.jq.velocity({ opacity: 1 }, { duration: 300 });
        });
    }
    return SinglePageGui;
})(Gui);

module.exports = SinglePageGui;
//# sourceMappingURL=single-page-gui.js.map

},{"./gui":10}],21:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./../client-ajax");
var Gui = require("./../gui");
var url = require("./../../common/url");

var base = '.changes.rectangular-frame ';

var ArticleChangePreviewTemplate = (function (_super) {
    __extends(ArticleChangePreviewTemplate, _super);
    function ArticleChangePreviewTemplate(article) {
        _super.call(this);
        this.id = "-1";
        this.changesTemplate = this.propertize(base + ".template", 'html');
        this.changesContainer = this.propertize(base + ".list");
        this.changesLink = this.propertize(base + ".description a");
        this.changesList = this.propertize(base + ".list");
        this.id = article.id;
        var _self = this;
        $(document).ready(function () {
            ajax.changes.getAll({ article: article }).done(function (res) {
                var changes = res.result;
                changes.forEach(function (change) {
                    var octi = '';
                    if (change.state == 'open')
                        octi = 'octicon-issue-opened';
                    else if (change.state == 'closed')
                        octi = 'octicon-issue-closed';
                    change.octicon = octi;
                    change.avatar = '/images/avatar.png';
                    change.url = url.change.get(_self.id, change.id);
                });
                var template = _self.changesTemplate.val;
                Mustache.parse(template);
                var rendered = Mustache.render(template, { changes: changes });
                _self.changesList.jq.html(rendered);
                _self.changesLink.transitionURL('');
            });
        });
    }
    return ArticleChangePreviewTemplate;
})(Gui);

module.exports = ArticleChangePreviewTemplate;
//# sourceMappingURL=article-change-preview-template.js.map

},{"./../../common/url":28,"./../client-ajax":6,"./../gui":10}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{".././client-ajax":6,"./editable-article":22,"./rendered-article":24}],24:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./../gui');

var RenderedArticle = (function (_super) {
    __extends(RenderedArticle, _super);
    function RenderedArticle(parent) {
        _super.call(this);
        var _self = this;
        if (!parent)
            parent = '';
        this.content = this.propertize(parent + ' div.article-content', 'html');
        this.title = this.propertize(parent + ' h1.article-title', 'html');
    }
    RenderedArticle.prototype.scroll = function (line) {
        var outputLine = $(".line" + line);
        if (outputLine.length) {
            $(".selected").removeClass("selected");
            outputLine.addClass("selected");
            this.content.jq.scrollTop((this.content.jq.scrollTop() - this.content.jq.offset().top) + outputLine.offset().top - this.content.jq.height() / 2);
        }
    };
    RenderedArticle.prototype.setTitle = function (title) {
        this.title.val = title;
    };
    RenderedArticle.prototype.setContent = function (content) {
        this.content.val = marked(content);
    };
    return RenderedArticle;
})(Gui);

module.exports = RenderedArticle;
//# sourceMappingURL=rendered-article.js.map

},{"./../gui":10}],25:[function(require,module,exports){
function propertize(selector, valFnName) {
    var obj = {
        get jq() {
            return $(selector);
        },
        get selector() {
            return selector;
        },
        transitionURL: function (url) {
            this.jq.each(function (index, el) {
                var _url = url;
                if (_url)
                    $(el).prop('href', url);
                else
                    _url = el.pathname;
                $(el).click(function (e) {
                    singlePageApp.viewTransition(_url);
                    e.preventDefault();
                });
            });
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
}

module.exports = propertize;
//# sourceMappingURL=propertize.js.map

},{}],26:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./../gui');
var ajax = require('./../client-ajax');

var ScoreArrow = (function (_super) {
    __extends(ScoreArrow, _super);
    function ScoreArrow(classImageSelector, offImageSelector, onImageSelector) {
        _super.call(this);
        this.isTurnedOn = false;
        this.bothImages = this.propertize(classImageSelector);
        this.offImage = this.propertize(offImageSelector);
        this.onImage = this.propertize(onImageSelector);
    }
    ScoreArrow.prototype.toggle = function () {
        if (this.isTurnedOn)
            this.turnOff();
        else
            this.turnOn();
    };
    ScoreArrow.prototype.turnOff = function () {
        this.isTurnedOn = false;
        this.onImage.jq.hide();
        this.offImage.jq.show();
    };
    ScoreArrow.prototype.turnOn = function () {
        this.isTurnedOn = true;
        this.onImage.jq.show();
        this.offImage.jq.hide();
    };
    return ScoreArrow;
})(Gui);
exports.ScoreArrow = ScoreArrow;

var UpScoreArrow = (function (_super) {
    __extends(UpScoreArrow, _super);
    function UpScoreArrow() {
        _super.call(this, '.up-score', '#up-score-off', '#up-score-on');
    }
    return UpScoreArrow;
})(ScoreArrow);
exports.UpScoreArrow = UpScoreArrow;

var DownScoreArrow = (function (_super) {
    __extends(DownScoreArrow, _super);
    function DownScoreArrow() {
        _super.call(this, '.down-score', '#down-score-off', '#down-score-on');
    }
    return DownScoreArrow;
})(ScoreArrow);
exports.DownScoreArrow = DownScoreArrow;

var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        _super.call(this);
        this.score = this.propertize('#article-score', 'html');
    }
    Score.prototype.set = function (score) {
        this.score.val = score;
    };
    return Score;
})(Gui);
exports.Score = Score;

var UpScore = (function () {
    function UpScore() {
        var _self = this;
        this.upScore = new UpScoreArrow();
        this.score = new Score();
        this.upScore.bothImages.jq.click(function () {
            _self.upScoreClick();
        });
        _self.updateScore();
        $(document).ready(function () {
            _self.fetchScoreByUser().done(function (isUpScore) {
                if (isUpScore)
                    _self.upScore.turnOn();
            });
        });
    }
    UpScore.prototype._abstract = function () {
        throw new Error('Abstract method');
    };
    UpScore.prototype.fetchScore = function () {
        return this._abstract();
    };
    UpScore.prototype.fetchScoreByUser = function () {
        return this._abstract();
    };
    UpScore.prototype.upVote = function () {
        return this._abstract();
    };
    UpScore.prototype.removeUpVote = function () {
        return this._abstract();
    };
    UpScore.prototype.updateScore = function () {
        var _this = this;
        this.fetchScore().done(function (score) {
            _this.score.set(score);
        });
    };
    UpScore.prototype.upScoreClick = function () {
        var _this = this;
        if (this.upScore.isTurnedOn) {
            this.upScore.turnOff();
        } else {
            this.upScore.turnOn();
        }
        var p;
        if (this.upScore.isTurnedOn)
            p = this.upVote();
        else
            p = this.removeUpVote();
        p.done(function () {
            _this.updateScore();
        });
    };
    return UpScore;
})();
exports.UpScore = UpScore;

var UpDownScore = (function () {
    function UpDownScore() {
        var _self = this;
        this.upScore = new UpScoreArrow();
        this.downScore = new DownScoreArrow();
        this.score = new Score();
        this.upScore.bothImages.jq.click(function () {
            _self.upScoreClick();
        });
        this.downScore.bothImages.jq.click(function () {
            _self.downScoreClick();
        });
        _self.updateScore();
        $(document).ready(function () {
            _self.fetchScoreByUser().done(function (score) {
                if (score == 1)
                    _self.upScore.turnOn();
                else if (score == -1)
                    _self.downScore.turnOn();
            });
        });
    }
    UpDownScore.prototype._abstract = function () {
        throw new Error('Abstract method');
    };
    UpDownScore.prototype.fetchScore = function () {
        this._abstract();
    };
    UpDownScore.prototype.fetchScoreByUser = function () {
        this._abstract();
    };
    UpDownScore.prototype.upVote = function () {
        this._abstract();
    };
    UpDownScore.prototype.removeUpVote = function () {
        this._abstract();
    };
    UpDownScore.prototype.downVote = function () {
        this._abstract();
    };
    UpDownScore.prototype.removeDownVote = function () {
        this._abstract();
    };
    UpDownScore.prototype.updateScore = function () {
        var _this = this;
        this.fetchScore().done(function (score) {
            _this.score.set(score);
        });
    };
    UpDownScore.prototype.upScoreClick = function () {
        var _this = this;
        if (this.upScore.isTurnedOn) {
            this.upScore.turnOff();
        } else {
            this.upScore.turnOn();
            this.downScore.turnOff();
        }
        var p;
        if (this.upScore.isTurnedOn)
            p = this.upVote();
        else
            p = this.removeUpVote();
        p.done(function () {
            _this.updateScore();
        });
    };
    UpDownScore.prototype.downScoreClick = function () {
        var _this = this;
        if (this.downScore.isTurnedOn) {
            this.downScore.turnOff();
        } else {
            this.downScore.turnOn();
            this.upScore.turnOff();
        }
        var p;
        if (this.downScore.isTurnedOn)
            p = this.downVote();
        else
            p = this.removeDownVote();
        p.done(function () {
            _this.updateScore();
        });
    };
    return UpDownScore;
})();
exports.UpDownScore = UpDownScore;

var ArticleScore = (function (_super) {
    __extends(ArticleScore, _super);
    function ArticleScore(article) {
        this.article = article;
        _super.call(this);
    }
    ArticleScore.prototype.fetchScore = function () {
        var _self = this;
        return ajax.score.get({
            article: { id: _self.article.id }
        }).then(function (res) {
            return res.result.article.score;
        });
    };
    ArticleScore.prototype.fetchScoreByUser = function () {
        return ajax.score.getByUser({
            article: { id: this.article.id }
        }).then(function (res) {
            return res.result.article.score;
        });
    };
    ArticleScore.prototype.upVote = function () {
        return ajax.score.upVote({ article: this.article });
    };
    ArticleScore.prototype.removeUpVote = function () {
        return ajax.score.removeUpVote({ article: this.article });
    };
    ArticleScore.prototype.downVote = function () {
        return ajax.score.downVote({ article: this.article });
    };
    ArticleScore.prototype.removeDownVote = function () {
        return ajax.score.removeDownVote({ article: this.article });
    };
    return ArticleScore;
})(UpDownScore);
exports.ArticleScore = ArticleScore;

var ChangeScore = (function (_super) {
    __extends(ChangeScore, _super);
    function ChangeScore(article, change) {
        this.article = article;
        this.change = change;
        _super.call(this);
    }
    ChangeScore.prototype.fetchScore = function () {
        return ajax.changes.getScore({
            article: { id: this.article.id },
            change: { id: this.change.id }
        }).then(function (res) {
            return res.result.change.score;
        });
    };
    ChangeScore.prototype.fetchScoreByUser = function () {
        return ajax.changes.getScoreByUser({
            article: { id: this.article.id },
            change: { id: this.change.id }
        }).then(function (res) {
            return res.result;
        });
    };
    ChangeScore.prototype.upVote = function () {
        return ajax.changes.upVote({
            article: this.article, change: this.change
        });
    };
    ChangeScore.prototype.removeUpVote = function () {
        return ajax.changes.removeUpVote({
            article: this.article, change: this.change
        });
    };
    return ChangeScore;
})(UpScore);
exports.ChangeScore = ChangeScore;
//# sourceMappingURL=score-arrow.js.map

},{"./../client-ajax":6,"./../gui":10}],27:[function(require,module,exports){
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
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/get';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        get.Ajax = Ajax;
    })(_article.get || (_article.get = {}));
    var get = _article.get;

    (function (getTitleWithId) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/gettitleandid';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        getTitleWithId.Ajax = Ajax;
    })(_article.getTitleWithId || (_article.getTitleWithId = {}));
    var getTitleWithId = _article.getTitleWithId;

    (function (getAll) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/getall';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        getAll.Ajax = Ajax;
    })(_article.getAll || (_article.getAll = {}));
    var getAll = _article.getAll;

    (function (update) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/update';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.POST;
            };
            return Ajax;
        })();
        update.Ajax = Ajax;
    })(_article.update || (_article.update = {}));
    var update = _article.update;

    (function (queryTitle) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/querytitle';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        queryTitle.Ajax = Ajax;
    })(_article.queryTitle || (_article.queryTitle = {}));
    var queryTitle = _article.queryTitle;
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (score) {
    (function (get) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/get_article_score';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        get.Ajax = Ajax;
    })(score.get || (score.get = {}));
    var get = score.get;

    (function (getByUser) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/get_score_by_user';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        getByUser.Ajax = Ajax;
    })(score.getByUser || (score.getByUser = {}));
    var getByUser = score.getByUser;
    (function (up) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/up_score_article';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.POST;
            };
            return Ajax;
        })();
        up.Ajax = Ajax;
    })(score.up || (score.up = {}));
    var up = score.up;
    (function (removeUp) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/remove_up_score_article';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.POST;
            };
            return Ajax;
        })();
        removeUp.Ajax = Ajax;
    })(score.removeUp || (score.removeUp = {}));
    var removeUp = score.removeUp;

    (function (down) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/down_score_article';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.POST;
            };
            return Ajax;
        })();
        down.Ajax = Ajax;
    })(score.down || (score.down = {}));
    var down = score.down;
    (function (removeDown) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/remove_down_score_article';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.POST;
            };
            return Ajax;
        })();
        removeDown.Ajax = Ajax;
    })(score.removeDown || (score.removeDown = {}));
    var removeDown = score.removeDown;
})(exports.score || (exports.score = {}));
var score = exports.score;

(function (dependencies) {
    (function (add) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/adddependency';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.POST;
            };
            return Ajax;
        })();
        add.Ajax = Ajax;
    })(dependencies.add || (dependencies.add = {}));
    var add = dependencies.add;

    (function (getAll) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/getdependencies';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        getAll.Ajax = Ajax;
    })(dependencies.getAll || (dependencies.getAll = {}));
    var getAll = dependencies.getAll;

    (function (getCurrentUserScore) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/getdependencyscoreofcurrentuser';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        getCurrentUserScore.Ajax = Ajax;
    })(dependencies.getCurrentUserScore || (dependencies.getCurrentUserScore = {}));
    var getCurrentUserScore = dependencies.getCurrentUserScore;

    (function (star) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/stardependency';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        star.Ajax = Ajax;
    })(dependencies.star || (dependencies.star = {}));
    var star = dependencies.star;

    (function (unstar) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/unstardependency';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        unstar.Ajax = Ajax;
    })(dependencies.unstar || (dependencies.unstar = {}));
    var unstar = dependencies.unstar;

    (function (remove) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/remdependency';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.POST;
            };
            return Ajax;
        })();
        remove.Ajax = Ajax;
    })(dependencies.remove || (dependencies.remove = {}));
    var remove = dependencies.remove;
})(exports.dependencies || (exports.dependencies = {}));
var dependencies = exports.dependencies;

(function (changes) {
    changes.ChangeState = {
        open: 'open', closed: 'closed'
    };

    (function (getAll) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/getallchanges';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        getAll.Ajax = Ajax;
    })(changes.getAll || (changes.getAll = {}));
    var getAll = changes.getAll;

    (function (get) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/getchange';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        get.Ajax = Ajax;
    })(changes.get || (changes.get = {}));
    var get = changes.get;

    (function (getScore) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/getchangescore';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        getScore.Ajax = Ajax;
    })(changes.getScore || (changes.getScore = {}));
    var getScore = changes.getScore;

    (function (getScoreByUser) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/getchangescorebyuser';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        getScoreByUser.Ajax = Ajax;
    })(changes.getScoreByUser || (changes.getScoreByUser = {}));
    var getScoreByUser = changes.getScoreByUser;

    (function (upVote) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/upvotechange';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        upVote.Ajax = Ajax;
    })(changes.upVote || (changes.upVote = {}));
    var upVote = changes.upVote;

    (function (removeUpVote) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/removechangeupvote';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        removeUpVote.Ajax = Ajax;
    })(changes.removeUpVote || (changes.removeUpVote = {}));
    var removeUpVote = changes.removeUpVote;
})(exports.changes || (exports.changes = {}));
var changes = exports.changes;

(function (user) {
    (function (register) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/register';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.POST;
            };
            return Ajax;
        })();
        register.Ajax = Ajax;
    })(user.register || (user.register = {}));
    var register = user.register;

    (function (auth) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/gettitleandid';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        auth.Ajax = Ajax;
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

},{}],28:[function(require,module,exports){
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
        function partials() {
            return "/partials-article";
        }
        article.partials = partials;
    })(url.article || (url.article = {}));
    var article = url.article;
    (function (change) {
        function get(articleId, changeId) {
            return (changeId == null || articleId == null ? "/articles/:article_id/changes/:changes_id" : "/articles/" + articleId + "/changes/" + changeId);
        }
        change.get = get;
    })(url.change || (url.change = {}));
    var change = url.change;
    (function (dependencies) {
        function get(articleId) {
            return (articleId == null ? "/articles/:article_id/dependencies" : "/articles/" + articleId + "/dependencies");
        }
        dependencies.get = get;
    })(url.dependencies || (url.dependencies = {}));
    var dependencies = url.dependencies;

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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,27,28,29,30]);
