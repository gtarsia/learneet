
import baseAjax = require('./../common/base-ajax');
import baseDependencies = baseAjax.dependencies;
import baseAdd = baseDependencies.add;
import baseGet = baseDependencies.get;
import baseRemove = baseDependencies.remove;
import FieldsWithId = baseAjax.FieldsWithId;
import TitleWithId = baseAjax.TitleWithId;
import db = require('./db');
import keys = require('./redis-keys');
import Promise = require('bluebird');

function isOk(err, reject) { if (err) { reject(err); return false;} else return true;}

export function notOkObj(reason: string): any {
    return {
        ok: false,
        why: reason
    }
}

export function okObj<T>(obj: T): any {
    return {
        ok: true,
        why: '',
        result: obj
    }
}
export function add(args: baseAdd.Params)
: Promise<baseAdd.Return> {
    var dependent = args.dependent;
    var dependency = args.dependency;
    return db.sadd(keys.dependency(args))
    .then((res: string) => {
        return okObj<Boolean>(res == '1');
    });
}

export function get(args: baseGet.Params)
: Promise<baseGet.Return> {
    var article = args.article;
    return db.sort('article:' + article.id + ':dependencies', 'by', 'nosort', 'GET', 'article:*->id',
        'GET', 'articles:*->title')
    .then((array: string[]) => {
        var articles : TitleWithId[] = [];
        while (array.length > 0) {
            var id = array.shift();
            var title = array.shift();
            articles.push({ id: id, title: title});
        }
        return okObj<TitleWithId[]>(articles);
    });
}

export function remove(args: baseRemove.Params)
: Promise<baseRemove.Return> {
    var dependent = args.dependent;
    var dependency = args.dependency;
    return db.srem(keys.dependency(args))
    .then(res => {
        return okObj(res == '1');
    })
}
