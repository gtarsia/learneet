
import baseAjax = require('./../common/base-ajax');
import baseDependencies = baseAjax.dependencies;
import baseAdd = baseDependencies.add;
import baseGetAll = baseDependencies.getAll;
import baseRemove = baseDependencies.remove;
import baseGetCurrentUserScore = baseDependencies.getCurrentUserScore;
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

export function getAll(args: baseGetAll.Params)
: Promise<baseGetAll.Return> {
    var deps : TitleWithId[] = [];
    var article = args.article;
    return db.sort(keys.dependenciesIdSet(args), 'by', 'nosort', 
        'GET', keys.article({article: {id: '*->id'}}),
        'GET', keys.article({article: {id: '*->title'}}), 
        'GET', keys.dependency({dependent: {id: article.id}, dependency: {id: '*->score'}}),
        'GET', keys.dependency({dependent: {id: article.id}, dependency: {id: '*->starred'}}))
    .then((array: string[]) => {
        while (array.length > 0) {
            var id = array.shift();
            var title = array.shift();
            var score = array.shift();
            var starred = array.shift();
            deps.push({ id: id, title: title, score: score, starred: starred});
        }
        return okObj<TitleWithId[]>(deps);
    });
}

export function getCurrentUserScore(args: baseGetCurrentUserScore.Params)
: Promise<baseGetCurrentUserScore.Return> {
    return db.sismember(keys.dependencyScoreUserSet(args), args.user.id)
    .then(isMember => {
        var found = ((isMember) ? true : false);
        return okObj({score: found});
    })
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
