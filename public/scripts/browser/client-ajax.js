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

    var _get = baseAjax.dependencies.get;
    function get(params) {
        return exports.buildIAjax(new _get.Ajax(), params);
    }
    dependencies.get = get;

    var _remove = baseAjax.dependencies.remove;
    function remove(params) {
        return exports.buildIAjax(new _remove.Ajax(), params);
    }
    dependencies.remove = remove;
})(exports.dependencies || (exports.dependencies = {}));
var dependencies = exports.dependencies;

(function (proposal) {
    var _add = baseAjax.proposal.add;
    function add(params) {
        return exports.buildIAjax(new _add.Ajax(), params);
    }
    proposal.add = add;

    var _getAll = baseAjax.proposal.getAll;
    function getAll(params) {
        return exports.buildIAjax(new _getAll.Ajax(), params);
    }
    proposal.getAll = getAll;
})(exports.proposal || (exports.proposal = {}));
var proposal = exports.proposal;

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
