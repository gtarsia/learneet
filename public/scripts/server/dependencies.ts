import baseAjax = require('./../common/base-ajax');
import baseDependencies = baseAjax.dependencies;
import baseAdd = baseDependencies.add;
import baseGetAll = baseDependencies.getAll;
import baseUpScore = baseDependencies.upScore;
import baseRemoveUpScore = baseDependencies.removeUpScore;
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

function auth(req) {
    return req.isAuthenticated();
}

function notAuthObj(): any {
    return new Promise(resolve => {
        resolve(notOkObj('Can\'t run this method without authentication'));
    });
}

export function add(args: baseAdd.Params, req)
: Promise<baseAdd.Return> {
    if (!auth(req)) return notAuthObj();7
    var dependent = args.dependent;
    var dependency = args.dependency;
    return db.sadd(keys.dependenciesIdSet(args), args.dependency.id)
    .then(res => {
        return upScore(args, req);
    })
    .then(res => {
        return okObj(true);
    });
}

export interface Id { id: string; }

export function upScore(args: baseUpScore.Params, req) : 
Promise<baseUpScore.Return> {
    if (!auth(req)) return notAuthObj();
    return db.sadd(keys.dependencyScoreUserSet(args), req.user.id)
    .then(res => {
        if (res == 0) return notOkObj('Coulnd\'t up score the dependency');
        return db.hincrby(keys.dependency(args), 'score', '1')
        .then(res => {
            return okObj({dependency: {score: res}});
        })
    })
}

export function removeUpScore(args: baseRemoveUpScore.Params, req) :
Promise<baseRemoveUpScore.Return> {
    if (!auth(req)) return notAuthObj();
    return db.srem(keys.dependencyScoreUserSet(args), req.user.id)
    .then(res => {
        if (res == 0) return notOkObj('Couldn\'t remove up score from dependency');
        return db.hincrby(keys.dependency(args), 'score', '-1')
        .then(res => {
            if (parseInt(res) <= 0) remove(args);
            return okObj({dependency: {score: res}});
        })
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

export function getAll(args: baseGetAll.Params, req)
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
    .then(deps => {
        if (!auth(req)) return deps;
        return hasUserUpScored(args.dependent, deps, req);
    })
    .then((deps: any) => {
        return okObj<TitleWithId[]>(deps);
    });
}

export function hasUserUpScored(dependent: Id, dependencies: {article: Id}[], req) {
    if (!auth(req)) return notAuthObj();
    var multi = db.multi();
    dependencies.forEach(dependency => {
        multi.sismember([keys.dependencyScoreUserSet
            ({dependent: dependent, dependency: dependency.article}), req.user.id]);
    })
    var promise: any = Promise.promisify(multi.exec, multi);
    return promise()
    .then(res => {
        dependencies.forEach((dep: any) => {
            dep.article.upScore = Boolean(res.shift());
        })
        return dependencies;
    })
}

export function getCurrentUserScore(args: baseGetCurrentUserScore.Params, req)
: Promise<baseGetCurrentUserScore.Return> {
    if (!auth(req)) return notAuthObj();
    return db.sismember(keys.dependencyScoreUserSet(args), req.user.id)
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
