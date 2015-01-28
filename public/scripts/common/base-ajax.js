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
        ;
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
        ;
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
        ;
        ;
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
                return '/api/auth';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.POST;
            };
            return Ajax;
        })();
        auth.Ajax = Ajax;
        ;
    })(user.auth || (user.auth = {}));
    var auth = user.auth;

    (function (get) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/get_user';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        get.Ajax = Ajax;
        ;
    })(user.get || (user.get = {}));
    var get = user.get;
})(exports.user || (exports.user = {}));
var user = exports.user;

(function (avatar) {
    (function (get) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.url = function () {
                return '/api/get_avatar';
            };
            Ajax.prototype.type = function () {
                return exports.AjaxType.GET;
            };
            return Ajax;
        })();
        get.Ajax = Ajax;
        ;
    })(avatar.get || (avatar.get = {}));
    var get = avatar.get;
})(exports.avatar || (exports.avatar = {}));
var avatar = exports.avatar;

if (typeof customExports != 'undefined')
    customExports[getScriptName()] = exports;
//# sourceMappingURL=base-ajax.js.map
