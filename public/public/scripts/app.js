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
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ClientAjax = require("./client-ajax");

var Gui = (function () {
    function Gui() {
        var href = $(location).attr("href");
        var id = href.substr(href.lastIndexOf('/') + 1);
        new ClientAjax.Article.Get().ajax({ id: parseInt(id) }).done(function () {
            console.log('Success');
        });
    }
    Gui.prototype.getContent = function () {
        return $("#content").val();
    };
    Gui.prototype.getTitle = function () {
        throw new Error('Not implemented yet');
    };
    return Gui;
})();

$(document).ready(function () {
    var gui = new Gui();
    console.log("ready!");
});
//# sourceMappingURL=embed-article.js.map

},{"./client-ajax":"/client-ajax.js"}]},{},[1]);

},{"./client-ajax":3}],3:[function(require,module,exports){
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
})(exports.Article || (exports.Article = {}));
var Article = exports.Article;
//# sourceMappingURL=client-ajax.js.map

},{"./../common/common-ajax":11}],4:[function(require,module,exports){
var ClientAjax = require("./client-ajax");

var EmbedArticleGui = (function () {
    function EmbedArticleGui() {
        var href = $(location).attr("href");
        var id = href.substr(href.lastIndexOf('/') + 1);
        var _self = this;
        new ClientAjax.Article.Get().ajax({ id: parseInt(id) }).done(function (res) {
            if (!res.ok) {
                console.log(res.why);
                return;
            }
            var result = res.result;
            _self.setTitle(result.title);
            _self.setContent(result.content);
        });
    }
    EmbedArticleGui.prototype.setContent = function (content) {
        $("#content").html(content);
    };
    EmbedArticleGui.prototype.getContent = function () {
        return $("#content").val();
    };
    EmbedArticleGui.prototype.setTitle = function (title) {
        $("#title").html(title);
    };
    EmbedArticleGui.prototype.getTitle = function () {
        throw new Error('Not implemented yet');
    };
    return EmbedArticleGui;
})();
exports.EmbedArticleGui = EmbedArticleGui;

if (guiName == 'EmbedArticle') {
    new EmbedArticleGui();
}
//# sourceMappingURL=embed-article.js.map

},{"./client-ajax":3}],5:[function(require,module,exports){
//# sourceMappingURL=embed-browse.js.map

},{}],6:[function(require,module,exports){
var Gui = (function () {
    function Gui() {
        $("#create").click(function () {
            console.log('Creando artículo');
        });
    }
    Gui.prototype.getContent = function () {
        return $("#content").val();
    };
    Gui.prototype.getTitle = function () {
        throw new Error('Not implemented yet');
    };
    return Gui;
})();

$(document).ready(function () {
    console.log("ready!");
});
//# sourceMappingURL=embed-create_article.js.map

},{}],7:[function(require,module,exports){
//# sourceMappingURL=embed-edit_article.js.map

},{}],8:[function(require,module,exports){
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

},{"./../common/User":10,"./Utils":1}],9:[function(require,module,exports){
//# sourceMappingURL=embed-register.js.map

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}]},{},[1,2,3,4,5,6,7,8,9]);
