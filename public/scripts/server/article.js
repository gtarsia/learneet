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

function get(key) {
    console.log('key ' + key);
    return db.hgetall("article:" + key.toString()).then(function (result) {
        debugger;
        var r = {
            ok: true,
            why: '',
            result: result
        };
        return r;
    });
}
exports.get = get;
//# sourceMappingURL=article.js.map
