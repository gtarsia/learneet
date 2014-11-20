import baseAjax = require('./../common/base-ajax');
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
        proposal.add(),
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

export module article {
    import baseCreate = baseAjax.article.create;
    export function create() {
        return restCb(baseCreate.url(), baseCreate.type(), 
            dbArticle.create);
    }

    import baseGet = baseAjax.article.get;
    export function get() {
        return restCb(baseGet.url(), baseGet.type(), 
            dbArticle.get);
    }

    import baseGetAll = baseAjax.article.getAll;
    export function getAll() {
        return restCb(baseGetAll.url(), baseGetAll.type(),
            dbArticle.getAll);
    }

    import baseUpdate = baseAjax.article.update;
    export function update() {
        return restCb(baseUpdate.url(), baseUpdate.type(),
            dbArticle.update);
    }

    import baseQuery = baseAjax.article.queryTitle;
    export function query() {
        return restCb(baseQuery.url(), baseQuery.type(), 
            dbArticle.TitleSearch.query);
    }

    import baseAddDependency = baseAjax.article.addDependency;
    export function addDependency() {
        return restCb(baseAddDependency.url(), baseAddDependency.type(),
            dbArticle.addDependency);
    }

    import baseGetDeps = baseAjax.article.getDependencies;
    export function getDependencies() {
        return restCb(baseGetDeps.url(), baseGetDeps.type(), 
            dbArticle.getDependencies);
    }

    import baseRemDep = baseAjax.article.remDependency;
    export function remDependency() {
        return restCb(baseRemDep.url(), baseRemDep.type(),
            dbArticle.remDependency);
    }
}

export module proposal {
    import baseAdd = baseAjax.proposal.add;
    export function add() {
        return restCb(baseAdd.url(), baseAdd.type(),
            dbProposal.add);
    }
}

export module user {
    import baseRegister = baseAjax.user.register;
    export function register() {
        return restCb(baseRegister.url(), baseRegister.type(),
            dbUser.register);
    }
}