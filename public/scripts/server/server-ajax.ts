import baseAjax = require('./../common/base-ajax');
import IAjax = baseAjax.IAjax;
import express = require('express');
import AjaxType = baseAjax.AjaxType;
import dbArticle = require('./article');
import dbDependencies = require('./dependencies');
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
        dependencies.add(),
        dependencies.get(),
        dependencies.remove(),
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
        return restCbAjax(new _get.Ajax(), dbArticle.get);
    }

    import _getAll = baseAjax.article.getAll;
    export function getAll() {
        return restCbAjax(new _getAll.Ajax(), dbArticle.getAll);
    }

    import _update = baseAjax.article.update;
    export function update() {
        return restCbAjax(new _update.Ajax(), dbArticle.update);
    }

    import _query = baseAjax.article.queryTitle;
    export function query() {
        return restCbAjax(new _query.Ajax(), dbArticle.TitleSearch.query);
    }

    import _getScore = baseAjax.article.getScore;
    export function getScore() {
        return restCbAjax(new _getScore.Ajax(), dbArticle.getScore);
    }
}

export module dependencies {    
    import _add = baseAjax.dependencies.add;
    export function add() {
        return restCbAjax(new _add.Ajax(), dbDependencies.add);
    }

    import _get = baseAjax.dependencies.get;
    export function get() {
        return restCbAjax(new _get.Ajax(), dbDependencies.get);
    }
    
    import _remove = baseAjax.dependencies.remove;
    export function remove() {
        return restCbAjax(new _remove.Ajax(), dbDependencies.remove);
    }
}

export module proposal {
    import _add = baseAjax.proposal.add;
    export function add() {
        return restCbAjax(new _add.Ajax(), dbProposal.add);
    }

    import _getAll = baseAjax.proposal.getAll;
    export function getAll() {
        return restCbAjax(new _getAll.Ajax(), dbProposal.getAll);
    }
}

export module user {
    import _register = baseAjax.user.register;
    export function register() {
        return restCbAjax(new _register.Ajax(), dbUser.register);
    }
}