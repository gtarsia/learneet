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
        user.register()
    ];
}
exports.getServerAjaxList = getServerAjaxList;

function buildAjax(url, type, handler) {
    return {
        setExpressAjax: function (app) {
            switch (type) {
                case AjaxType.GET:
                    app.get(url, handler);
                    break;
                case AjaxType.POST:
                    app.post(url, handler);
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
        return exports.buildAjax(baseQuery.url(), baseUpdate.type(), function (req, res) {
            dbArticle.TitleSearch.query(req.query).then(function (result) {
                res.send(result);
            });
        });
    }
    article.query = query;
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
