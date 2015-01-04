import baseAjax = require('./../common/base-ajax');
import Promise = require('bluebird');
import getAll = baseAjax.changes.getAll;
import get = baseAjax.changes.get;
import getScore = baseAjax.changes.getScore;
import getScoreByUser = baseAjax.changes.getScoreByUser;
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
        debugger;
        var changes : ChangeFields[] = [];
        var length = array.length;
        while (length > 0) {
            var id = array.shift();
            var state = array.shift(); var description = array.shift();
            var _changes = array.shift(); var date = array.shift();
            var author = array.shift();
            var score = array.shift();
            length -= 7;
            changes.push({ id: id, state: state, description: description,
                changes: _changes, date: date, author: author, score: score
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
        'GET', baseKey + 'author',
        'GET', baseKey + 'score')
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
    return db.hgetall(keys.change(args))
    .then<get.Return>(result => {
        var ok = result != null;
        var why = (result == null ? 'Couldn\'t get the change': '');
        var r : get.Return = {
            ok: ok, why: why, result: result
        }
        return r;
    });
}

export function getScore(args: getScore.Params) : Promise<getScore.Return> {
    return db.hget(keys.change(args), 'score')
    .then<getScore.Return>(result => {
        return (result == null 
            ? notOkObj('Couldn\'t retrieve the score of the change')
            : okObj({article: {score: result}}));
    })
}

export function getScoreByUser(args: getScoreByUser.Params) 
: Promise<getScoreByUser.Return> {
    return db.hget(keys.change(args), 'score')
    .then<getScoreByUser.Return>(result => {
        return (result == null 
            ? notOkObj('Couldn\'t retrieve the score of the change')
            : okObj({article: {score: result}}));
    })
}
