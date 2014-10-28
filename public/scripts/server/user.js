var db = require('./db');
var bcrypt = require('./bcrypt');

function hash(password) {
    return bcrypt.genSalt(10).then(function (salt) {
        return bcrypt.hash(password, salt);
    });
}
exports.hash = hash;

function register(params) {
    var id;
    var hashed;
    return exports.hash(params.password).then(function (_hash) {
        hashed = _hash;
        return db.hmset("user:" + params.username, {
            username: params.username,
            hash: hashed,
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

function auth(params) {
    return db.hget("user:" + params.username, "hash").then(function (hash) {
        return bcrypt.compare(params.password, hash);
    }).then(function (result) {
        return {
            why: (result ? '' : 'Invalid authentication'),
            ok: result,
            result: result
        };
    });
}
exports.auth = auth;
//# sourceMappingURL=user.js.map
