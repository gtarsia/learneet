var baseAjax = require('./../common/base-ajax');

var AjaxType = baseAjax.AjaxType;
var dbArticle = require('./article');
var dbDependencies = require('./dependencies');
var dbUser = require('./user');
var dbProposal = require('./proposal');

function getServerAjaxList() {
    return [
        article.create(),
        article.get(),
        article.getAll(),
        article.update(),
        article.query(),
        dependencies.add(),
        dependencies.get(),
        dependencies.remove(),
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
        return exports.restCbAjax(new _get.Ajax(), dbArticle.get);
    }
    article.get = get;

    var _getAll = baseAjax.article.getAll;
    function getAll() {
        return exports.restCbAjax(new _getAll.Ajax(), dbArticle.getAll);
    }
    article.getAll = getAll;

    var _update = baseAjax.article.update;
    function update() {
        return exports.restCbAjax(new _update.Ajax(), dbArticle.update);
    }
    article.update = update;

    var _query = baseAjax.article.queryTitle;
    function query() {
        return exports.restCbAjax(new _query.Ajax(), dbArticle.TitleSearch.query);
    }
    article.query = query;

    var _getScore = baseAjax.article.getScore;
    function getScore() {
        return exports.restCbAjax(new _getScore.Ajax(), dbArticle.getScore);
    }
    article.getScore = getScore;
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (dependencies) {
    var _add = baseAjax.dependencies.add;
    function add() {
        return exports.restCbAjax(new _add.Ajax(), dbDependencies.add);
    }
    dependencies.add = add;

    var _get = baseAjax.dependencies.get;
    function get() {
        return exports.restCbAjax(new _get.Ajax(), dbDependencies.get);
    }
    dependencies.get = get;

    var _remove = baseAjax.dependencies.remove;
    function remove() {
        return exports.restCbAjax(new _remove.Ajax(), dbDependencies.remove);
    }
    dependencies.remove = remove;
})(exports.dependencies || (exports.dependencies = {}));
var dependencies = exports.dependencies;

(function (proposal) {
    var _add = baseAjax.proposal.add;
    function add() {
        return exports.restCbAjax(new _add.Ajax(), dbProposal.add);
    }
    proposal.add = add;

    var _getAll = baseAjax.proposal.getAll;
    function getAll() {
        return exports.restCbAjax(new _getAll.Ajax(), dbProposal.getAll);
    }
    proposal.getAll = getAll;
})(exports.proposal || (exports.proposal = {}));
var proposal = exports.proposal;

(function (user) {
    var _register = baseAjax.user.register;
    function register() {
        return exports.restCbAjax(new _register.Ajax(), dbUser.register);
    }
    user.register = register;
})(exports.user || (exports.user = {}));
var user = exports.user;
//# sourceMappingURL=server-ajax.js.map
