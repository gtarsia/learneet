/*
import article = require('./../scripts/server/article');
import should = require('should');
import baseAjax = require('./../scripts/common/base-ajax');
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
import baseCreate = baseAjax.article.create;
import baseGet = baseAjax.article.get;
describe('Article', () => {
    describe("ABM", () => {
        
        var art = {
            title: 'Como hacer ecuaciones', 
            content: 'Este es el contenido'
        };
        article.create(art)
        .then((res : baseCreate.ReturnType) => {
            console.log('Create returned: ' + res);
            return article.get({ id: res.result.id});
        })
        .then((result : baseGet.ReturnType) => {
            console.log('Get returned: ' + result);
            should(result).equal(art);
        });
    });
});
*/