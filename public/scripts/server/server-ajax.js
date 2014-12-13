var baseAjax = require('./../common/base-ajax');

var AjaxType = baseAjax.AjaxType;
var dbArticle = require('./article');
var dbUser = require('./user');
var dbProposal = require('./proposal');

function getServerAjaxList() {
    return [
        article.create(),
        article.get(),
        article.getAll(),
        article.update(),
        article.query(),
        article.addDependency(),
        article.getDependencies(),
        article.remDependency(),
        article.getScore(),
        proposal.add(),
        proposal.getAll(),
        user.register()
    ];
}
exports.getServerAjaxList = getServerAjaxList;

function restCb(url, type, fn) {
    function parsingHandler() {
        return function (req, res) {
            var params;
            if (type == AjaxType.GET)
                params = JSON.parse(req.query.p);
            else if (type == AjaxType.POST)
                params = JSON.parse(req.body.p);
            fn(params).then(function (result) {
                res.send(result);
            });
        };
    }
    return {
        setExpressAjax: function (app) {
            switch (type) {
                case AjaxType.GET:
                    app.get(url, parsingHandler());
                    break;
                case AjaxType.POST:
                    app.post(url, parsingHandler());
                    break;
            }
        }
    };
}
exports.restCb = restCb;

function restCbAjax(ajax, fn) {
    return exports.restCb(ajax.url(), ajax.type(), fn);
}
exports.restCbAjax = restCbAjax;

(function (article) {
    var _create = baseAjax.article.create;
    function create() {
        return exports.restCbAjax(new _create.Ajax(), dbArticle.create);
    }
    article.create = create;

    var _get = baseAjax.article.get;
    function get() {
        return exports.restCb(_get.url(), _get.type(), dbArticle.get);
    }
    article.get = get;

    var _getAll = baseAjax.article.getAll;
    function getAll() {
        return exports.restCb(_getAll.url(), _getAll.type(), dbArticle.getAll);
    }
    article.getAll = getAll;

    var _Update = baseAjax.article.update;
    function update() {
        return exports.restCb(_Update.url(), _Update.type(), dbArticle.update);
    }
    article.update = update;

    var _Query = baseAjax.article.queryTitle;
    function query() {
        return exports.restCb(_Query.url(), _Query.type(), dbArticle.TitleSearch.query);
    }
    article.query = query;

    var _AddDependency = baseAjax.article.addDependency;
    function addDependency() {
        return exports.restCb(_AddDependency.url(), _AddDependency.type(), dbArticle.addDependency);
    }
    article.addDependency = addDependency;

    var _getDeps = baseAjax.article.getDependencies;
    function getDependencies() {
        return exports.restCb(_getDeps.url(), _getDeps.type(), dbArticle.getDependencies);
    }
    article.getDependencies = getDependencies;

    var _getScore = baseAjax.article.getScore;
    function getScore() {
        return exports.restCb(_getScore.url(), _getScore.type(), dbArticle.getScore);
    }
    article.getScore = getScore;

    var _RemDep = baseAjax.article.remDependency;
    function remDependency() {
        return exports.restCb(_RemDep.url(), _RemDep.type(), dbArticle.remDependency);
    }
    article.remDependency = remDependency;
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (proposal) {
    var _Add = baseAjax.proposal.add;
    function add() {
        return exports.restCb(_Add.url(), _Add.type(), dbProposal.add);
    }
    proposal.add = add;

    var _getAll = baseAjax.proposal.getAll;
    function getAll() {
        return exports.restCb(_getAll.url(), _getAll.type(), dbProposal.getAll);
    }
    proposal.getAll = getAll;
})(exports.proposal || (exports.proposal = {}));
var proposal = exports.proposal;

(function (user) {
    var _Register = baseAjax.user.register;
    function register() {
        return exports.restCb(_Register.url(), _Register.type(), dbUser.register);
    }
    user.register = register;
})(exports.user || (exports.user = {}));
var user = exports.user;
//# sourceMappingURL=server-ajax.js.map
