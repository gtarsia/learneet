import baseAjax = require('./../common/base-ajax');
import Promise = require('bluebird');
import user = require('user');
var AvatarsIO: any = require('avatars.io');

AvatarsIO.appId = 'learneet';
AvatarsIO.accessToken = '225fff4761127d3bea0311aa2062eeb749f1473bd2d82a5efa877ae6243f232d';

export function upload(path) : Promise<string> {
    debugger;
    return new Promise<string>(
    function(resolve, reject) {
        debugger;
        AvatarsIO.upload(path, function(err, url){
            debugger;
            if (err) return reject(err)
            resolve(url);
        });
    });
}