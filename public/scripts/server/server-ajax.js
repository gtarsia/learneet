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

(function (article) {
    var baseCreate = baseAjax.article.create;
    function create() {
        return exports.restCb(baseCreate.url(), baseCreate.type(), dbArticle.create);
    }
    article.create = create;

    var baseGet = baseAjax.article.get;
    function get() {
        return exports.restCb(baseGet.url(), baseGet.type(), dbArticle.get);
    }
    article.get = get;

    var baseGetAll = baseAjax.article.getAll;
    function getAll() {
        return exports.restCb(baseGetAll.url(), baseGetAll.type(), dbArticle.getAll);
    }
    article.getAll = getAll;

    var baseUpdate = baseAjax.article.update;
    function update() {
        return exports.restCb(baseUpdate.url(), baseUpdate.type(), dbArticle.update);
    }
    article.update = update;

    var baseQuery = baseAjax.article.queryTitle;
    function query() {
        return exports.restCb(baseQuery.url(), baseQuery.type(), dbArticle.TitleSearch.query);
    }
    article.query = query;

    var baseAddDependency = baseAjax.article.addDependency;
    function addDependency() {
        return exports.restCb(baseAddDependency.url(), baseAddDependency.type(), dbArticle.addDependency);
    }
    article.addDependency = addDependency;

    var baseGetDeps = baseAjax.article.getDependencies;
    function getDependencies() {
        return exports.restCb(baseGetDeps.url(), baseGetDeps.type(), dbArticle.getDependencies);
    }
    article.getDependencies = getDependencies;

    var baseRemDep = baseAjax.article.remDependency;
    function remDependency() {
        return exports.restCb(baseRemDep.url(), baseRemDep.type(), dbArticle.remDependency);
    }
    article.remDependency = remDependency;
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (proposal) {
    var baseAdd = baseAjax.proposal.add;
    function add() {
        return exports.restCb(baseAdd.url(), baseAdd.type(), dbProposal.add);
    }
    proposal.add = add;
})(exports.proposal || (exports.proposal = {}));
var proposal = exports.proposal;

(function (user) {
    var baseRegister = baseAjax.user.register;
    function register() {
        return exports.restCb(baseRegister.url(), baseRegister.type(), dbUser.register);
    }
    user.register = register;
})(exports.user || (exports.user = {}));
var user = exports.user;
//# sourceMappingURL=server-ajax.js.map
