import baseAjax = require('./../common/base-ajax');
import IAjax = baseAjax.IAjax;
import express = require('express');
import AjaxType = baseAjax.AjaxType;
import dbArticle = require('./article');
import dbDependencies = require('./dependencies');
import dbChanges = require('./changes');
import dbScore = require('./score');
import dbUser = require('./user');
import Promise = require('bluebird');

//FUNCION DEFINITIVA
export function getServerAjaxList(): {setExpressAjax: (app:express.Express) => void}[] {
    return [
        article.create(),
        article.get(),
        article.getAll(),
        article.getAllThumbs(),
        article.getTitleWithId(),
        article.update(),
        article.query(),
        dependencies.add(),
        dependencies.getAll(),
        dependencies.getCurrentUserScore(),
        dependencies.star(),
        dependencies.unstar(),
        dependencies.remove(),
        changes.getAll(),
        changes.get(),
        changes.getScore(),
        changes.getScoreByUser(),
        changes.upVote(),
        changes.removeUpVote(),
        score.get(),
        score.up(),
        score.removeUp(),
        score.down(),
        score.removeDown(),
        score.getByUser(),
        user.register(),
        user.get()
        //user.auth()
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
            fn(params, req).
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

    import _getAllThumbs = baseAjax.article.getAllThumbs;
    export function getAllThumbs() {
        return restCbAjax(new _getAllThumbs.Ajax(), dbArticle.getAllThumbs);
    }

    import _getTitleWithId = baseAjax.article.getTitleWithId;
    export function getTitleWithId() {
        return restCbAjax(new _getTitleWithId.Ajax(), dbArticle.getTitleWithId);
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

    import _getScore = baseAjax.changes.getScore;
    export function getScore() {
        return restCbAjax(new _getScore.Ajax(), dbChanges.getScore);
    }

    import _getScoreByUser = baseAjax.changes.getScoreByUser;
    export function getScoreByUser() {
        return restCbAjax(new _getScoreByUser.Ajax(), dbChanges.getScoreByUser);
    }

    import _upVote = baseAjax.changes.upVote;
    export function upVote() {
        return restCbAjax(new _upVote.Ajax(), dbChanges.upVote);
    }

    import _removeUpVote = baseAjax.changes.removeUpVote;
    export function removeUpVote() {
        return restCbAjax(new _removeUpVote.Ajax(), dbChanges.removeUpVote);
    }
}

export module dependencies {    
    import _add = baseAjax.dependencies.add;
    export function add() {
        return restCbAjax(new _add.Ajax(), dbDependencies.add);
    }

    import _getAll = baseAjax.dependencies.getAll;
    export function getAll() {
        return restCbAjax(new _getAll.Ajax(), dbDependencies.getAll);
    }

    import _getCurrentUserScore = baseAjax.dependencies.getCurrentUserScore;
    export function getCurrentUserScore() {
        return restCbAjax(new _getCurrentUserScore.Ajax(), dbDependencies.getCurrentUserScore);
    }

    import _star = baseAjax.dependencies.star;
    export function star() {
        return restCbAjax(new _star.Ajax(), dbDependencies.star);
    }

    import _unstar = baseAjax.dependencies.unstar;
    export function unstar() {
        return restCbAjax(new _unstar.Ajax(), dbDependencies.unstar);
    }
    
    import _remove = baseAjax.dependencies.remove;
    export function remove() {
        return restCbAjax(new _remove.Ajax(), dbDependencies.remove);
    }
}

function userGet(params, req): any {
    return new Promise<string>(
    function(resolve, reject): any {
        if (!req.isAuthenticated())
            resolve({
                ok: false, why: 'Not authenticated',
                result: null
            });
        return dbUser.get({user: {username: req.user.username}})
        .then(res => {
            resolve({ok: true, why: '',
            result: res});
        })
    });
}

export module user {
    import _register = baseAjax.user.register;
    export function register() {
        return restCbAjax(new _register.Ajax(), dbUser.register);
    }

    import _get = baseAjax.user.get;
    export function get() {
        return restCbAjax(new _get.Ajax(), userGet);
    }
/*
    import _auth = baseAjax.user.auth;
    export function auth() {
        return restCbAjax(new _auth.Ajax(), dbUser.auth);
    }
    */
}