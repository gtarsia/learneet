var baseAjax = require('./../common/base-ajax');
var Promise = require('bluebird');
var baseArticle = baseAjax.article;

var redis = require("redis");

var db = require('./db');
var keys = require('./redis-keys');

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
    var article = args.article;
    if (!article.title || !article.content) {
        return exports.notOkObj('Title or content was null or empty');
    }
    return db.incr(keys.articlesIdCounter()).then(function (_id) {
        id = _id;
        return db.hmset(keys.article({ article: { id: id } }), baseArticle.WrapFieldWithId(args, id));
    }).then(function (result) {
        if (result != 'OK')
            return exports.notOkObj('Could\'t create object');
        db.sadd(keys.articlesIdSet(), id).then(function () {
            TitleSearch.update(id, "", article.title);
        });
        return exports.okObj({ id: id });
    });
}
exports.create = create;

function update(args) {
    debugger;
    var oldTitle;
    var article = args.article;
    if (!article.title && !article.content) {
        return exports.notOkObj('Title or content was null or empty');
    }
    return exports.get(args).then(function (res) {
        debugger;
        if (!res.ok) {
            return exports.notOkObj('Can\'t upload article, because we couldn\'t find it');
        } else {
            var versionId;
            oldTitle = res.result.title;
            return db.hmset(keys.article(args), article).then(function (res) {
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
    var article = args.article;
    return db.hgetall(keys.article(args)).then(function (result) {
        var ok = result != null;
        var why = (result == null ? 'Article with id ' + article.id + ' not found' : '');
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
    var article = args.article;
    return db.hmget(keys.article(args), "id", "title");
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
    return db.sort(keys.articlesIdSet(), 'by', 'nosort', 'GET', 'articles:*->id', 'GET', 'articles:*->title', 'GET', 'articles:*->content').then(function (result) {
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
                multi.hmget([keys.article({ article: { id: ids[i] } }), "id", "title"]);
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
            return exports.okObj(articles);
        });
    }
    TitleSearch.query = query;
})(exports.TitleSearch || (exports.TitleSearch = {}));
var TitleSearch = exports.TitleSearch;

function addDependency(args) {
    var dependent = args.dependent;
    var dependency = args.dependency;
    return db.sadd(keys.dependency(args)).then(function (res) {
        return exports.okObj(res == '1');
    });
}
exports.addDependency = addDependency;

function getDependencies(args) {
    var article = args.article;
    return db.sort('article:' + article.id + ':dependencies', 'by', 'nosort', 'GET', 'article:*->id', 'GET', 'articles:*->title').then(function (array) {
        var articles = [];
        while (array.length > 0) {
            var id = array.shift();
            var title = array.shift();
            articles.push({ id: id, title: title });
        }
        return exports.okObj(articles);
    });
}
exports.getDependencies = getDependencies;

function remDependency(args) {
    var dependent = args.dependent;
    var dependency = args.dependency;
    return db.srem(keys.dependency(args)).then(function (res) {
        return exports.okObj(res == '1');
    });
}
exports.remDependency = remDependency;
//# sourceMappingURL=article.js.map
