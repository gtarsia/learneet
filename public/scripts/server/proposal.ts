/*
import baseAjax = require('./../common/base-ajax');
import Promise = require('bluebird');
import add = baseAjax.proposal.add;
import getAll = baseAjax.proposal.getAll;
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

export function add(args: add.Params): Promise<add.Return> {
    var proposal = args.proposal;
    var article = proposal.article;
    var changes;
    var id;
    debugger;
    return dbArticle.get({ article: article})
    .then((res) => {
        debugger;
        if (!res.ok) {
            console.log(res.why); return;
        }
        var originalContent = res.result.content;
        changes = diff.createPatch('', originalContent, proposal.modifiedContent, '', '');
        return db.incr(keys.proposalsIdCounter({article: article}))
        .then((_id) => {
            debugger;
            id = _id;
            return db.sadd(keys.proposalsIdSet({article: article}), id)
        })
        .then(() => {
            debugger;
            var key = { article: {id: article.id }, proposal: {id: id}};
            var val = { 
                id: id,
                changes: changes, 
                description: proposal.description
            };
            return db.hmset(keys.proposal(key), val)
        })
        .then(() => {
            debugger;
            return okObj<void>(null);
        })
    })
}

export interface Proposal { id: string; changes: string; description: string }
export function getAll(args: getAll.Params): Promise<getAll.Return> {
    var proposal = args.proposal;
    function arrayToProposals(array: string[]) : Proposal[] {
        var proposals : Proposal[] = [];
        var length = array.length;
        while (length > 0) {
            var id = array.shift();
            var changes = array.shift(); 
            var description = array.shift();
            length -= 3;
            proposals.push({ id: id, changes: changes, description: description });
        }
        return proposals;
    }
    debugger;
    return db.sort(keys.proposalsIdSet(args.proposal), 'by', 'nosort', 
        'GET', keys.proposalsNoSortField(args, 'id'),
        'GET', keys.proposalsNoSortField(args, 'changes'),
        'GET', keys.proposalsNoSortField(args, 'description'))
    .then<getAll.Return>((result: any) => {
        debugger;
        var ok = result != null;
        var why = (result == null ? 'Couldn\'t get articles' : '');
        var r : getAll.Return = {
            ok: ok,
            why: why,
            result: { proposals: arrayToProposals(result) }
        }
        return r;
    })
}*/