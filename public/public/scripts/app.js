(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (m) {
    function _redirect(url) {
        throw new Error('Not Implemented Exception');
    }
    m.redirect = {
        to: {
            index: function () {
                _redirect('/index');
            }
        }
    };
})(exports.m || (exports.m = {}));
var m = exports.m;
//# sourceMappingURL=Utils.js.map

},{}],2:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CommonAjax = require('./../common/common-ajax');
var AjaxType = CommonAjax.AjaxType;

var ClientAjax = (function () {
    function ClientAjax(url, type) {
        this.url = url;
        this.type = type;
    }
    ClientAjax.prototype.ajax = function (params) {
        switch (this.type) {
            case AjaxType.GET:
                return $.get(this.url, params);
                break;
            case AjaxType.POST:
                return $.post(this.url, params);
                break;
        }
    };
    return ClientAjax;
})();
exports.ClientAjax = ClientAjax;

(function (Article) {
    var Art = CommonAjax.Article;
    var Get = (function (_super) {
        __extends(Get, _super);
        function Get() {
            _super.call(this, Art.Get.url(), Art.Get.type());
        }
        return Get;
    })(ClientAjax);
    Article.Get = Get;
    var Create = (function (_super) {
        __extends(Create, _super);
        function Create() {
            _super.call(this, Art.Create.url(), Art.Create.type());
        }
        return Create;
    })(ClientAjax);
    Article.Create = Create;
})(exports.Article || (exports.Article = {}));
var Article = exports.Article;

(function (GoTo) {
    function article(id) {
        location.href = '/article/' + id;
    }
    GoTo.article = article;

    function editArticle(id) {
        location.href = '/edit_article/' + id;
    }
    GoTo.editArticle = editArticle;
})(exports.GoTo || (exports.GoTo = {}));
var GoTo = exports.GoTo;
//# sourceMappingURL=client-ajax.js.map

},{"./../common/common-ajax":12}],3:[function(require,module,exports){
var ClientAjax = require("./client-ajax");
var parser = require('./parser');
var GoTo = ClientAjax.GoTo;

var EmbedArticleGui = (function () {
    function EmbedArticleGui() {
        this.id = "-1";
        var _self = this;
        $(document).ready(function () {
            var href = $(location).attr("href");
            _self.id = href.substr(href.lastIndexOf('/') + 1);
            new ClientAjax.Article.Get().ajax({ id: parseInt(_self.id) }).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                _self.setTitle(result.title);
                var arr = result.content.split("\n");
                var length = arr.length;
                for (var i = 0; i < length; i++) {
                    parser.parseToDiv(arr[i], i, _self.getContentId());
                }
            });
            _self.getEditBtn().click(function () {
                GoTo.editArticle(_self.id);
            });
        });
    }
    EmbedArticleGui.prototype.getContentId = function () {
        return "content";
    };
    EmbedArticleGui.prototype.setContent = function (content) {
        $('#' + this.getContentId()).html(content);
    };
    EmbedArticleGui.prototype.getContent = function () {
        return $('#' + this.getContentId()).val();
    };
    EmbedArticleGui.prototype.setTitle = function (title) {
        $("#title").html(title);
    };
    EmbedArticleGui.prototype.getTitle = function () {
        throw new Error('Not implemented yet');
    };
    EmbedArticleGui.prototype.getEditBtn = function () {
        return $("#editBtn");
    };
    return EmbedArticleGui;
})();
exports.EmbedArticleGui = EmbedArticleGui;

