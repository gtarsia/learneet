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
