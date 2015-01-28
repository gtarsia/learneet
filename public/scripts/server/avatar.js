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

function get(args) {
    debugger;
    var array = args.array;
    var multi = db.multi();
    array.forEach(function (el) {
        debugger;
        multi.hmget([keys.user({ user: el.user }), "avatar_url"]);
    });
    var promise = Promise.promisify(multi.exec, multi);
    return promise().then(function (res) {
        debugger;
        array.forEach(function (el) {
            el.user.avatar_url = res.shift();
        });
        return array;
    });
}
exports.get = get;
//# sourceMappingURL=avatar.js.map
