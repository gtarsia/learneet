import article = require('./../scripts/server/article');
import should = require('should');
import commonAjax = require('./../scripts/common/common-ajax');
import Article = commonAjax.Article;
import redis = require("redis");
var client = redis.createClient();

var error;


describe('DB', () => {
    describe("connection", () => {
        it('should be able to connect', done => {
            done();
        });
    });
})

describe('Article', () => {
    describe("ABM", () => {
        var art = {
            title: 'Como hacer ecuaciones', 
            content: 'Este es el contenido'
        };
        article.create(art)
        .then((jsonResult : Article.Create.ReturnType) => {
            console.log('Create returned: ' + jsonResult);
            debugger;
            return article.get(jsonResult.result.id);
        })
        .then((result : Article.Get.ReturnType) => {
            console.log('Get returned: ' + result);
            should(result).equal(art);
        });
    });
});