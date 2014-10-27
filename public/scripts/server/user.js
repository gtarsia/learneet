var db = require('./db');
var bcrypt = require('./bcrypt');

function register(params) {
    var id;
    var hash;
    return bcrypt.genSalt(10).then(function (salt) {
        return bcrypt.hash(salt);
    }).then(function (_hash) {
        hash = _hash;
        return db.incr("user:ids");
    }).then(function (_id) {
        id = _id;
        return db.hmset("user:" + id, {
            username: params.username,
            hash: hash,
            id: id,
            email: params.email
        });
    }).then(function (res) {
        return {
            ok: true,
            why: '',
            result: (res == 'OK')
        };
    });
}
exports.register = register;

function auth(username, password) {
}
exports.auth = auth;
//# sourceMappingURL=user.js.map
