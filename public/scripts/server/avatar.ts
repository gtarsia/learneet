import baseAjax = require('./../common/base-ajax');
import baseGet = baseAjax.avatar.get;
import Promise = require('bluebird');
import user = require('./user');
import db = require('./db');
import keys = require('./redis-keys');
var AvatarsIO: any = require('avatars.io');

AvatarsIO.appId = 'learneet';
AvatarsIO.accessToken = '225fff4761127d3bea0311aa2062eeb749f1473bd2d82a5efa877ae6243f232d';

export function upload(path) : Promise<string> {
    return new Promise<string>(
    function(resolve, reject) {
        AvatarsIO.upload(path, function(err, url){
            if (err) return reject(err)
            resolve(url);
        });
    });
}

export function get(args: baseGet.Params) {
    debugger;
    var array: any = args.array;
    var multi = db.multi();
    array.forEach(el => {
        debugger;
        multi.hmget([keys.user({user: el.user}), "avatar_url"]);
    })
    var promise: any = Promise.promisify(multi.exec, multi);
    return promise()
    .then(res => {
        debugger;
        array.forEach(el => {
            el.user.avatar_url = res.shift();
        })
        return array;
    })
}