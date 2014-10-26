
export var AjaxType = {
    GET: "GET",
    POST: "POST"
}

export interface JsonReturn<T> {
    ok: boolean;
    why: string;
    result: T;
}

export module Article {

    export interface Fields {
        title: string; content: string; 
    }
    export interface Id {
        id: string;
    }
    export interface FieldsWithId extends Fields, Id {
    }
    export function WrapFieldWithId(fields: Fields, id: string) : FieldsWithId {
        return { title: fields.title, content: fields.content, id: id }
    }

    export module Create {
        export function url(): string { return '/api/create_article' }
        export function type(): string { return AjaxType.POST }
        export interface ParamsType extends Fields {}
        export interface ReturnType extends JsonReturn<Id> { }
    }

    export module Get {
        export function url(): string { return '/api/get' }
        export function type(): string { return AjaxType.GET }
        export interface ParamsType extends Id {}
        export interface ReturnType extends JsonReturn<FieldsWithId> { }
    }

    export module GetAll {
        export function url(): string { return '/api/getall' }
        export function type(): string { return AjaxType.GET}
        export interface ParamsType {} 
        export interface ReturnType extends JsonReturn<FieldsWithId[]> {}
    }
}

/*
export interface CommonAjax {
    url(): string
}

export module Article {
    export class Create implements AjaxPost, CommonAjax {
        url(): string {
            return '/api/create_article';
        }
    }
}
*/

/*
export interface Ajax { }
export interface AjaxGet { }
export interface AjaxPost { }

export module Article {
    export module Create {
        export function url(): string {
            return '/api/create_article';
        }
        export interface ReturnType {

        }
        export interface ArgsType {
            content: string;
        }
    }
}
*/
    /*
    export class BaseAjax<ArgsType, ReturnType> {
        ajax: IAjax<ArgsType, ReturnType>;
        constructor(ajax: IAjax<ArgsType, ReturnType>) {
            this.ajax = ajax;
        }
        url(): string {
            throw new Error('Implement in child class');
        }
        run(param: ArgsType) : JQueryGenericPromise<ReturnType> {
            this.ajax.run(this.url(), param);
        }
    }

    export interface GenericReturn { ok: boolean, errMsg: string }

    export module Article {
        export interface CreateArgs { content: string }
        export interface CreateReturn extends GenericReturn { }
        export class Create extends BaseAjax<CreateArgs, {}> {
            constructor(ajax: IAjaxPost<CreateArgs, {}>) {
                super(ajax);
            }
            url(): string { return '/create_article'; }
        }
    }
    */

if (typeof customExports != 'undefined')
    customExports[getScriptName()] = exports;
/*
var scripts = document.getElementsByTagName('script');
var lastScript = scripts[scripts.length-1];
var scriptName = lastScript.src;
*/