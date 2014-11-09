var baseAjax = require('./../common/base-ajax');
var Promise = require('bluebird');
var article = baseAjax.article;

var redis = require("redis");

var db = require('./db');

function isOk(err, reject) {
    if (err) {
        reject(err);
        return false;
    } else
        return true;
}

function create(args) {
    var id;
    return db.incr("article:idCounter").then(function (_id) {
        id = _id;
        return db.rpush("article:ids", id);
    }).then(function () {
        return exports.update(article.WrapFieldWithId(args, id));
    }).then(function (result) {
        var r = {
            ok: true,
            why: '',
            result: {
                id: id
            }
        };
        return r;
    });
}
exports.create = create;

function get(args) {
    return db.hgetall("article:" + args.id.toString()).then(function (result) {
        var ok = result != null;
        var why = (result == null ? 'Article with id ' + args.id + ' not found' : '');
        var r = {
            ok: ok,
            why: why,
            result: result
        };
        return r;
    });
}
exports.get = get;

function getTitleAndId(args) {
    return db.hmget("article:" + args.id, "id", "title");
}
exports.getTitleAndId = getTitleAndId;

function getAll() {
    function arrayToArticles(array) {
        var articles = [];
        while (array.length > 0) {
            var id = array.shift();
            var title = array.shift();
            var content = array.shift();
            articles.push({ id: id, title: title, content: content });
        }
        return articles;
    }
    return db.sort('article:ids', 'by', 'nosort', 'GET', 'article:*->id', 'GET', 'article:*->title', 'GET', 'article:*->content').then(function (result) {
        var ok = result != null;
        var why = (result == null ? 'Couldn\'t get articles' : '');
        var r = {
            ok: ok,
            why: why,
            result: arrayToArticles(result)
        };
        return r;
    });
}
exports.getAll = getAll;

(function (TitleSearch) {
    function remove(multi, id, oldTitle) {
        var words = oldTitle.split(' ');
        var length = words.length;
        for (var i = 0; i < length; i++) {
            multi = multi.srem(["search_words:" + words[i], id], redis.print);
        }
        return multi;
    }
    TitleSearch.remove = remove;

    function add(multi, id, newTitle) {
        var words = newTitle.split(' ');
        var length = words.length;
        for (var i = 0; i < length; i++) {
            multi = multi.sadd(["search_words:" + words[i], id], redis.print);
        }
        return multi;
    }
    TitleSearch.add = add;

    function update(id, oldTitle, newTitle) {
        var multi = db.multi();
        multi = remove(multi, id, oldTitle);
        multi = add(multi, id, newTitle);
        multi.exec();
    }
    TitleSearch.update = update;

    function query(args) {
        var words = args.query.split(' ');
        var length = words.length;
        for (var i = 0; i < length; i++) {
            words[i] = "search_words:".concat(words[i]);
        }
        return db.sinter.apply(db, words).then(function (ids) {
            if (ids == null)
                return [];
            var multi = db.multi();
            var length = ids.length;
            for (var i = 0; i < length; i++) {
                multi.hmget(["article:" + ids[i], "id", "title"]);
            }
            var promise = Promise.promisify(multi.exec, multi);
            return promise();
        }).then(function (result) {
            debugger;
            var length = result.length;
            var articles = [];
            for (var i = 0; i < length; i++) {
                var article = result.shift();
                var id = article.shift();
                var title = article.shift();
                articles.push({ id: id, title: title });
            }
            return {
                ok: true,
                why: '',
                result: articles
            };
        });
    }
    TitleSearch.query = query;
})(exports.TitleSearch || (exports.TitleSearch = {}));
var TitleSearch = exports.TitleSearch;

function update(args) {
    var oldTitle;
    return exports.get(args).then(function (res) {
        oldTitle = res.result.title;
        return db.hmset("article:" + args.id, args);
    }).then(function (result) {
        TitleSearch.update(args.id, oldTitle, args.title);
        var ok = result != null;
        var why = (result == null ? 'Article with id ' + args.id + ' not found' : '');
        var r = {
            ok: ok,
            why: why,
            result: {
                id: args.id
            }
        };
        return r;
    });
}
exports.update = update;

function addDependency(args) {
    return db.sadd('article:' + args.dependentId + ':dependencies', args.dependencyId);
}
exports.addDependency = addDependency;
//# sourceMappingURL=article.js.map
