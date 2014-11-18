import db = require('./db');
import keys = require('./redis-keys');

export function add(articleId: string): any {
    var versionId;
    debugger;
    return db.incr(keys.versionIdCounter({articleId: articleId}))
    .then((_versionId: string) => {
        debugger;
        versionId = _versionId;
        return db.sadd(keys.versionIdSet({articleId: articleId}), versionId)
    })
    .then((res: string) => {
        debugger;
        return db.rename(
            keys.article({articleId: articleId}), 
            keys.version({articleId: articleId, versionId: versionId}
        ));
    })
}
