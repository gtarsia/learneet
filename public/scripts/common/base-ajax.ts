
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
export interface Score {
    score: string;
}
export interface Desc {
    changesDescription: string;
}
export interface ModContent {
    modifiedContent: string;
}
export interface Starred {
    starred : boolean;
}
export interface UserScore {
    userScore: string;
}
export interface Fields extends Title, Content {}
export interface FieldsWithId extends Fields, Id {}
export interface TitleWithId extends Title, Id {}
export module article {
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
        export class Ajax implements IAjax{
            url(): string { return '/api/get' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { article: Id }
        export interface Return extends JsonReturn<FieldsWithId> {}
    }

    export module getTitleWithId {
        export class Ajax implements IAjax{
            url(): string { return '/api/gettitleandid' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { article: Id }
        export interface Return extends JsonReturn<TitleWithId> { }
    }

    export module getAll {
        export class Ajax implements IAjax{
            url(): string { return '/api/getall' }
            type(): string { return AjaxType.GET }
        }
        export interface Params {} 
        export interface Return extends JsonReturn<FieldsWithId[]> {}
    }

    export module update {
        export class Ajax implements IAjax{
            url(): string { return '/api/update' }
            type(): string { return AjaxType.POST }
        }
        export interface Params { article: FieldsWithId; }
        export interface Return extends JsonReturn<Id> { }
    }

    export module queryTitle {
        export class Ajax implements IAjax{
            url(): string { return '/api/querytitle' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { query: string }
        export interface Return extends JsonReturn<TitleWithId[]> { }
    }
}

export module score {
    export module get {
        export class Ajax implements IAjax{
            url(): string { return '/api/get_article_score' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { article: {id: string} }
        export interface Return extends JsonReturn<{article: {score: Number}}> {}
    }

    export module getByUser {
        export class Ajax implements IAjax{
            url(): string { return '/api/get_score_by_user' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { article: {id: string}; user: {id: string} }
        export interface Return extends JsonReturn<{ article: {score: Number}}> {}
    }
    export module up {
        export class Ajax implements IAjax{
            url(): string { return '/api/up_score_article' }
            type(): string { return AjaxType.POST }
        }
        export interface Params { article: {id: string} }
        export interface Return extends JsonReturn<boolean> {}
    }
    export module removeUp {
        export class Ajax implements IAjax{
            url(): string { return '/api/remove_up_score_article' }
            type(): string { return AjaxType.POST }
        }
        export interface Params { article: {id: string} }
        export interface Return extends JsonReturn<boolean> {}
    }

    export module down {
        export class Ajax implements IAjax{
            url(): string { return '/api/down_score_article' }
            type(): string { return AjaxType.POST }
        }
        export interface Params { article: {id: string}; user: {id: string} }
        export interface Return extends JsonReturn<boolean> {}
    }
    export module removeDown {
        export class Ajax implements IAjax{
            url(): string { return '/api/remove_down_score_article' }
            type(): string { return AjaxType.POST }
        }
        export interface Params { article: {id: string} }
        export interface Return extends JsonReturn<boolean> {}
    }
}

export module dependencies {
    export interface TitleIdScoreStarredUserScore 
    extends TitleWithId, Score, Starred, UserScore {} 
    export module add {
        export class Ajax implements IAjax{
            url(): string { return '/api/adddependency' }
            type(): string { return AjaxType.POST }
        }
        export interface Params { dependent: Id; dependency: Id; }
        export interface Return extends JsonReturn<boolean> {}
    }

    export module getAll {
        export class Ajax implements IAjax{
            url(): string { return '/api/getdependencies' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { dependent: Id }
        export interface Return extends JsonReturn<TitleIdScoreStarredUserScore[]> {}
    }

    export module getCurrentUserScore {
        export class Ajax implements IAjax{
            url(): string { return '/api/getdependencyscoreofcurrentuser' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { dependent: Id; dependency: Id }
        export interface Return extends JsonReturn<Score> {}
    }

    export module star {
        export class Ajax implements IAjax{
            url(): string { return '/api/stardependency' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { dependent: Id; dependency: Id }
        export interface Return extends JsonReturn<Starred> {}
    }

    export module unstar {
        export class Ajax implements IAjax{
            url(): string { return '/api/unstardependency' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { dependent: Id; dependency: Id }
        export interface Return extends JsonReturn<Starred> {}
    }

    export module remove {
        export class Ajax implements IAjax{
            url(): string { return '/api/remdependency' }
            type(): string { return AjaxType.POST }
        }
        export interface Params { dependent: Id; dependency: Id; }
        export interface Return extends JsonReturn<boolean> {}
    }
}

export module changes {
    export var ChangeState = {
        open: 'open', closed: 'closed'
    }
    export interface ChangeFields {
        id: string;
        state: string;
        description: string;
        changes: string;
        date: string;
        author: string;
    }
    export interface ChangeScore {
        change: {score: String};
    }
    export module getAll {
        export class Ajax implements IAjax{
            url(): string { return '/api/getallchanges' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { article: Id }
        export interface Return extends JsonReturn<ChangeFields[]> {}
    }

    export module get {
        export class Ajax implements IAjax{
            url(): string { return '/api/getchange' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { article: Id; change: Id; }
        export interface Return extends JsonReturn<{change: ChangeFields; article: Fields}> {}
    }

    export module getScore {
        export class Ajax implements IAjax{
            url(): string { return '/api/getchangescore' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { article: Id; change: Id; }
        export interface Return extends JsonReturn<ChangeScore> {}
    }

    export module getScoreByUser {
        export class Ajax implements IAjax{
            url(): string { return '/api/getchangescorebyuser' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { article: Id; change: Id; }
        export interface Return extends JsonReturn<boolean> {}
    }

    export module upVote {
        export class Ajax implements IAjax{
            url(): string { return '/api/upvotechange' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { article: Id; change: Id; }
        export interface Return extends JsonReturn<boolean> {}
    }

    export module removeUpVote {
        export class Ajax implements IAjax{
            url(): string { return '/api/removechangeupvote' }
            type(): string { return AjaxType.GET }
        }
        export interface Params { article: Id; change: Id; }
        export interface Return extends JsonReturn<boolean> {}
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
        export class Ajax implements IAjax{
            url(): string { return '/api/register' }
            type(): string { return AjaxType.POST }
        }
        export interface Params extends RegisterFields {}
        export interface Return extends JsonReturn<Boolean> {}
    }

    export interface AuthFields {
        username: string; password: string;
    }
    export module auth {
        export class Ajax implements IAjax{
            url(): string { return '/api/gettitleandid' }
            type(): string { return AjaxType.GET }
        }
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