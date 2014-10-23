import CommonAjax = require('./../common/common-ajax');
import express = require('express');
import AjaxType = CommonAjax.AjaxType;
import article = require('./article');

//FUNCION DEFINITIVA
export function getServerAjaxList(): ServerAjax<any, any>[] {
    return [
        new Article.Create(),
        new Article.Get()
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
    import Get = CommonAjax.Article.Get;
    export class Create
        extends ServerAjax<CommonAjax.Article.Create.ParamsType,
                            CommonAjax.Article.Create.ReturnType> {
        constructor() {
            super(CommonAjax.Article.Create.url(),
                  CommonAjax.Article.Create.type());
        }
        handler(req: express.Request, res: express.Response, next: Function) {
            throw new Error('I should implement this');
        }
    }

    export class Get
        extends ServerAjax<CommonAjax.Article.Get.ParamsType,
                           CommonAjax.Article.Get.ReturnType> {
        constructor() {
            super(CommonAjax.Article.Get.url(),
                  CommonAjax.Article.Get.type());
        }
        handler(req: express.Request, res: express.Response, next: Function) {
            article.get(req.query.id)
            .then((result: Get.ReturnType) => {
                debugger;
                console.log('Se pidio los articulos');
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
