var Promise = require('bluebird');
var redis = require("redis");

var fakeredis = require("fakeredis");

exports.client = redis.createClient(15855, 'pub-redis-15855.us-east-1-2.1.ec2.garantiadata.com');
exports.client.auth('compadrito25', function (err) {
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
        exports.client.hmset([key].concat(array), function (err, reply) {
            if (!isOk(err, reject))
                return;
            resolve(reply);
        });
    });
}
exports.hmset = hmset;

function incr(key) {
    return new Promise(function (resolve, reject) {
        exports.client.incr([key], function (err, result) {
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
        exports.client.hgetall([key], function (err, result) {
            if (!isOk(err, reject))
                result;
            resolve(result);
        });
    });
}
exports.hgetall = hgetall;

function promisedRedis(fn, args) {
    return new Promise(function (resolve, reject) {
        debugger;
        fn(args, function (err, result) {
            if (!isOk(err, reject))
                result;
            resolve(result);
        });
    });
}
exports.promisedRedis = promisedRedis;

function hget() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return exports.promisedRedis.apply(this, [exports.client.hget.bind(exports.client), args]);
}
exports.hget = hget;

function sort() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return new Promise(function (resolve, reject) {
        exports.client.sort(args, function (err, result) {
            if (!isOk(err, reject))
                result;
            resolve(result);
        });
    });
}
exports.sort = sort;

function rpush(key, value) {
    return new Promise(function (resolve, reject) {
        exports.client.rpush([key, value], function (err, result) {
            if (!isOk(err, reject))
                result;
            resolve(result);
        });
    });
}
exports.rpush = rpush;
//# sourceMappingURL=db.js.map
