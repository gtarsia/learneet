var db = require('./db');
var keys = require('./redis-keys');

var dbArticle = require('./article');

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
    var article = args.article;
    var id;
    var changes;
    return dbArticle.get(args).then(function () {
        db.incr(keys.proposalsIdCounter(args));
    }).then(function (_id) {
        id = _id;
    }).then(function () {
        var key = { article: args.article, proposal: { id: id } };
        var val = { changes: article.changes, description: article.description };
        return db.hmset(keys.proposal(key), val);
    }).then(function () {
        return exports.okObj(null);
    });
}
exports.add = add;
//# sourceMappingURL=proposal.js.map
