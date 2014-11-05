import utils = require('./Utils');
import baseAjax = require('./../common/base-ajax');
import AjaxType = baseAjax.AjaxType;


export function buildAjax<ArgType, ReturnType>
(url: string, type: string, params: ArgType) {
    switch (type) {
    case AjaxType.GET:
        return $.get(url, params); break;
    case AjaxType.POST:
        return $.post(url, params); break;
    }
}

export module article {
    import baseGet = baseAjax.article.get;
    export function get(params: baseGet.ParamsType) 
    : JQueryXHR<baseGet.ReturnType> {
        return buildAjax(baseGet.url(), baseGet.type(), params);
    }

    import baseCreate = baseAjax.article.create;
    export function create(params: baseCreate.ParamsType) 
    : JQueryXHR<baseCreate.ReturnType> {
        return buildAjax(baseCreate.url(), baseCreate.type(), params);
    }

    import baseGetAll = baseAjax.article.getAll;
    export function getAll(params: baseGetAll.ParamsType) 
    : JQueryXHR<baseGetAll.ReturnType> {
        return buildAjax(baseGetAll.url(), baseGetAll.type(), params);
    }

    import baseUpdate = baseAjax.article.update;
    export function update(params: baseUpdate.ParamsType) 
    : JQueryXHR<baseUpdate.ReturnType> {
        return buildAjax(baseUpdate.url(), baseUpdate.type(), params);
    }

    import baseQuery = baseAjax.article.queryTitle;
    export function query(params: baseQuery.ParamsType)
    : JQueryXHR<baseQuery.ReturnType> {
        return buildAjax(baseQuery.url(), baseQuery.type(), params);
    }
}

export module user {
    import baseRegister = baseAjax.user.register;
    export function register(params: baseRegister.ParamsType) 
    : JQueryXHR<baseRegister.ReturnType> {
        return buildAjax(baseRegister.url(), baseRegister.type(), params);
    }

    import baseAuth = baseAjax.user.auth;
    export function auth(params: baseAuth.ParamsType) 
    : JQueryXHR<baseAuth.ReturnType> {
        return buildAjax(baseAuth.url(), baseAuth.type(), params);
    }
}

