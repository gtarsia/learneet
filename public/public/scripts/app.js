(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var ArticleGui = (function (_super) {
    __extends(ArticleGui, _super);
    function ArticleGui() {
        _super.call(this);
        this.id = "-1";
        var _self = this;
        $(document).ready(function () {
            _self.article = new RenderedArticle();
            _self.id = $("[type=hidden]#article-id").val();
            clientAjax.article.get({ id: _self.id }).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                _self.article.title.val = result.title;
                _self.article.content.val = marked(result.content);
            });
            _self.getEditBtn().click(function () {
                _self.redirect(url.article.edit(_self.id));
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
    new ArticleGui();
}
//# sourceMappingURL=article-gui.js.map

},{"./../common/url":15,"./client-ajax":2,"./gui":5,"./templates/rendered-article":13}],2:[function(require,module,exports){
var baseAjax = require('./../common/base-ajax');
var AjaxType = baseAjax.AjaxType;

function buildAjax(url, type, params) {
    switch (type) {
        case AjaxType.GET:
            return $.get(url, params);
            break;
        case AjaxType.POST:
            return $.post(url, params);
            break;
    }
}
exports.buildAjax = buildAjax;

(function (article) {
    var baseGet = baseAjax.article.get;
    function get(params) {
        return exports.buildAjax(baseGet.url(), baseGet.type(), params);
    }
    article.get = get;

    var baseCreate = baseAjax.article.create;
    function create(params) {
        return exports.buildAjax(baseCreate.url(), baseCreate.type(), params);
    }
    article.create = create;

    var baseGetAll = baseAjax.article.getAll;
    function getAll(params) {
        return exports.buildAjax(baseGetAll.url(), baseGetAll.type(), params);
    }
    article.getAll = getAll;

    var baseUpdate = baseAjax.article.update;
    function update(params) {
        return exports.buildAjax(baseUpdate.url(), baseUpdate.type(), params);
    }
    article.update = update;
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (user) {
    var baseRegister = baseAjax.user.register;
    function register(params) {
        return exports.buildAjax(baseRegister.url(), baseRegister.type(), params);
    }
    user.register = register;

    var baseAuth = baseAjax.user.auth;
    function auth(params) {
        return exports.buildAjax(baseAuth.url(), baseAuth.type(), params);
    }
    user.auth = auth;
})(exports.user || (exports.user = {}));
var user = exports.user;
//# sourceMappingURL=client-ajax.js.map

},{"./../common/base-ajax":14}],3:[function(require,module,exports){
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
        return "An h1 header\n============\n\nParagraphs are separated by a blank line.\n\n2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists\nlook like:\n\n  * this one\n  * that one\n  * the other one\n\nNote that --- not considering the asterisk --- the actual text\ncontent starts at 4-columns in.\n\n> Block quotes are\n> written like so.\n>\n> They can span multiple paragraphs,\n> if you like.\n\nUse 3 dashes for an em-dash. Use 2 dashes for ranges (ex., \"it's all\nin chapters 12--14\"). Three dots ... will be converted to an ellipsis.\nUnicode is supported. ☺\n\n\n\nAn h2 header\n------------\n\nHere's a numbered list:\n\n 1. first item\n 2. second item\n 3. third item\n\nNote again how the actual text starts at 4 columns in (4 characters\nfrom the left side). Here's a code sample:\n\n    # Let me re-iterate ...\n    for i in 1 .. 10 { do-something(i) }\n\nAs you probably guessed, indented 4 spaces. By the way, instead of\nindenting the block, you can use delimited blocks, if you like:\n\n~~~\ndefine foobar() {\n    print \"Welcome to flavor country!\";\n}\n~~~\n\n(which makes copying & pasting easier). You can optionally mark the\ndelimited block for Pandoc to syntax highlight it:\n\n~~~python\nimport time\n# Quick, count to ten!\nfor i in range(10):\n    # (but not *too* quick)\n    time.sleep(0.5)\n    print i\n~~~\n\n\n\n### An h3 header ###\n\nNow a nested list:\n\n 1. First, get these ingredients:\n\n      * carrots\n      * celery\n      * lentils\n\n 2. Boil some water.\n\n 3. Dump everything in the pot and follow\n    this algorithm:\n\n        find wooden spoon\n        uncover pot\n        stir\n        cover pot\n        balance wooden spoon precariously on pot handle\n        wait 10 minutes\n        goto first step (or shut off burner when done)\n\n    Do not bump wooden spoon or it will fall.\n\nNotice again how text always lines up on 4-space indents (including\nthat last line which continues item 3 above).\n\nHere's a link to [a website](http://foo.bar), to a [local\ndoc](local-doc.html), and to a [section heading in the current\ndoc](#an-h2-header). Here's a footnote [^1].\n\n[^1]: Footnote text goes here.\n\nTables can look like this:\n\nsize  material      color\n----  ------------  ------------\n9     leather       brown\n10    hemp canvas   natural\n11    glass         transparent\n\nTable: Shoes, their sizes, and what they're made of\n\n(The above is the caption for the table.) Pandoc also supports\nmulti-line tables:\n\n--------  -----------------------\nkeyword   text\n--------  -----------------------\nred       Sunsets, apples, and\n          other red or reddish\n          things.\n\ngreen     Leaves, grass, frogs\n          and other things it's\n          not easy being.\n--------  -----------------------\n\nA horizontal rule follows.\n\n***\n\nHere's a definition list:\n\napples\n  : Good for making applesauce.\noranges\n  : Citrus!\ntomatoes\n  : There's no \"e\" in tomatoe.\n\nAgain, text is indented 4 spaces. (Put a blank line between each\nterm/definition pair to spread things out more.)\n\nHere's a \"line block\":\n\n| Line one\n|   Line too\n| Line tree\n\nand images can be specified like so:\n\n![example image](example-image.jpg \"An exemplary image\")\n\nInline math equations go in like so: $\omega = d\phi / dt$. Display\nmath should get its own line and be put in in double-dollarsigns:\n\n$$I = \int \rho R^{2} dV$$\n\nAnd note that you can backslash-escape any punctuation characters\nwhich you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.';";
    };
    CreateArticleGui.prototype.titlePreviewExample = function () {
        return 'How to write markdown';
    };
    return CreateArticleGui;
})(Gui);

if (guiName == 'CreateArticleGui') {
    new CreateArticleGui();
}
//# sourceMappingURL=create-article-gui.js.map

},{"./../common/url":15,"./client-ajax":2,"./gui":5,"./templates/previewable-article":12}],4:[function(require,module,exports){
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
            _self.article = new PreviewableArticle();
            _self.id = $("[type=hidden]#article-id").val();
            clientAjax.article.get({ id: _self.id }).done(function (res) {
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
            _self.saveBtn.jq.click(function () {
                var article = _self.article.article;
                clientAjax.article.update({
                    id: _self.id, title: article.title, content: article.content
                }).done(function (res) {
                    if (!res.ok)
                        console.log(res.why);
                    else
                        console.log('Se actualizo el articulo');
                    _self.redirect(url.article.get(_self.id));
                });
            });
            _self.cancelBtn.jq.click(function () {
                _self.redirect(url.article.get(_self.id));
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
    return EditArticleGui;
})(Gui);
exports.EditArticleGui = EditArticleGui;

if (guiName == 'EditArticleGui') {
    new EditArticleGui();
}
//# sourceMappingURL=edit-article-gui.js.map

},{"./../common/url":15,"./client-ajax":2,"./gui":5,"./templates/previewable-article":12}],5:[function(require,module,exports){
var Gui = (function () {
    function Gui() {
    }
    Gui.prototype.redirect = function (view) {
        window.location.href = view;
    };
    Gui.prototype.propertize = function (selector, valFnName) {
        var obj = {
            get jq() {
                return $(selector);
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

},{}],6:[function(require,module,exports){
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
                $("#article-thumb-template").remove();
                $("#main .childContainer").html(rendered);
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

},{"./../common/url":15,"./client-ajax":2,"./gui":5}],7:[function(require,module,exports){
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

},{"./parser":9}],8:[function(require,module,exports){
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

},{"./client-ajax":2,"./gui":5}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"./client-ajax":2,"./gui":5}],11:[function(require,module,exports){
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
            return { title: this.title.val, content: this.content.val };
        },
        enumerable: true,
        configurable: true
    });
    return EditableArticle;
})();

module.exports = EditableArticle;
//# sourceMappingURL=editable-article.js.map

},{}],12:[function(require,module,exports){
var RenderedArticle = require('./rendered-article');
var EditableArticle = require("./editable-article");

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
        bindScroll(this.input.content.jq, this.output.content.jq);
        bindScroll(this.output.content.jq, this.input.content.jq);
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
    return PreviewableArticle;
})();

module.exports = PreviewableArticle;
//# sourceMappingURL=previewable-article.js.map

},{"./editable-article":11,"./rendered-article":13}],13:[function(require,module,exports){
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
    return RenderedArticle;
})();

