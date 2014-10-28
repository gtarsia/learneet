import baseAjax = require('./../common/base-ajax');
import express = require('express');
import AjaxType = baseAjax.AjaxType;
import article = require('./article');
import user = require('./user');

//FUNCION DEFINITIVA
export function getServerAjaxList(): ServerAjax<any, any>[] {
    return [
        new articleAjax.Create(),
        new articleAjax.Get(),
        new articleAjax.GetAll(),
        new articleAjax.Update(),
        new userAjax.Register()
    ];
}

export class ServerAjax<ArgsType, ReturnType> {
    type: string;
    url: string;
    constructor(url: string, type: string) {
        this.url = url;
        this.type = type;
    }
    //100% DEFINITIVO
    setExpressAjax(app: express.Express) {
        switch (this.type) {
        case AjaxType.GET:
            app.get(this.url, this.handler); break;
        case AjaxType.POST:
            app.post(this.url, this.handler); break;
        }
    }
    handler(req: express.Request, res: express.Response, next: Function) {
        this.run(req.params).then(value => {
                res.send(value);
            }, reason => {
                throw new Error(reason);
            });
    }
    run(args: ArgsType): JQueryGenericPromise<ReturnType> {
        throw new Error('Abstract method');
    }
}

export module articleAjax {
    import baseCreate = baseAjax.article.create;
    export class Create
        extends ServerAjax<baseCreate.ParamsType,
                            baseCreate.ReturnType> {
        constructor() {
            super(baseCreate.url(), baseCreate.type());
        }
        handler(req: express.Request, res: express.Response, next: Function) {
            article.create(req.body)
            .then((result: baseCreate.ReturnType) => {
                res.send(result);
            });
        }
    }

    import baseGet = baseAjax.article.get;
    export class Get
        extends ServerAjax<baseGet.ParamsType,
                           baseGet.ReturnType> {
        constructor() {
            super(baseGet.url(), baseGet.type());
        }
        handler(req: express.Request, res: express.Response, next: Function) {
            article.get(req.query)
            .then((result: baseGet.ReturnType) => {
                debugger;
                console.log('Se pidio los articulos');
                res.send(result);
            });
        }    
    }

    import baseGetAll = baseAjax.article.getAll;
    export class GetAll
        extends ServerAjax<baseGetAll.ParamsType, baseGetAll.ReturnType> {
        constructor() {
            super(baseGetAll.url(), baseGetAll.type());
        }
        handler(req: express.Request, res: express.Response, next: Function) {
            article.getAll()
            .then((result: baseGetAll.ReturnType) => {
                debugger;
                console.log('Se pidieron todos los articulos');
                res.send(result);
            });
        }
    }

    import baseUpdate = baseAjax.article.update;
    export class Update
        extends ServerAjax<baseUpdate.ParamsType, baseUpdate.ReturnType> {
        constructor() {
            super(baseUpdate.url(), baseUpdate.type());
        }
        handler(req: express.Request, res: express.Response, next: Function) {
            article.update(req.body)
            .then((result: baseUpdate.ReturnType) => {
                debugger;
                console.log('Se actualizo un articulo');
                res.send(result);
            });
        }
    }
    /*
    export function Create(params: any, cb: any) {
        DB.Article.Create(params, cb);
    }
    */
}

export module userAjax {
    import baseRegister = baseAjax.user.register;
    export class Register
        extends ServerAjax<baseRegister.ParamsType, baseRegister.ReturnType> {
        constructor() {
            super(baseRegister.url(), baseRegister.type());
        }
        handler(req: express.Request, res: express.Response, next: Function) {
            debugger;
            user.register(req.body)
            .then((result: baseRegister.ReturnType) => {
                debugger;
                console.log('Se registro un usuario');
                res.send(result);
            });
        }
    }
}