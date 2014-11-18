var db = require('./db');
var keys = require('./redis-keys');

function add(articleId) {
    var versionId;
    debugger;
    return db.incr(keys.versionIdCounter({ articleId: articleId })).then(function (_versionId) {
        debugger;
        versionId = _versionId;
        return db.sadd(keys.versionIdSet({ articleId: articleId }), versionId);
    }).then(function (res) {
        debugger;
        return db.rename(keys.article({ articleId: articleId }), keys.version({ articleId: articleId, versionId: versionId }));
    });
}
exports.add = add;
//# sourceMappingURL=version.js.map
