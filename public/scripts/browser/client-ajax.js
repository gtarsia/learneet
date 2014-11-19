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

(function (_article) {
    var baseGet = baseAjax.article.get;
    function get(params) {
        return exports.buildAjax(baseGet.url(), baseGet.type(), params);
    }
    _article.get = get;

    var baseCreate = baseAjax.article.create;
    function create(params) {
        return exports.buildAjax(baseCreate.url(), baseCreate.type(), params);
    }
    _article.create = create;

    var baseGetAll = baseAjax.article.getAll;
    function getAll(params) {
        return exports.buildAjax(baseGetAll.url(), baseGetAll.type(), params);
    }
    _article.getAll = getAll;

    var baseUpdate = baseAjax.article.update;
    function update(params) {
        return exports.buildAjax(baseUpdate.url(), baseUpdate.type(), params);
    }
    _article.update = update;

    var baseQuery = baseAjax.article.queryTitle;
    function query(params) {
        return exports.buildAjax(baseQuery.url(), baseQuery.type(), params);
    }
    _article.query = query;

    var baseAddDep = baseAjax.article.addDependency;
    function addDependency(params) {
        return exports.buildAjax(baseAddDep.url(), baseAddDep.type(), params);
    }
    _article.addDependency = addDependency;

    var baseGetDeps = baseAjax.article.getDependencies;
    function getDependencies(params) {
        return exports.buildAjax(baseGetDeps.url(), baseGetDeps.type(), params);
    }
    _article.getDependencies = getDependencies;

    var baseRemDep = baseAjax.article.remDependency;
    function remDependency(params) {
        return exports.buildAjax(baseRemDep.url(), baseRemDep.type(), params);
    }
    _article.remDependency = remDependency;
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
