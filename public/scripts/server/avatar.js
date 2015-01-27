var Promise = require('bluebird');

var AvatarsIO = require('avatars.io');

AvatarsIO.appId = 'learneet';
AvatarsIO.accessToken = '225fff4761127d3bea0311aa2062eeb749f1473bd2d82a5efa877ae6243f232d';

function upload(path) {
    debugger;
    return new Promise(function (resolve, reject) {
        debugger;
        AvatarsIO.upload(path, function (err, url) {
            debugger;
            if (err)
                return reject(err);
            resolve(url);
        });
    });
}
exports.upload = upload;
//# sourceMappingURL=avatar.js.map
