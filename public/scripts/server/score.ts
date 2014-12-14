import baseAjax = require('./../common/base-ajax');
import baseScore = baseAjax.score;
import get = baseScore.get;
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
    return db.scard(keys.articleScore(args))
    .then(res => {
        return okObj({article: {score: res} });
    })
}