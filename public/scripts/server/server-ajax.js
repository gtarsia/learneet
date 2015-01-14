var baseAjax = require('./../common/base-ajax');

var AjaxType = baseAjax.AjaxType;
var dbArticle = require('./article');
var dbDependencies = require('./dependencies');
var dbChanges = require('./changes');
var dbScore = require('./score');
var dbUser = require('./user');

function getServerAjaxList() {
    return [
        article.create(),
        article.get(),
        article.getAll(),
        article.getTitleWithId(),
        article.update(),
        article.query(),
        dependencies.add(),
        dependencies.getAll(),
        dependencies.getCurrentUserScore(),
        dependencies.remove(),
        changes.getAll(),
        changes.get(),
        changes.getScore(),
        changes.getScoreByUser(),
        changes.upVote(),
        changes.removeUpVote(),
        score.get(),
        score.up(),
        score.removeUp(),
        score.down(),
        score.removeDown(),
        score.getByUser(),
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

    var _getTitleWithId = baseAjax.article.getTitleWithId;
    function getTitleWithId() {
        return exports.restCbAjax(new _getTitleWithId.Ajax(), dbArticle.getTitleWithId);
    }
    article.getTitleWithId = getTitleWithId;

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
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (score) {
    var _get = baseAjax.score.get;
    function get() {
        return exports.restCbAjax(new _get.Ajax(), dbScore.get);
    }
    score.get = get;

    var _up = baseAjax.score.up;
    function up() {
        return exports.restCbAjax(new _up.Ajax(), dbScore.up);
    }
    score.up = up;

    var _removeUp = baseAjax.score.removeUp;
    function removeUp() {
        return exports.restCbAjax(new _removeUp.Ajax(), dbScore.removeUp);
    }
    score.removeUp = removeUp;

    var _down = baseAjax.score.down;
    function down() {
        return exports.restCbAjax(new _down.Ajax(), dbScore.down);
    }
    score.down = down;

    var _removeDown = baseAjax.score.removeDown;
    function removeDown() {
        return exports.restCbAjax(new _removeDown.Ajax(), dbScore.removeDown);
    }
    score.removeDown = removeDown;

    var _getByUser = baseAjax.score.getByUser;
    function getByUser() {
        return exports.restCbAjax(new _getByUser.Ajax(), dbScore.getByUser);
    }
    score.getByUser = getByUser;
})(exports.score || (exports.score = {}));
var score = exports.score;

(function (changes) {
    var _getAll = baseAjax.changes.getAll;
    function getAll() {
        return exports.restCbAjax(new _getAll.Ajax(), dbChanges.getAll);
    }
    changes.getAll = getAll;

    var _get = baseAjax.changes.get;
    function get() {
        return exports.restCbAjax(new _get.Ajax(), dbChanges.get);
    }
    changes.get = get;

    var _getScore = baseAjax.changes.getScore;
    function getScore() {
        return exports.restCbAjax(new _getScore.Ajax(), dbChanges.getScore);
    }
    changes.getScore = getScore;

    var _getScoreByUser = baseAjax.changes.getScoreByUser;
    function getScoreByUser() {
        return exports.restCbAjax(new _getScoreByUser.Ajax(), dbChanges.getScoreByUser);
    }
    changes.getScoreByUser = getScoreByUser;

    var _upVote = baseAjax.changes.upVote;
    function upVote() {
        return exports.restCbAjax(new _upVote.Ajax(), dbChanges.upVote);
    }
    changes.upVote = upVote;

    var _removeUpVote = baseAjax.changes.removeUpVote;
    function removeUpVote() {
        return exports.restCbAjax(new _removeUpVote.Ajax(), dbChanges.removeUpVote);
    }
    changes.removeUpVote = removeUpVote;
})(exports.changes || (exports.changes = {}));
var changes = exports.changes;

(function (dependencies) {
    var _add = baseAjax.dependencies.add;
    function add() {
        return exports.restCbAjax(new _add.Ajax(), dbDependencies.add);
    }
    dependencies.add = add;

    var _getAll = baseAjax.dependencies.getAll;
    function getAll() {
        return exports.restCbAjax(new _getAll.Ajax(), dbDependencies.getAll);
    }
    dependencies.getAll = getAll;

    var _getCurrentUserScore = baseAjax.dependencies.getCurrentUserScore;
    function getCurrentUserScore() {
        return exports.restCbAjax(new _getCurrentUserScore.Ajax(), dbDependencies.getCurrentUserScore);
    }
    dependencies.getCurrentUserScore = getCurrentUserScore;

    var _remove = baseAjax.dependencies.remove;
    function remove() {
        return exports.restCbAjax(new _remove.Ajax(), dbDependencies.remove);
    }
    dependencies.remove = remove;
})(exports.dependencies || (exports.dependencies = {}));
var dependencies = exports.dependencies;

(function (user) {
    var _register = baseAjax.user.register;
    function register() {
        return exports.restCbAjax(new _register.Ajax(), dbUser.register);
    }
    user.register = register;
})(exports.user || (exports.user = {}));
var user = exports.user;
//# sourceMappingURL=server-ajax.js.map
