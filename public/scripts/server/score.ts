import baseAjax = require('./../common/base-ajax');
import baseScore = baseAjax.score;
import get = baseScore.get;
import getByUser = baseScore.getByUser;
import up = baseScore.up;
import removeUp = baseScore.removeUp;
import Promise = require('bluebird');
import db = require('./db');
import keys = require('./redis-keys');

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

export function get(args: get.Params)
: Promise<get.Return> {
    var up;
    return db.scard(keys.articleUpScore(args))
    .then(_up => {
        up = _up;
        return db.scard(keys.articleDownScore(args))
    })
    .then(down => {
        return okObj({article: {score: up} });
    })
}

export function up(args: up.Params)
: Promise<up.Return> {
    return db.sadd(keys.articleUpScore(args), "1")
    .then(res => {
        return db.srem(keys.articleDownScore(args), "1")
    })
    .then(res => {
        return okObj(true);
    })
}

export function removeUp(args: removeUp.Params)
: Promise<removeUp.Return> {
    return db.srem(keys.articleUpScore(args), "1")
    .then(res => {
        return okObj(true);
    })
}

export function getByUser(args: getByUser.Params)
: Promise<getByUser.Return> {
    var isUpScoreMember;
    return db.sismember(keys.articleUpScore(args), "1")
    .then(isMember => {
        isUpScoreMember = isMember;
        return db.sismember(keys.articleDownScore(args), "1")
    })
    .then(isDownScoreMember => {
        var article = {score: 0};
        if (isUpScoreMember) article.score = 1;
        else if (isDownScoreMember) article.score = -1
        else article.score = 0;
        return okObj({article: article});
    })
}