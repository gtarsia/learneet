import baseAjax = require('./../common/base-ajax');
import express = require('express');
import AjaxType = baseAjax.AjaxType;
import dbArticle = require('./article');
import dbUser = require('./user');

//FUNCION DEFINITIVA
export function getServerAjaxList(): {setExpressAjax: (app:express.Express) => void}[] {
    return [
        article.create(),
        article.get(),
        article.getAll(),
        article.update(),
        user.register()
    ];
}

export function buildAjax<ArgsType, ReturnType>
(url: string, type: string, handler: (req: express.Request, res: express.Response)=> void) {
    return {
        setExpressAjax: (app: express.Express) => {
            switch (type) {
            case AjaxType.GET:
                app.get(url, handler); break;
            case AjaxType.POST:
                app.post(url, handler); break;
            }
        }
    }
}

export module article {
    import baseCreate = baseAjax.article.create;
    export function create() {
        return buildAjax<baseCreate.ParamsType, baseCreate.ReturnType>
        (baseCreate.url(), baseCreate.type(), (req, res) => {
            dbArticle.create(req.body)
            .then((result: baseCreate.ReturnType) => {
                res.send(result);
            });
        })
    }

    import baseGet = baseAjax.article.get;
    export function get() {
        return buildAjax<baseGet.ParamsType, baseGet.ReturnType>
        (baseGet.url(), baseGet.type(), (req, res) => {
            dbArticle.get(req.query)
            .then((result: baseGet.ReturnType) => {
                res.send(result);
            });
        })
    }

    import baseGetAll = baseAjax.article.getAll;
    export function getAll() {
        return buildAjax<baseGetAll.ParamsType, baseGetAll.ReturnType>
        (baseGetAll.url(), baseGetAll.type(), (req, res) => {
            dbArticle.getAll()
            .then((result: baseGetAll.ReturnType) => {
                res.send(result);
            });
        })
    }

    import baseUpdate = baseAjax.article.update;
    export function update() {
        return buildAjax<baseUpdate.ParamsType, baseUpdate.ReturnType>
        (baseUpdate.url(), baseUpdate.type(), (req, res) => {
            dbArticle.update(req.body)
            .then((result: baseUpdate.ReturnType) => {
                res.send(result);
            });
        })
    }
}

export module user {
    import baseRegister = baseAjax.user.register;
    export function register() {
        return buildAjax<baseRegister.ParamsType, baseRegister.ReturnType>
        (baseRegister.url(), baseRegister.type(), (req, res) => {
            dbUser.register(req.body)
            .then((result: baseRegister.ReturnType) => {
                res.send(result);
            });
        })
    }
}