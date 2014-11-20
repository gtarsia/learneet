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
        article.query(),
        article.addDependency(),
        article.getDependencies(),
        article.remDependency(),
        user.register()
    ];
}

export function restCb(url: string, type: string, fn: any) {
    function parsingHandler() {
        return (req, res) => {
            if (type == AjaxType.GET)
                req.query = JSON.parse(req.query.p);
            else if (type == AjaxType.POST)
                req.body = JSON.parse(req.body.p);
            handler(req, res);
        }
    }
    return (app: express.Express) => {
        switch (type) {
        case AjaxType.GET:
            app.get(url, parsingHandler()); break;
        case AjaxType.POST:
            app.post(url, parsingHandler()); break;
        }
    }
}

export function buildAjax<ArgsType, ReturnType>
(url: string, type: string, handler: (req: express.Request, res: express.Response)=> void) {
    function parsingHandler() {
        return (req, res) => {
            if (type == AjaxType.GET)
                req.query = JSON.parse(req.query.p);
            else if (type == AjaxType.POST)
                req.body = JSON.parse(req.body.p);
            handler(req, res);
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

    import baseQuery = baseAjax.article.queryTitle;
    export function query() {
        return buildAjax<baseQuery.ParamsType, baseQuery.ReturnType>
        (baseQuery.url(), baseQuery.type(), (req, res) => {
            debugger;
            dbArticle.TitleSearch.query(req.query)
            .then((result: baseQuery.ReturnType) => {
                res.send(result);
            })
        })
    }

    import baseAddDependency = baseAjax.article.addDependency;
    export function addDependency() {
        return buildAjax<baseAddDependency.ParamsType, baseAddDependency.ReturnType>
        (baseAddDependency.url(), baseAddDependency.type(), (req, res) => {
            debugger;
            dbArticle.addDependency(req.body)
            .then(result => {
                debugger;
                res.send(result);
            });
        })
    }

    import baseGetDeps = baseAjax.article.getDependencies;
    export function getDependencies() {
        return buildAjax<baseGetDeps.ParamsType, baseAddDependency.ReturnType>
        (baseGetDeps.url(), baseGetDeps.type(), (req, res) => {
            dbArticle.getDependencies(req.query)
            .then(result => {
                res.send(result);
            })
        })
    }

    import baseRemDep = baseAjax.article.remDependency;
    export function remDependency() {
        return buildAjax<baseRemDep.ParamsType, baseRemDep.ReturnType>
        (baseRemDep.url(), baseRemDep.type(), (req, res) => {
            debugger;
            dbArticle.remDependency(req.body)
            .then(result => {
                res.send(result);
            })
        })
    }
}

export module proposal {
    import baseAdd = baseAjax.proposal.add;
    export function add() {
        return buildAjax<baseAdd.ParamsType, baseAdd.ReturnType>
        (baseAdd.url(), baseAdd.type(), (req, res) => {
            dbProposal.add(req.body)
            .then(result => {
                res.send(result);
            })
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