var baseAjax = require('./../common/base-ajax');
var Promise = require('bluebird');
var article = baseAjax.article;

var redis = require("redis");

var db = require('./db');
var keys = require('./redis-keys');
var version = require('./version');

function isOk(err, reject) {
    if (err) {
        reject(err);
        return false;
    } else
        return true;
}

function notOkObj(reason) {
    return {
        ok: false,
        why: reason
    };
}
exports.notOkObj = notOkObj;

function okObj(obj) {
    return {
        ok: true,
        why: '',
        result: obj
    };
}
exports.okObj = okObj;

function create(args) {
    var id;
    if (!args.title || !args.content) {
        return exports.notOkObj('Title or content was null or empty');
    }
    return db.incr("article:idCounter").then(function (_id) {
        id = _id;
        return db.hmset("article:" + id, article.WrapFieldWithId(args, id));
    }).then(function (result) {
        if (result != 'OK')
            return exports.notOkObj('Could\'t create object');
        db.sadd("article:ids", id).then(function () {
            TitleSearch.update(id, "", args.title);
        });
        return exports.okObj({ id: id });
    });
}
exports.create = create;

function update(args) {
    var oldTitle;
    var article = args.article;
    if (!article.title && !article.content) {
        return exports.notOkObj('Title or content was null or empty');
    }
    return exports.get(args.article).then(function (res) {
        if (!res.ok) {
            return exports.notOkObj('Can\'t upload article, because we couldn\'t find it');
        } else {
            var versionId;
            oldTitle = res.result.title;
            return version.add(article.id).then(function (res) {
                return db.hmset(keys.article({ articleId: article.id }), article);
            }).then(function (res) {
                if (!res)
                    exports.notOkObj('Article update wasn\'t succesful');
                TitleSearch.update(article.id, oldTitle, article.title);
                return exports.okObj({ id: article.id });
            });
        }
    });
}
exports.update = update;

function get(args) {
    return db.hgetall("article:" + args.id.toString()).then(function (result) {
        debugger;
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
        var length = array.length;
        while (length > 0) {
            var id = array.shift();
            var title = array.shift();
            var content = array.shift();
            length -= 3;
            articles.push({ id: id, title: title, content: content });
        }
        return articles;
    }
    return db.sort('article:ids', 'by', 'nosort', 'GET', 'article:*->id', 'GET', 'article:*->title', 'GET', 'article:*->content').then(function (result) {
        debugger;
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

function addDependency(args) {
    debugger;
    return db.sadd('article:' + args.dependentId + ':dependencies', args.dependencyId).then(function (res) {
        debugger;
        return {
            ok: true,
            why: '',
            result: (res == '1')
        };
    });
}
exports.addDependency = addDependency;

function getDependencies(args) {
    return db.sort('article:' + args.id + ':dependencies', 'by', 'nosort', 'GET', 'article:*->id', 'GET', 'article:*->title').then(function (array) {
        var articles = [];
        while (array.length > 0) {
            var id = array.shift();
            var title = array.shift();
            articles.push({ id: id, title: title });
        }
        return {
            ok: true,
            why: '',
            result: articles
        };
    });
}
exports.getDependencies = getDependencies;

function remDependency(args) {
    debugger;
    return db.srem('article:' + args.dependentId + ':dependencies', args.dependencyId).then(function (res) {
        return {
            ok: true,
            why: '',
            result: res == '1'
        };
    });
}
exports.remDependency = remDependency;
//# sourceMappingURL=article.js.map