module.exports = RenderedArticle;
//# sourceMappingURL=rendered-article.js.map

},{}],14:[function(require,module,exports){
exports.AjaxType = {
    GET: "GET",
    POST: "POST"
};

(function (article) {
    function WrapFieldWithId(fields, id) {
        return { title: fields.title, content: fields.content, id: id };
    }
    article.WrapFieldWithId = WrapFieldWithId;

    (function (create) {
        function url() {
            return '/api/create_article';
        }
        create.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        create.type = type;
    })(article.create || (article.create = {}));
    var create = article.create;

    (function (get) {
        function url() {
            return '/api/get';
        }
        get.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        get.type = type;
    })(article.get || (article.get = {}));
    var get = article.get;

    (function (getAll) {
        function url() {
            return '/api/getall';
        }
        getAll.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        getAll.type = type;
    })(article.getAll || (article.getAll = {}));
    var getAll = article.getAll;

    (function (update) {
        function url() {
            return '/api/update';
        }
        update.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        update.type = type;
    })(article.update || (article.update = {}));
    var update = article.update;

    (function (queryTitle) {
        function url() {
            return '/api/querytitle';
        }
        queryTitle.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        queryTitle.type = type;
    })(article.queryTitle || (article.queryTitle = {}));
    var queryTitle = article.queryTitle;
})(exports.article || (exports.article = {}));
var article = exports.article;

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

},{}],15:[function(require,module,exports){
var url;
(function (url) {
    (function (article) {
        function get(id) {
            return (id != null ? "/article/" + id : "/article/:id");
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

},{}],16:[function(require,module,exports){
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

},{}]},{},[1,2,3,4,5,6,7,8,9,10,14,15,16]);
