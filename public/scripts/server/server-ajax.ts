import CommonAjax = require('./../common/common-ajax');
import express = require('express');
import AjaxType = CommonAjax.AjaxType;
import article = require('./article');

//FUNCION DEFINITIVA
export function getServerAjaxList(): ServerAjax<any, any>[] {
    return [
        new Article.Create(),
        new Article.Get(),
        new Article.GetAll(),
        new Article.Update()
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

export module Article {
    import CommonCreate = CommonAjax.Article.Create;
    export class Create
        extends ServerAjax<CommonCreate.ParamsType,
                            CommonCreate.ReturnType> {
        constructor() {
            super(CommonAjax.Article.Create.url(),
                  CommonAjax.Article.Create.type());
        }
        handler(req: express.Request, res: express.Response, next: Function) {
            article.create(req.body)
            .then((result: CommonCreate.ReturnType) => {
                res.send(result);
            });
        }
    }

    import CommonGet = CommonAjax.Article.Get;
    export class Get
        extends ServerAjax<CommonGet.ParamsType,
                           CommonGet.ReturnType> {
        constructor() {
            super(CommonAjax.Article.Get.url(),
                  CommonAjax.Article.Get.type());
        }
        handler(req: express.Request, res: express.Response, next: Function) {
            article.get(req.query)
            .then((result: CommonGet.ReturnType) => {
                debugger;
                console.log('Se pidio los articulos');
                res.send(result);
            });
        }    
    }

    import CommonGetAll = CommonAjax.Article.GetAll;
    export class GetAll
        extends ServerAjax<CommonGetAll.ParamsType, CommonGetAll.ReturnType> {
        constructor() {
            super(CommonGetAll.url(), CommonGetAll.type());
        }
        handler(req: express.Request, res: express.Response, next: Function) {
            article.getAll()
            .then((result: CommonGetAll.ReturnType) => {
                debugger;
                console.log('Se pidieron todos los articulos');
                res.send(result);
            });
        }
    }

    import CommonUpdate = CommonAjax.Article.Update;
    export class Update
        extends ServerAjax<CommonUpdate.ParamsType, CommonUpdate.ReturnType> {
        constructor() {
            super(CommonUpdate.url(), CommonUpdate.type());
        }
        handler(req: express.Request, res: express.Response, next: Function) {
            article.update(req.body)
            .then((result: CommonUpdate.ReturnType) => {
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
