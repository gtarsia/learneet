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

function get(username) {
    return db.hgetall("user:" + username);
}
exports.get = get;

function auth(params) {
    var user;
    return db.hgetall("user:" + params.username).then(function (_user) {
        user = _user;
        return bcrypt.compare(params.password, user.hash);
    }).then(function (result) {
        return {
            why: (result ? '' : 'Invalid authentication'),
            ok: result,
            result: user
        };
    });
}
exports.auth = auth;
//# sourceMappingURL=user.js.map
