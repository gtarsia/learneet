var baseAjax = require('./../common/base-ajax');

function buildAjax(url, type, data, opts) {
    var _obj = { p: JSON.stringify(data) };
    var _opts = opts || {};
    _opts.type = type;
    _opts.data = _obj;
    return $.ajax(url, _opts);
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
