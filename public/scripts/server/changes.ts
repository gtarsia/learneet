import baseAjax = require('./../common/base-ajax');
import Promise = require('bluebird');
import getAll = baseAjax.changes.getAll;
import get = baseAjax.changes.get;
import getScore = baseAjax.changes.getScore;
import getScoreByUser = baseAjax.changes.getScoreByUser;
import upVote = baseAjax.changes.upVote;
import removeUpVote = baseAjax.changes.removeUpVote;
import ChangeFields = baseAjax.changes.ChangeFields;
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

export function getAll(args: getAll.Params) : Promise<getAll.Return> {
    function arrayToChanges(array: string[]) : ChangeFields[] {
        var changes : ChangeFields[] = [];
        var length = array.length;
        while (length > 0) {
            var id = array.shift();
            var state = array.shift(); var description = array.shift();
            var _changes = array.shift(); var date = array.shift();
            var author = array.shift();
            length -= 6;
            changes.push({ id: id, state: state, description: description,
                changes: _changes, date: date, author: author
            });
        }
        return changes;
    }
    var baseKey = keys.changesBase(args) + ':*->';
    return db.sort(keys.changesIdSet(args), 'by', 'nosort', 
        'GET', baseKey + 'id',
        'GET', baseKey + 'state',
        'GET', baseKey + 'description',
        'GET', baseKey + 'changes', 
        'GET', baseKey + 'date',
        'GET', baseKey + 'author')
    .then<getAll.Return>((result: any) => {
        var ok = result != null;
        var why = (result == null ? 'Couldn\'t get changes' : '');
        var r : getAll.Return = {
            ok: ok,
            why: why,
            result: arrayToChanges(result)
        }
        return r;
    })
}

export function get(args: get.Params) : Promise<get.Return> {
    var change;
    return db.hgetall(keys.change(args))
    .then(_change => {
        change = _change;
        return dbArticle.get(args)
    })
    .then<get.Return>(res => {
        if (change == null || !res.ok)
            return notOkObj('Couldn\'t get the change or the article');
        else
            return okObj({article: res.result, change: change});
    });
}

export function getScore(args: getScore.Params) : Promise<getScore.Return> {
    return db.scard(keys.changeUpScore(args))
    .then<getScore.Return>(result => {
        return (result == null 
            ? notOkObj('Couldn\'t retrieve the score of the change')
            : okObj({change: {score: result}}));
    })
}

export function getScoreByUser(args: getScoreByUser.Params) 
: Promise<getScoreByUser.Return> {
    return db.sismember(keys.changeUpScore(args), "1")
    .then<getScoreByUser.Return>(isMember => {
        if (isMember) return okObj(true);
        else return okObj(false);
    })
}

export function upVote(args: upVote.Params) : Promise<upVote.Return> {
    return db.sadd(keys.changeUpScore(args), "1")
    .then<upVote.Return>(result => {
        return (result == null 
            ? notOkObj('Couldn\'t up vote the change')
            : okObj(true));
    })
}

export function removeUpVote(args: removeUpVote.Params) 
: Promise<removeUpVote.Return> {
    return db.srem(keys.changeUpScore(args), "1")
    .then<removeUpVote.Return>(result => {
        return (result == null 
            ? notOkObj('Couldn\'t remove the change up vote')
            : okObj(true));
    })
}