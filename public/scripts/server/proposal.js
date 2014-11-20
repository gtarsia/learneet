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
    var proposal = args.proposal;
    var article = proposal.article;
    var changes;
    var id;
    debugger;
    return dbArticle.get({ article: article }).then(function (res) {
        debugger;
        if (!res.ok) {
            console.log(res.why);
            return;
        }
        var originalContent = res.result.content;
        changes = diff.createPatch('', originalContent, proposal.modifiedContent, '', '');
        return db.incr(keys.proposalsIdCounter({ article: article })).then(function (_id) {
            debugger;
            id = _id;
            return db.sadd(keys.proposalsIdSet({ article: article }), id);
        }).then(function () {
            debugger;
            var key = { article: { id: article.id }, proposal: { id: id } };
            var val = {
                changes: changes,
                description: proposal.description
            };
            return db.hmset(keys.proposal(key), val);
        }).then(function () {
            debugger;
            return exports.okObj(null);
        });
    });
}
exports.add = add;

function getAll(args) {
    var proposal = args.proposal;
    function arrayToProposals(array) {
        var proposals = [];
        var length = array.length;
        while (length > 0) {
            var id = array.shift();
            var changes = array.shift();
            var description = array.shift();
            length -= 3;
            proposals.push({ id: id, changes: changes, description: description });
        }
        return proposals;
    }
    return db.sort(keys.proposalsIdSet(args.proposal), 'by', 'nosort', 'GET', keys.proposalsNoSortField(args, 'id'), 'GET', keys.proposalsNoSortField(args, 'changes'), 'GET', keys.proposalsNoSortField(args, 'description')).then(function (result) {
        debugger;
        var ok = result != null;
        var why = (result == null ? 'Couldn\'t get articles' : '');
        var r = {
            ok: ok,
            why: why,
            result: { proposals: arrayToProposals(result) }
        };
        return r;
    });
}
exports.getAll = getAll;
//# sourceMappingURL=proposal.js.map
