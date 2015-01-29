var Promise = require('bluebird');

var db = require('./db');
var keys = require('./redis-keys');
var AvatarsIO = require('avatars.io');

AvatarsIO.appId = 'learneet';
AvatarsIO.accessToken = '225fff4761127d3bea0311aa2062eeb749f1473bd2d82a5efa877ae6243f232d';

function upload(path) {
    return new Promise(function (resolve, reject) {
        AvatarsIO.upload(path, function (err, url) {
            if (err)
                return reject(err);
            resolve(url);
        });
    });
}
exports.upload = upload;

function get(_array) {
    var multi = db.multi();
    var array = _array;
    array.forEach(function (el) {
        multi.hmget([keys.user({ user: el.user }), "avatar_url", "username"]);
    });
    var promise = Promise.promisify(multi.exec, multi);
    return promise().then(function (res) {
        array.forEach(function (el) {
            var arr = res.shift();
            el.user.avatar_url = arr.shift();
            el.user.username = arr.shift();
        });
        return array;
    });
}
exports.get = get;
//# sourceMappingURL=avatar.js.map
