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
        return exports.create({
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

function create(user) {
    return db.hmset("user:" + user.id, {
        username: user.username,
        hash: user.hash,
        id: user.id,
        email: user.email,
        activated: user.activated
    });
}
exports.create = create;

function auth(username, password) {
}
exports.auth = auth;
//# sourceMappingURL=user.js.map
