var Promise = require('bluebird');
var redis = require("redis");

var fakeredis = require("fakeredis");

exports.client = redis.createClient(3476, '50.30.35.9');
exports.client.auth('9e227f8f82d63dfbb4a6b72b16985f51', function (err) {
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
        fn(args, function (err, result) {
            if (!isOk(err, reject))
                result;
            resolve(result);
        });
    });
}
exports.promisedRedis = promisedRedis;

function del() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return exports.promisedRedis.apply(this, [exports.client.del.bind(exports.client), args]);
}
exports.del = del;

function multi() {
    return exports.client.multi();
}
exports.multi = multi;

function rename() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return exports.promisedRedis.apply(this, [exports.client.rename.bind(exports.client), args]);
}
exports.rename = rename;

function hget() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return exports.promisedRedis.apply(this, [exports.client.hget.bind(exports.client), args]);
}
exports.hget = hget;

function hmget() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return exports.promisedRedis.apply(this, [exports.client.hmget.bind(exports.client), args]);
}
exports.hmget = hmget;

function sadd() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return exports.promisedRedis.apply(this, [exports.client.sadd.bind(exports.client), args]);
}
exports.sadd = sadd;

function scard() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return exports.promisedRedis.apply(this, [exports.client.scard.bind(exports.client), args]);
}
exports.scard = scard;

function srem() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return exports.promisedRedis.apply(this, [exports.client.srem.bind(exports.client), args]);
}
exports.srem = srem;

function sinter() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return exports.promisedRedis.apply(this, [exports.client.sinter.bind(exports.client), args]);
}
exports.sinter = sinter;

function sismember() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return exports.promisedRedis.apply(this, [exports.client.sismember.bind(exports.client), args]);
}
exports.sismember = sismember;

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
