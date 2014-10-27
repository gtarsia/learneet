var db = require('./db');
var bcrypt = require('./bcrypt');

var user;
(function (user) {
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
        });
    }
    user.register = register;

    function auth(username, password) {
    }
    user.auth = auth;
})(user || (user = {}));

module.exports = user;
//# sourceMappingURL=user.js.map
