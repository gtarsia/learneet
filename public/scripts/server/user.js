var db = require('./db');
var bcrypt = require('./bcrypt');

function hash() {
    return bcrypt.genSalt(10).then(function (salt) {
        return bcrypt.hash(salt);
    });
}
exports.hash = hash;

function register(params) {
    var id;
    var hash;
    return hash(params.password).then(function (_hash) {
        hash = _hash;
        return db.incr("user:ids");
    }).then(function (_id) {
        id = _id;
        return db.hmset("user:" + id, {
            username: params.username,
            hash: hash,
            id: id,
            email: params.email,
            activated: false
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
