var db = require('./db');
var keys = require('./redis-keys');

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

function getAll(args) {
    function arrayToChanges(array) {
        debugger;
        var changes = [];
        var length = array.length;
        while (length > 0) {
            var id = array.shift();
            var state = array.shift();
            var description = array.shift();
            var _changes = array.shift();
            var date = array.shift();
            var author = array.shift();
            length -= 6;
            changes.push({
                id: id, state: state, description: description,
                changes: _changes, date: date, author: author
            });
        }
        return changes;
    }
    var baseKey = keys.changesBase(args) + ':*->';
    return db.sort(keys.changesIdSet(args), 'by', 'nosort', 'GET', baseKey + 'id', 'GET', baseKey + 'state', 'GET', baseKey + 'description', 'GET', baseKey + 'changes', 'GET', baseKey + 'date', 'GET', baseKey + 'author').then(function (result) {
        var ok = result != null;
        var why = (result == null ? 'Couldn\'t get changes' : '');
        var r = {
            ok: ok,
            why: why,
            result: arrayToChanges(result)
        };
        return r;
    });
}
exports.getAll = getAll;

function get(args) {
    return db.hgetall(keys.change(args)).then(function (result) {
        var ok = result != null;
        var why = (result == null ? 'Couldn\'t get the change' : '');
        var r = {
            ok: ok, why: why, result: result
        };
        return r;
    });
}
exports.get = get;

function getScore(args) {
    return db.scard(keys.changeUpScore(args)).then(function (result) {
        return (result == null ? exports.notOkObj('Couldn\'t retrieve the score of the change') : exports.okObj({ change: { score: result } }));
    });
}
exports.getScore = getScore;

function getScoreByUser(args) {
    return db.sismember(keys.changeUpScore(args), "1").then(function (isMember) {
        if (isMember)
            return exports.okObj(true);
        else
            return exports.okObj(false);
    });
}
exports.getScoreByUser = getScoreByUser;

function upVote(args) {
    return db.sadd(keys.changeUpScore(args), "1").then(function (result) {
        return (result == null ? exports.notOkObj('Couldn\'t up vote the change') : exports.okObj(true));
    });
}
exports.upVote = upVote;

function removeUpVote(args) {
    return db.srem(keys.changeUpScore(args), "1").then(function (result) {
        return (result == null ? exports.notOkObj('Couldn\'t remove the change up vote') : exports.okObj(true));
    });
}
exports.removeUpVote = removeUpVote;
//# sourceMappingURL=changes.js.map
