import baseAjax = require('./../common/base-ajax');
import IAjax = baseAjax.IAjax;
import express = require('express');
import AjaxType = baseAjax.AjaxType;
import dbArticle = require('./article');
import dbDependencies = require('./dependencies');
import dbChanges = require('./changes');
import dbScore = require('./score');
import dbUser = require('./user');

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
        changes.getAll(),
        changes.get(),
        score.get(),
        score.up(),
        score.removeUp(),
        score.down(),
        score.removeDown(),
        score.getByUser(),
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
}

export module score {
    import _get = baseAjax.score.get;
    export function get() {
        return restCbAjax(new _get.Ajax(), dbScore.get);
    }

    import _up = baseAjax.score.up;
    export function up() {
        return restCbAjax(new _up.Ajax(), dbScore.up);
    }

    import _removeUp = baseAjax.score.removeUp;
    export function removeUp() {
        return restCbAjax(new _removeUp.Ajax(), dbScore.removeUp);
    }

    import _down = baseAjax.score.down;
    export function down() {
        return restCbAjax(new _down.Ajax(), dbScore.down);
    }

    import _removeDown = baseAjax.score.removeDown;
    export function removeDown() {
        return restCbAjax(new _removeDown.Ajax(), dbScore.removeDown);
    }

    import _getByUser = baseAjax.score.getByUser;
    export function getByUser() {
        return restCbAjax(new _getByUser.Ajax(), dbScore.getByUser);
    }
}

export module changes {
    import _getAll = baseAjax.changes.getAll;
    export function getAll() {
        return restCbAjax(new _getAll.Ajax(), dbChanges.getAll);
    }

    import _get = baseAjax.changes.get;
    export function get() {
        return restCbAjax(new _get.Ajax(), dbChanges.get);
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

export module user {
    import _register = baseAjax.user.register;
    export function register() {
        return restCbAjax(new _register.Ajax(), dbUser.register);
    }
}