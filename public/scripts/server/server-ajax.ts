import baseAjax = require('./../common/base-ajax');
import IAjax = baseAjax.IAjax;
import express = require('express');
import AjaxType = baseAjax.AjaxType;
import dbArticle = require('./article');
import dbUser = require('./user');
import dbProposal = require('./proposal');

//FUNCION DEFINITIVA
export function getServerAjaxList(): {setExpressAjax: (app:express.Express) => void}[] {
    return [
        article.create(),
        article.get(),
        article.getAll(),
        article.update(),
        article.query(),
        article.addDependency(),
        article.getDependencies(),
        article.remDependency(),
        article.getScore(),
        proposal.add(),
        proposal.getAll(),
        user.register()
    ];
}

export function restCb(url: string, type: string, fn: any) {
    function parsingHandler() {
        return (req, res) => {
            var params; 
            if (type == AjaxType.GET)
                params = JSON.parse(req.query.p);
            else if (type == AjaxType.POST)
                params = JSON.parse(req.body.p);
            fn(params).
            then(result => {
                res.send(result);
            })
        }
    }
    return {
        setExpressAjax: (app: express.Express) => {
            switch (type) {
            case AjaxType.GET:
                app.get(url, parsingHandler()); break;
            case AjaxType.POST:
                app.post(url, parsingHandler()); break;
            }
        }
    }
}

export function restCbAjax(ajax: IAjax, fn: any) {
    return restCb(ajax.url(), ajax.type(), fn);
}

export module article {
    import _create = baseAjax.article.create;
    export function create() {
        return restCbAjax(new _create.Ajax(), dbArticle.create);
    }

    import _get = baseAjax.article.get;
    export function get() {
        return restCb(_get.url(), _get.type(), 
            dbArticle.get);
    }

    import _getAll = baseAjax.article.getAll;
    export function getAll() {
        return restCb(_getAll.url(), _getAll.type(),
            dbArticle.getAll);
    }

    import _Update = baseAjax.article.update;
    export function update() {
        return restCb(_Update.url(), _Update.type(),
            dbArticle.update);
    }

    import _Query = baseAjax.article.queryTitle;
    export function query() {
        return restCb(_Query.url(), _Query.type(), 
            dbArticle.TitleSearch.query);
    }

    import _AddDependency = baseAjax.article.addDependency;
    export function addDependency() {
        return restCb(_AddDependency.url(), _AddDependency.type(),
            dbArticle.addDependency);
    }

    import _getDeps = baseAjax.article.getDependencies;
    export function getDependencies() {
        return restCb(_getDeps.url(), _getDeps.type(), 
            dbArticle.getDependencies);
    }

    import _getScore = baseAjax.article.getScore;
    export function getScore() {
        return restCb(_getScore.url(), _getScore.type(), 
            dbArticle.getScore);
    }    

    import _RemDep = baseAjax.article.remDependency;
    export function remDependency() {
        return restCb(_RemDep.url(), _RemDep.type(),
            dbArticle.remDependency);
    }
}

export module proposal {
    import _Add = baseAjax.proposal.add;
    export function add() {
        return restCb(_Add.url(), _Add.type(),
            dbProposal.add);
    }

    import _getAll = baseAjax.proposal.getAll;
    export function getAll() {
        return restCb(_getAll.url(), _getAll.type(),
            dbProposal.getAll);
    }
}

export module user {
    import _Register = baseAjax.user.register;
    export function register() {
        return restCb(_Register.url(), _Register.type(),
            dbUser.register);
    }
}