if (guiName == 'EmbedArticle') {
    new EmbedArticleGui();
}
//# sourceMappingURL=embed-article.js.map

},{"./client-ajax":2,"./parser":10}],4:[function(require,module,exports){
//# sourceMappingURL=embed-browse.js.map

},{}],5:[function(require,module,exports){
var ClientAjax = require("./client-ajax");

var EmbedCreateArticleGui = (function () {
    function EmbedCreateArticleGui() {
        var _this = this;
        $(document).ready(function () {
            console.log("ready!");
            $("#create").click(function () {
                debugger;
                console.log('Creando artículo');
                new ClientAjax.Article.Create().ajax({ content: _this.getContent(), title: _this.getTitle() }).done(function (res) {
                    console.log(res);
                });
            });
        });
    }
    EmbedCreateArticleGui.prototype.getContent = function () {
        return $("#content").val();
    };
    EmbedCreateArticleGui.prototype.getTitle = function () {
        return $("#title").val();
    };
    return EmbedCreateArticleGui;
})();

if (guiName == 'EmbedCreateArticle') {
    new EmbedCreateArticleGui();
}
//# sourceMappingURL=embed-create_article.js.map

},{"./client-ajax":2}],6:[function(require,module,exports){
var ClientAjax = require("./client-ajax");
var GoTo = ClientAjax.GoTo;

var EmbedEditArticleGui = (function () {
    function EmbedEditArticleGui() {
        this.id = "-1";
        var _self = this;
        $(document).ready(function () {
            _self.bindTitlePreview();
            _self.bindContentPreview();
            _self.titlePreviewExample();
            _self.contentPreviewExample();
            var href = $(location).attr("href");
            _self.id = href.substr(href.lastIndexOf('/') + 1);
            new ClientAjax.Article.Get().ajax({ id: parseInt(_self.id) }).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                _self.setTitle(result.title);
                _self.setContent(result.content);
            });
            _self.getSaveBtn().click(function () {
                GoTo.editArticle(_self.id);
            });
        });
    }
    EmbedEditArticleGui.prototype.contentPreviewExample = function () {
        var content = "An h1 header\n============\n\nParagraphs are separated by a blank line.\n\n2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists\nlook like:\n\n  * this one\n  * that one\n  * the other one\n\nNote that --- not considering the asterisk --- the actual text\ncontent starts at 4-columns in.\n\n> Block quotes are\n> written like so.\n>\n> They can span multiple paragraphs,\n> if you like.\n\nUse 3 dashes for an em-dash. Use 2 dashes for ranges (ex., \"it's all\nin chapters 12--14\"). Three dots ... will be converted to an ellipsis.\nUnicode is supported. ☺\n\n\n\nAn h2 header\n------------\n\nHere's a numbered list:\n\n 1. first item\n 2. second item\n 3. third item\n\nNote again how the actual text starts at 4 columns in (4 characters\nfrom the left side). Here's a code sample:\n\n    # Let me re-iterate ...\n    for i in 1 .. 10 { do-something(i) }\n\nAs you probably guessed, indented 4 spaces. By the way, instead of\nindenting the block, you can use delimited blocks, if you like:\n\n~~~\ndefine foobar() {\n    print \"Welcome to flavor country!\";\n}\n~~~\n\n(which makes copying & pasting easier). You can optionally mark the\ndelimited block for Pandoc to syntax highlight it:\n\n~~~python\nimport time\n# Quick, count to ten!\nfor i in range(10):\n    # (but not *too* quick)\n    time.sleep(0.5)\n    print i\n~~~\n\n\n\n### An h3 header ###\n\nNow a nested list:\n\n 1. First, get these ingredients:\n\n      * carrots\n      * celery\n      * lentils\n\n 2. Boil some water.\n\n 3. Dump everything in the pot and follow\n    this algorithm:\n\n        find wooden spoon\n        uncover pot\n        stir\n        cover pot\n        balance wooden spoon precariously on pot handle\n        wait 10 minutes\n        goto first step (or shut off burner when done)\n\n    Do not bump wooden spoon or it will fall.\n\nNotice again how text always lines up on 4-space indents (including\nthat last line which continues item 3 above).\n\nHere's a link to [a website](http://foo.bar), to a [local\ndoc](local-doc.html), and to a [section heading in the current\ndoc](#an-h2-header). Here's a footnote [^1].\n\n[^1]: Footnote text goes here.\n\nTables can look like this:\n\nsize  material      color\n----  ------------  ------------\n9     leather       brown\n10    hemp canvas   natural\n11    glass         transparent\n\nTable: Shoes, their sizes, and what they're made of\n\n(The above is the caption for the table.) Pandoc also supports\nmulti-line tables:\n\n--------  -----------------------\nkeyword   text\n--------  -----------------------\nred       Sunsets, apples, and\n          other red or reddish\n          things.\n\ngreen     Leaves, grass, frogs\n          and other things it's\n          not easy being.\n--------  -----------------------\n\nA horizontal rule follows.\n\n***\n\nHere's a definition list:\n\napples\n  : Good for making applesauce.\noranges\n  : Citrus!\ntomatoes\n  : There's no \"e\" in tomatoe.\n\nAgain, text is indented 4 spaces. (Put a blank line between each\nterm/definition pair to spread things out more.)\n\nHere's a \"line block\":\n\n| Line one\n|   Line too\n| Line tree\n\nand images can be specified like so:\n\n![example image](example-image.jpg \"An exemplary image\")\n\nInline math equations go in like so: $\omega = d\phi / dt$. Display\nmath should get its own line and be put in in double-dollarsigns:\n\n$$I = \int \rho R^{2} dV$$\n\nAnd note that you can backslash-escape any punctuation characters\nwhich you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.';";
        $("textarea.article-content").html(content);
        $("div.article-content").html(marked(content));
    };
    EmbedEditArticleGui.prototype.titlePreviewExample = function () {
        var title = 'How to write markdown';
        $("input.article-title").val(title);
        $("h1.article-title").html(title);
    };
    EmbedEditArticleGui.prototype.bindTitlePreview = function () {
        $("input.article-title").keyup(function (e) {
            var title = $("input.article-title").val();
            $("h1.article-title").html(title);
        });
    };
    EmbedEditArticleGui.prototype.bindContentPreview = function () {
        $("textarea.article-content").keyup(function (e) {
            var content = $("textarea.article-content").val();
            $("div.article-content").html(marked(content));
        });
    };
    EmbedEditArticleGui.prototype.getContentId = function () {
        return "content";
    };
    EmbedEditArticleGui.prototype.setTitle = function (title) {
        $("#title").html(title);
    };
    EmbedEditArticleGui.prototype.setContent = function (content) {
        $('#' + this.getContentId()).html(content);
    };
    EmbedEditArticleGui.prototype.getSaveBtn = function () {
        return $("#saveBtn");
    };
    return EmbedEditArticleGui;
})();
exports.EmbedEditArticleGui = EmbedEditArticleGui;

