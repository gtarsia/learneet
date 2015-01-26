var db = require('./db');
var bcrypt = require('./bcrypt');

var keys = require('./redis-keys');

var avatar = require('./avatar');

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

function hash(password) {
    return bcrypt.genSalt(10).then(function (salt) {
        return bcrypt.hash(password, salt);
    });
}
exports.hash = hash;

function register(params) {
    var userwithid;
    var id;
    var hashed;
    return exports.hash(params.password).then(function (_hash) {
        hashed = _hash;
        return db.incr(keys.usersIdCounter());
    }).then(function (_id) {
        userwithid = { user: { id: _id } };
        id = _id;
        return db.sadd(keys.usersIdSet(), _id);
    }).then(function (ok) {
        return db.hmset(keys.usernamesSets({ user: params }), { id: id });
    }).then(function (ok) {
        return db.hmset(keys.user(userwithid), {
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

function get(params) {
    var baseKey = keys.usersBase() + ':*->';
    return db.sort(keys.usernamesSets(params), 'by', 'nosort', 'GET', baseKey + 'id', 'GET', baseKey + 'username', 'GET', baseKey + 'email', 'GET', baseKey + 'activated', 'GET', baseKey + 'avatar_url').then(function (values) {
        var user = {};
        user.id = values.shift();
        user.username = values.shift();
        user.email = values.shift();
        user.activated = values.shift();
        user.avatar_url = values.shift();
        return user;
    });
}
exports.get = get;

function getHash(params) {
    var baseKey = keys.usersBase() + ':*->';
    return db.sort(keys.usernamesSets(params), 'by', 'nosort', 'GET', baseKey + 'hash').then(function (values) {
        var user = {};
        user.hash = values.shift();
        return user;
    });
}
exports.getHash = getHash;

function uploadAvatar(args) {
    return avatar.upload(args.image.path).then(function (url) {
        return db.hmset(keys.user(args), { avatar_url: url });
    });
}
exports.uploadAvatar = uploadAvatar;

function auth(params) {
    var user;
    var equals;
    return exports.getHash({ user: params }).then(function (_user) {
        user = _user;
        return bcrypt.compare(params.password, user.hash);
    }).then(function (equals) {
        if (equals)
            return exports.get({ user: params }).then(function (res) {
                return exports.okObj(res);
            });
        else
            return exports.notOkObj('Invalid authentication');
    });
}
exports.auth = auth;
//# sourceMappingURL=user.js.map
