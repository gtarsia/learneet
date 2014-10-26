var commonAjax = require('./../common/common-ajax');

var Article = commonAjax.Article;

var db = require('./db');

function isOk(err, reject) {
    if (err) {
        reject(err);
        return false;
    } else
        return true;
}

function create(args) {
    var id;
    return db.incr("articleId").then(function (_id) {
        debugger;
        id = _id;
        return db.rpush("article:ids", id);
    }).then(function () {
        debugger;
        return db.hmset("article:" + id, Article.WrapFieldWithId(args, id));
    }).then(function (result) {
        debugger;
        var r = {
            ok: true,
            why: '',
            result: {
                id: id
            }
        };
        return r;
    });
}
exports.create = create;

function get(args) {
    return db.hgetall("article:" + args.id.toString()).then(function (result) {
        debugger;
        var ok = result != null;
        var why = (result == null ? 'Article with id ' + args.id + ' not found' : '');
        var r = {
            ok: ok,
            why: why,
            result: result
        };
        return r;
    });
}
exports.get = get;

function getAll() {
    function arrayToArticles(array) {
        var articles = [];
        while (array.length > 0) {
            var id = array.shift();
            var title = array.shift();
            var content = array.shift();
            articles.push({ id: id, title: title, content: content });
        }
        return articles;
    }
    return db.sort('article:ids', 'by', 'nosort', 'GET', 'article:*->id', 'GET', 'article:*->title', 'GET', 'article:*->content').then(function (result) {
        debugger;
        var ok = result != null;
        var why = (result == null ? 'Couldn\'t get articles' : '');
        var r = {
            ok: ok,
            why: why,
            result: arrayToArticles(result)
        };
        return r;
    });
}
exports.getAll = getAll;

function update(args) {
    return db.hmset("article:" + args.id, args).then(function (result) {
        var ok = result != null;
        var why = (result == null ? 'Article with id ' + args.id + ' not found' : '');
        var r = {
            ok: ok,
            why: why,
            result: result
        };
        return r;
    });
}
exports.update = update;
//# sourceMappingURL=article.js.map
