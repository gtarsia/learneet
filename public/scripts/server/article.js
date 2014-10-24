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
        idOuter = id;
        return db.hmset("article:" + id, args);
    }).then(function (result) {
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
//# sourceMappingURL=article.js.map