if (guiName == 'EmbedEditArticle') {
    new EmbedEditArticleGui();
}
//# sourceMappingURL=embed-edit_article.js.map

},{"./client-ajax":2}],7:[function(require,module,exports){
var UserJs = require("./../common/User");
var utils = require("./Utils");

var gui = {
    getUsername: function () {
        return $("#username").val();
    },
    getPassword: function () {
        return $("#password").val();
    },
    warnInvalidLogin: function () {
        $("#warnings").html('Could not login');
    },
    cleanWarnings: function () {
        $("#warnings").html('');
    }
};

$(document).ready(function () {
    var classes = {
        User: UserJs.UserJs.User,
        Utils: utils.m
    };

    console.log("ready!");
    $("#login").click(function () {
        console.log('Loggueando');
        gui.cleanWarnings();
        var user = new classes.User();
        user.logIn(gui.getUsername(), gui.getPassword(), function (err) {
            if (err) {
                gui.warnInvalidLogin();
            } else {
                classes.Utils.redirect.to.index();
            }
        });
    });
});
//# sourceMappingURL=embed-login.js.map

},{"./../common/User":11,"./Utils":1}],8:[function(require,module,exports){
//# sourceMappingURL=embed-register.js.map

},{}],9:[function(require,module,exports){
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

},{"./parser":10}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
(function (UserJs) {
    var User = (function () {
        function User() {
        }
        User.prototype.logIn = function (username, password, fn) {
            console.log('Loggueando al usuario: ' + username + ', password: ' + password);
            fn(new Error('Not Implemented Exception'));
        };
        User.prototype.isLogged = function () {
            throw new Error('Not implemented');
        };
        return User;
    })();
    UserJs.User = User;
})(exports.UserJs || (exports.UserJs = {}));
var UserJs = exports.UserJs;
//# sourceMappingURL=User.js.map

},{}],12:[function(require,module,exports){
exports.AjaxType = {
    GET: "GET",
    POST: "POST"
};

(function (Article) {
    (function (Create) {
        function url() {
            return '/api/create_article';
        }
        Create.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        Create.type = type;
    })(Article.Create || (Article.Create = {}));
    var Create = Article.Create;

    (function (Get) {
        function url() {
            return '/api/get';
        }
        Get.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        Get.type = type;
    })(Article.Get || (Article.Get = {}));
    var Get = Article.Get;
})(exports.Article || (exports.Article = {}));
var Article = exports.Article;

if (typeof customExports != 'undefined')
    customExports[getScriptName()] = exports;
//# sourceMappingURL=common-ajax.js.map

},{}]},{},[1,2,3,4,5,6,7,8,9,10,11,12]);
