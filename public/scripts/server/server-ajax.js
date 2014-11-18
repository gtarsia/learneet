var baseAjax = require('./../common/base-ajax');

var AjaxType = baseAjax.AjaxType;
var dbArticle = require('./article');
var dbUser = require('./user');

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
        user.register()
    ];
}
exports.getServerAjaxList = getServerAjaxList;

function buildAjax(url, type, handler) {
    function parsingHandler() {
        return function (req, res) {
            if (type == AjaxType.GET)
                req.query = JSON.parse(req.query.p);
            else if (type == AjaxType.POST)
                req.body = JSON.parse(req.body.p);
            handler(req, res);
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
exports.buildAjax = buildAjax;

(function (article) {
    var baseCreate = baseAjax.article.create;
    function create() {
        return exports.buildAjax(baseCreate.url(), baseCreate.type(), function (req, res) {
            dbArticle.create(req.body).then(function (result) {
                res.send(result);
            });
        });
    }
    article.create = create;

    var baseGet = baseAjax.article.get;
    function get() {
        return exports.buildAjax(baseGet.url(), baseGet.type(), function (req, res) {
            dbArticle.get(req.query).then(function (result) {
                res.send(result);
            });
        });
    }
    article.get = get;

    var baseGetAll = baseAjax.article.getAll;
    function getAll() {
        return exports.buildAjax(baseGetAll.url(), baseGetAll.type(), function (req, res) {
            dbArticle.getAll().then(function (result) {
                res.send(result);
            });
        });
    }
    article.getAll = getAll;

    var baseUpdate = baseAjax.article.update;
    function update() {
        return exports.buildAjax(baseUpdate.url(), baseUpdate.type(), function (req, res) {
            dbArticle.update(req.body).then(function (result) {
                res.send(result);
            });
        });
    }
    article.update = update;

    var baseQuery = baseAjax.article.queryTitle;
    function query() {
        return exports.buildAjax(baseQuery.url(), baseQuery.type(), function (req, res) {
            debugger;
            dbArticle.TitleSearch.query(req.query).then(function (result) {
                res.send(result);
            });
        });
    }
    article.query = query;

    var baseAddDependency = baseAjax.article.addDependency;
    function addDependency() {
        return exports.buildAjax(baseAddDependency.url(), baseAddDependency.type(), function (req, res) {
            debugger;
            dbArticle.addDependency(req.body).then(function (result) {
                debugger;
                res.send(result);
            });
        });
    }
    article.addDependency = addDependency;

    var baseGetDeps = baseAjax.article.getDependencies;
    function getDependencies() {
        return exports.buildAjax(baseGetDeps.url(), baseGetDeps.type(), function (req, res) {
            dbArticle.getDependencies(req.query).then(function (result) {
                res.send(result);
            });
        });
    }
    article.getDependencies = getDependencies;

    var baseRemDep = baseAjax.article.remDependency;
    function remDependency() {
        return exports.buildAjax(baseRemDep.url(), baseRemDep.type(), function (req, res) {
            debugger;
            dbArticle.remDependency(req.body).then(function (result) {
                res.send(result);
            });
        });
    }
    article.remDependency = remDependency;
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (user) {
    var baseRegister = baseAjax.user.register;
    function register() {
        return exports.buildAjax(baseRegister.url(), baseRegister.type(), function (req, res) {
            dbUser.register(req.body).then(function (result) {
                res.send(result);
            });
        });
    }
    user.register = register;
})(exports.user || (exports.user = {}));
var user = exports.user;
//# sourceMappingURL=server-ajax.js.map
