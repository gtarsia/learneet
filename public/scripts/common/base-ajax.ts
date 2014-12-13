
export var AjaxType = {
    GET: "GET",
    POST: "POST"
}

export interface JsonReturn<T> {
    ok: boolean;
    why: string;
    result: T;
}

export interface IAjax {
    url(): string;
    type(): string;
}

export interface Title {
    title: string; 
}
export interface Content {
    content: string;
}
export interface Id {
    id: string;
}
export interface Desc {
    changesDescription: string;
}
export interface ModContent {
    modifiedContent: string;
}
export module article {
    export interface Fields extends Title, Content {}
    export interface TitleWithId extends Title, Id {}
    export interface FieldsWithId extends Fields, Id {}
    export function WrapFieldWithId(fields: {article: Fields}, id: string) : {article: FieldsWithId} {
        return { article: { 
            title: fields.article.title, content: fields.article.content, id: id } }
    }

    export module create {
        export class Ajax implements IAjax{
            url(): string { return '/api/create_article' }
            type(): string { return AjaxType.POST }
        }
        export interface Params { article: Fields}
        export interface Return extends JsonReturn<Id> { }
    }

    export module get {
        export function url(): string { return '/api/get' }
        export function type(): string { return AjaxType.GET }
        export interface Params { article: Id }
        export interface Return extends JsonReturn<FieldsWithId> {}
    }

    export module getTitleWithId {
        export function url(): string { return '/api/gettitleandid' }
        export function type(): string { return AjaxType.GET }
        export interface Params { article: Id }
        export interface Return extends JsonReturn<TitleWithId> { }
    }

    export module getAll {
        export function url(): string { return '/api/getall' }
        export function type(): string { return AjaxType.GET}
        export interface Params {} 
        export interface Return extends JsonReturn<FieldsWithId[]> {}
    }

    export module update {
        export function url(): string { return '/api/update' }
        export function type(): string { return AjaxType.POST }
        export interface Params { article: FieldsWithId; }
        export interface Return extends JsonReturn<Id> { }
    }

    export module queryTitle {
        export function url(): string { return '/api/querytitle'}
        export function type(): string { return AjaxType.GET }
        export interface Params { query: string }
        export interface Return extends JsonReturn<TitleWithId[]> { }
    }

    export module getScore {
        export function url(): string { return '/api/get_article_score'}
        export function type(): string { return AjaxType.GET }
        export interface Params { article: {id: string} }
        export interface Return extends JsonReturn<{article: {score: Number}}> {}
    }

    export module getScoreByUser {
        export function url(): string { return '/api/get_score_by_user'}
        export function type(): string { return AjaxType.GET }
        export interface Params { article: {id: string}; user: {id: string} }
        export interface Return extends JsonReturn<{ article: {score: Number}}> {}
    }

    export module upScore {
        export function url(): string { return '/api/up_score_article'}
        export function type(): string { return AjaxType.POST }
        export interface Params { article: {id: string}; user: {id: string} }
        export interface Return extends JsonReturn<boolean> {}
    }

    export module downScore {
        export function url(): string { return '/api/down_score_article'}
        export function type(): string { return AjaxType.POST }
        export interface Params { article: {id: string}; user: {id: string} }
        export interface Return extends JsonReturn<boolean> {}
    }

    export module addDependency {
        export function url(): string { return '/api/adddependency'}
        export function type(): string { return AjaxType.POST }
        export interface Params { dependent: Id; dependency: Id; }
        export interface Return extends JsonReturn<boolean> {}
    }

    export module getDependencies {
        export function url(): string { return '/api/getdependencies' }
        export function type(): string { return AjaxType.GET }
        export interface Params { article: Id }
        export interface Return extends JsonReturn<TitleWithId[]> {}
    }

    export module remDependency {
        export function url(): string { return '/api/remdependency'}
        export function type(): string { return AjaxType.POST }
        export interface Params { dependent: Id; dependency: Id; }
        export interface Return extends JsonReturn<boolean> {}
    }
}

export module proposal {
    export interface AddType {
        article: Id;
        description: string;
        modifiedContent: string;
    }
    export module add {
        export function url(): string { return '/api/add_proposal'}
        export function type(): string { return AjaxType.POST }
        export interface Params {
            proposal: AddType
        }
        export interface Return extends JsonReturn<void> {}
    }

    export module getAll {
        export function url(): string { return '/api/get_all'}
        export function type(): string { return AjaxType.POST }
        export interface Params {
            proposal: {article: {id: string} }
        }
        export interface ProposalWithId {
            id: string; changes: string; description: string;
        }
        export interface Return extends JsonReturn<{ proposals: ProposalWithId[]}> {}
    }
}

export module user {
    export interface BaseFields {
        username: string; email: string;
    }
    export interface RegisterFields extends BaseFields {
        password: string; 
    }
    export interface UserFields extends BaseFields {
        activated: Boolean; hash: string; id: string;
    }

    export module register {
        export function url(): string { return '/api/register'}
        export function type(): string { return AjaxType.POST }
        export interface Params extends RegisterFields {}
        export interface Return extends JsonReturn<Boolean> {}
    }

    export interface AuthFields {
        username: string; password: string;
    }
    export module auth {
        export function url(): string { return '/api/auth'}
        export function type(): string { return AjaxType.POST }
        export interface Params extends AuthFields {};
        export interface Return extends JsonReturn<{username: string; id: string;}> {} 
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
        export interface Return {

        }
        export interface ArgsType {
            content: string;
        }
    }
}
*/
    /*
    export class BaseAjax<ArgsType, Return> {
        ajax: IAjax<ArgsType, Return>;
        constructor(ajax: IAjax<ArgsType, Return>) {
            this.ajax = ajax;
        }
        url(): string {
            throw new Error('Implement in child class');
        }
        run(param: ArgsType) : JQueryGenericPromise<Return> {
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