var db = require('./db');
var keys = require('./redis-keys');

function isOk(err, reject) {
    if (err) {
        reject(err);
        return false;
    } else
        return true;
}

function notOkObj(reason) {
    return {
        ok: false,
        why: reason
    };
}
exports.notOkObj = notOkObj;

function okObj(obj) {
    return {
        ok: true,
        why: '',
        result: obj
    };
}
exports.okObj = okObj;
function add(args) {
    var dependent = args.dependent;
    var dependency = args.dependency;
    return db.sadd(keys.dependency(args)).then(function (res) {
        return exports.okObj(res == '1');
    });
}
exports.add = add;

function get(args) {
    var article = args.article;
    return db.sort('article:' + article.id + ':dependencies', 'by', 'nosort', 'GET', 'article:*->id', 'GET', 'articles:*->title').then(function (array) {
        var articles = [];
        while (array.length > 0) {
            var id = array.shift();
            var title = array.shift();
            articles.push({ id: id, title: title });
        }
        return exports.okObj(articles);
    });
}
exports.get = get;

function remove(args) {
    var dependent = args.dependent;
    var dependency = args.dependency;
    return db.srem(keys.dependency(args)).then(function (res) {
        return exports.okObj(res == '1');
    });
}
exports.remove = remove;
//# sourceMappingURL=dependencies.js.map
