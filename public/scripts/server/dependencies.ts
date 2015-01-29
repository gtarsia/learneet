import baseAjax = require('./../common/base-ajax');
import baseDependencies = baseAjax.dependencies;
import baseAdd = baseDependencies.add;
import baseGetAll = baseDependencies.getAll;
import baseStar = baseDependencies.star;
import baseUnstar = baseDependencies.unstar;
import baseRemove = baseDependencies.remove;
import baseGetCurrentUserScore = baseDependencies.getCurrentUserScore;
import FieldsWithId = baseAjax.FieldsWithId;
import TitleWithId = baseAjax.TitleWithId;
import ArticleWithTitleId = baseAjax.ArticleWithTitleId;
import db = require('./db');
import keys = require('./redis-keys');
import Promise = require('bluebird');
import avatar = require('./avatar');

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
    return db.sadd(keys.dependenciesIdSet(args), args.dependency.id)
    .then(res => {
        return upScore(args);
    })
    .then(res => {
        return okObj(true);
    });
}

export interface Id { id: string; }
export function upScore(args: {dependent: Id; dependency: Id})
: Promise<string> {
    var user = '1';
    return db.sadd(keys.dependencyScoreUserSet(args), user)
    .then(res => {
        return db.hmset(keys.dependency(args), {score: '1', starred: 'false'});
    })
}

export function removeScore(args: {dependent: Id; dependency: Id})
: Promise<string> {
    var user = '1';
    return db.del(
        keys.dependencyScoreUserSet(args),
        keys.dependency(args)
    )
}

export function getAll(args: baseGetAll.Params)
: Promise<baseGetAll.Return> {
    var deps : any[] = [];
    var dependent = args.dependent;
    return db.sort(keys.dependenciesIdSet(args), 'by', 'nosort', 
        'GET', keys.article({article: {id: '*->id'}}),
        'GET', keys.article({article: {id: '*->title'}}), 
        'GET', keys.article({article: {id: '*->author'}}),
        'GET', keys.dependency({dependent: {id: dependent.id}, dependency: {id: '*->score'}}),
        'GET', keys.dependency({dependent: {id: dependent.id}, dependency: {id: '*->starred'}}))
    .then((array: string[]) => {
        while (array.length > 0) {
            var id = array.shift();
            var title = array.shift();
            var author = array.shift();
            var score = array.shift();
            var starred = array.shift();
            deps.push({article: { id: id, title: title, score: score, 
                starred: starred}, user: {id: author}});
        }
        return avatar.get(deps)
    })
    .then((res: any) => {
        return okObj<TitleWithId[]>(res);
    });
}

export function getCurrentUserScore(args: baseGetCurrentUserScore.Params)
: Promise<baseGetCurrentUserScore.Return> {
    return db.sismember(keys.dependencyScoreUserSet(args), "1")
    .then(isMember => {
        var found = ((isMember) ? true : false);
        return okObj({score: found});
    })
}

function changeStarState(args: baseStar.Params, state: boolean) {
    var _state = (state ? 'true' : 'false')
    return db.hmset(keys.dependency(args), {starred: _state})
    .then(res => {
        if (!res) return notOkObj('Couldn\'t change the starred state');
        else return okObj(res);
    })
}

export function star(args: baseStar.Params)
: Promise<baseStar.Return> {
    return changeStarState(args, true);
}

export function unstar(args: baseUnstar.Params) 
: Promise<baseUnstar.Return> {
    return changeStarState(args, false);
}

export function remove(args: baseRemove.Params)
: Promise<baseRemove.Return> {
    var dependent = args.dependent;
    var dependency = args.dependency;
    return db.srem(keys.dependenciesIdSet(args), dependency.id)
    .then(res => {
        return removeScore(args);
    })
    .then(res => {
        return okObj(res == '1');
    })
}
