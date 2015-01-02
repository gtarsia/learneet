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

    (function (get) {
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
        get.Ajax = Ajax;
    })(dependencies.get || (dependencies.get = {}));
    var get = dependencies.get;

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
