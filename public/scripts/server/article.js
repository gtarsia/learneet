var db = require('./db');

function isOk(err, reject) {
    if (err) {
        reject(err);
        return false;
    } else
        return true;
}

function create(args) {
    var idOuter;
    return db.incr("articleId").then(function (id) {
        debugger;
        idOuter = id;
        return db.hmset("article:" + id, args);
    }).then(function (result) {
        debugger;
        var r = {
            ok: true,
            why: '',
            result: {
                id: idOuter
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
            var title = array.shift();
            var content = array.shift();
            articles.push({ title: title, content: content });
        }
        return articles;
    }
    return db.sort('ids', 'by', 'nosort', 'get', 'article:*->title', 'GET', 'article:*->content').then(function (result) {
        debugger;
        var ok = result != null;
        var why = (result == null ? 'Article with id ' + result.id + ' not found' : '');
        var r = {
            ok: ok,
            why: why,
            result: arrayToArticles(result)
        };
        return r;
    });
}
exports.getAll = getAll;
//# sourceMappingURL=article.js.map
