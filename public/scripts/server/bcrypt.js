var Promise = require('bluebird');
var bcryptjs = require('bcryptjs');

function isOk(err, reject) {
    if (err) {
        reject(err);
        return false;
    } else
        return true;
}

function promisify(fn) {
    return new Promise(function (resolve, reject) {
        debugger;
        fn(function (err, result) {
            if (!isOk(err, reject))
                result;
            resolve(result);
        });
    });
}

var bcrypt;
(function (bcrypt) {
    function genSalt(size) {
        return promisify(bcryptjs.genSalt.bind(bcryptjs, size));
    }
    bcrypt.genSalt = genSalt;
    function hash(s, salt) {
        debugger;
        return promisify(bcryptjs.hash.bind(bcryptjs, s, salt));
    }
    bcrypt.hash = hash;
    function compare(key, hash) {
        return promisify(bcryptjs.compare.bind(bcryptjs, key, hash));
    }
    bcrypt.compare = compare;
})(bcrypt || (bcrypt = {}));

module.exports = bcrypt;
//# sourceMappingURL=bcrypt.js.map
