import baseAjax = require('./../common/base-ajax');
import Promise = require('bluebird');
import add = baseAjax.proposal.add;
import db = require('./db');
import keys = require('./redis-keys')
import validate = require('./../common/validate');
import dbArticle = require('./article');
import diff = require('diff');

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

export function add(args: add.ParamsType): Promise<add.ReturnType> {
    var article = args.article;
    var changes;
    var id;
    return dbArticle.get(args)
    .then((res) => {
        debugger;
        if (!res.ok) {
            console.log(res.why); return;
        }
        var originalContent = res.result.content;
        changes = diff.diffLines(originalContent, args.article.modifiedContent);
        return db.incr(keys.proposalsIdCounter(args))
        .then((_id) => {
            debugger;
            id = _id;
            return db.sadd(keys.proposalsIdSet(args))
        })
        .then(() => {
            debugger;
            var key = { article: args.article, proposal: {id: id}};
            var val = { changes: changes, 
                description: article.description
            };
            return db.hmset(keys.proposal(key), val)
        })
        .then(() => {
            debugger;
            return okObj<void>(null);
        })
    })
    
}