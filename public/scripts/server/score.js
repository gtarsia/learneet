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
    var up;
    return db.scard(keys.articleUpScore(args)).then(function (_up) {
        up = _up;
        return db.scard(keys.articleDownScore(args));
    }).then(function (down) {
        return exports.okObj({ article: { score: up - down } });
    });
}
exports.get = get;

function up(args) {
    return db.sadd(keys.articleUpScore(args), "1").then(function (res) {
        return db.srem(keys.articleDownScore(args), "1");
    }).then(function (res) {
        return exports.okObj(true);
    });
}
exports.up = up;

function removeUp(args) {
    return db.srem(keys.articleUpScore(args), "1").then(function (res) {
        return exports.okObj(true);
    });
}
exports.removeUp = removeUp;

function down(args) {
    return db.sadd(keys.articleDownScore(args), "1").then(function (res) {
        return db.srem(keys.articleUpScore(args), "1");
    }).then(function (res) {
        return exports.okObj(true);
    });
}
exports.down = down;

function removeDown(args) {
    return db.srem(keys.articleDownScore(args), "1").then(function (res) {
        return exports.okObj(true);
    });
}
exports.removeDown = removeDown;

function getByUser(args) {
    var isUpScoreMember;
    return db.sismember(keys.articleUpScore(args), "1").then(function (isMember) {
        isUpScoreMember = isMember;
        return db.sismember(keys.articleDownScore(args), "1");
    }).then(function (isDownScoreMember) {
        var article = { score: 0 };
        if (isUpScoreMember)
            article.score = 1;
        else if (isDownScoreMember)
            article.score = -1;
        else
            article.score = 0;
        return exports.okObj({ article: article });
    });
}
exports.getByUser = getByUser;
//# sourceMappingURL=score.js.map
