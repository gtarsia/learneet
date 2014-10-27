var Promise = require('bluebird');
var bcryptjs = Promise.promisifyAll(require('bcryptjs'));

var bcrypt;
(function (bcrypt) {
    function genSalt(size) {
        return bcryptjs.genSalt(size);
    }
    bcrypt.genSalt = genSalt;
    function hash(key) {
        return bcryptjs.hash(key);
    }
    bcrypt.hash = hash;
    function compare(key, hash) {
        return bcryptjs.compare(key, hash);
    }
    bcrypt.compare = compare;
})(bcrypt || (bcrypt = {}));

module.exports = bcrypt;
//# sourceMappingURL=bcrypt.js.map
