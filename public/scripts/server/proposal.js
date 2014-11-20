var db = require('./db');
var keys = require('./redis-keys');

var dbArticle = require('./article');
var diff = require('diff');

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
    var changes;
    var id;
    return dbArticle.get(args).then(function (res) {
        debugger;
        if (!res.ok) {
            console.log(res.why);
            return;
        }
        var originalContent = res.result.content;
        changes = diff.diffLines(originalContent, args.article.modifiedContent);
        return db.incr(keys.proposalsIdCounter(args)).then(function (_id) {
            debugger;
            id = _id;
            return db.sadd(keys.proposalsIdSet(args));
        }).then(function () {
            debugger;
            var key = { article: args.article, proposal: { id: id } };
            var val = {
                changes: changes,
                description: article.description
            };
            return db.hmset(keys.proposal(key), val);
        }).then(function () {
            debugger;
            return exports.okObj(null);
        });
    });
}
exports.add = add;
//# sourceMappingURL=proposal.js.map
