var baseAjax = require('./../common/base-ajax');
var AjaxType = baseAjax.AjaxType;

function buildAjax(url, type, params) {
    switch (type) {
        case AjaxType.GET:
            return $.get(url, params);
            break;
        case AjaxType.POST:
            return $.post(url, params);
            break;
    }
}
exports.buildAjax = buildAjax;

(function (article) {
    var baseGet = baseAjax.article.get;
    function get(params) {
        return exports.buildAjax(baseGet.url(), baseGet.type(), params);
    }
    article.get = get;

    var baseCreate = baseAjax.article.create;
    function create(params) {
        return exports.buildAjax(baseCreate.url(), baseCreate.type(), params);
    }
    article.create = create;

    var baseGetAll = baseAjax.article.getAll;
    function getAll(params) {
        return exports.buildAjax(baseGetAll.url(), baseGetAll.type(), params);
    }
    article.getAll = getAll;

    var baseUpdate = baseAjax.article.update;
    function update(params) {
        return exports.buildAjax(baseUpdate.url(), baseUpdate.type(), params);
    }
    article.update = update;

    var baseQuery = baseAjax.article.queryTitle;
    function query(params) {
        return exports.buildAjax(baseQuery.url(), baseQuery.type(), params);
    }
    article.query = query;
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (user) {
    var baseRegister = baseAjax.user.register;
    function register(params) {
        return exports.buildAjax(baseRegister.url(), baseRegister.type(), params);
    }
    user.register = register;

    var baseAuth = baseAjax.user.auth;
    function auth(params) {
        return exports.buildAjax(baseAuth.url(), baseAuth.type(), params);
    }
    user.auth = auth;
})(exports.user || (exports.user = {}));
var user = exports.user;
//# sourceMappingURL=client-ajax.js.map
