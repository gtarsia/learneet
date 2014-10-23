var Promise = require('bluebird');
var redis = require("redis");

var fakeredis = require("fakeredis");

var client = redis.createClient(15855, 'pub-redis-15855.us-east-1-2.1.ec2.garantiadata.com');
client.auth('compadrito25', function (err) {
    if (err)
        throw err;
});

function isOk(err, reject) {
    if (err) {
        reject(err);
        return false;
    } else
        return true;
}

function isNumber(n) {
    return n == parseFloat(n);
}

function objectToRedisArray(object) {
    var array = [];
    for (var key in object) {
        if (!object.hasOwnProperty(key)) {
            throw new Error;
        } else {
            array.push(key);
            array.push(object[key]);
        }
    }
    return array;
}

function genericPromise(redisCommand, args) {
}

function hmset(key, object) {
    return new Promise(function (resolve, reject) {
        var array = objectToRedisArray(object);
        client.hmset([key].concat(array), function (err, reply) {
            if (!isOk(err, reject))
                return;
            resolve(reply);
        });
    });
}
exports.hmset = hmset;

function incr(key) {
    return new Promise(function (resolve, reject) {
        client.incr([key], function (err, result) {
            if (!isOk(err, reject))
                return;
            resolve(result);
        });
    });
}
exports.incr = incr;

function hgetall(key) {
    return new Promise(function (resolve, reject) {
        console.log(key);
        client.hgetall([key], function (err, result) {
            if (!isOk(err, reject))
                result;
            resolve(result);
        });
    });
}
exports.hgetall = hgetall;
//# sourceMappingURL=db.js.map
