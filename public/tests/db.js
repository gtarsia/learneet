var article = require('./../scripts/server/article');
var should = require('should');

var redis = require("redis");
var client = redis.createClient();

var error;

describe('DB', function () {
    describe("connection", function () {
        it('should be able to connect', function (done) {
            done();
        });
    });
});

describe('Article', function () {
    describe("ABM", function () {
        var art = {
            title: 'Como hacer ecuaciones',
            content: 'Este es el contenido'
        };
        article.create(art).then(function (res) {
            console.log('Create returned: ' + res);
            return article.get({ id: res.result.id });
        }).then(function (result) {
            console.log('Get returned: ' + result);
            should(result).equal(art);
        });
    });
});
//# sourceMappingURL=db.js.map
