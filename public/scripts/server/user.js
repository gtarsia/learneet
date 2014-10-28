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

function auth(username, password) {
    return db.hget("user:" + username, "hash").then(function (hash) {
        return bcrypt.compare(password, hash);
    }).then(function (result) {
        console.log(result);
    });
}
exports.auth = auth;
//# sourceMappingURL=user.js.map
