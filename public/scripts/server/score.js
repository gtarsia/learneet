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

function get(args) {
    return db.scard(keys.articleScore(args)).then(function (res) {
        return exports.okObj({ article: { score: res } });
    });
}
exports.get = get;
//# sourceMappingURL=score.js.map
