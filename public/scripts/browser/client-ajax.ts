import utils = require('./Utils');
import baseAjax = require('./../common/base-ajax');
import AjaxType = baseAjax.AjaxType;
import IAjax = baseAjax.IAjax;


export function buildAjax<ArgType, Return>
(url: string, type: string, params: ArgType) : JQueryXHR<Return> {
    var obj = {p: JSON.stringify(params)};
    switch (type) {
    case AjaxType.GET:
        return $.get(url, obj); break;
    case AjaxType.POST:
        return $.post(url, obj); break;
    }
}

export function buildIAjax<ArgType, Return>
(ajax: IAjax, params: ArgType) : JQueryXHR<Return> {
    return buildAjax(ajax.url(), ajax.type(), params);
}

export module article {
    import _get = baseAjax.article.get;
    export function get(params: _get.Params) {
        return buildAjax<_get.Params, _get.Return>
        (_get.url(), _get.type(), params);
    }

    import _create = baseAjax.article.create;
    export function create(params: _create.Params)  {
        return buildIAjax<_create.Params, _create.Return>
        (new _create.Ajax(), params);
    }

    import _getAll = baseAjax.article.getAll;
    export function getAll(params) {
        return buildAjax<_getAll.Params, _getAll.Return>
        (_getAll.url(), _getAll.type(), params);
    }

    import _update = baseAjax.article.update;
    export function update(params) {
        return buildAjax<_update.Params, _update.Return>
        (_update.url(), _update.type(), params);
    }

    import _query = baseAjax.article.queryTitle;
    export function query(params: _query.Params) {
        return buildAjax<_query.Params, _query.Return>
        (_query.url(), _query.type(), params);
    }

    import _addDep = baseAjax.article.addDependency;
    export function addDependency(params: _addDep.Params){
        return buildAjax<_addDep.Params, _addDep.Return>
        (_addDep.url(), _addDep.type(), params);
    }

    import _getDeps = baseAjax.article.getDependencies;
    export function getDependencies(params: _getDeps.Params) {
        return buildAjax<_getDeps.Params, _getDeps.Return>
        (_getDeps.url(), _getDeps.type(), params)
    }

    import _RemDep = baseAjax.article.remDependency;
    export function remDependency(params: _RemDep.Params) {
        return buildAjax<_RemDep.Params, _RemDep.Return>
        (_RemDep.url(), _RemDep.type(), params);
    }

    import _getScore = baseAjax.article.getScore;
    export function getScore(params: _getScore.Params) {
        return buildAjax<_getScore.Params, _getScore.Return>
        (_getScore.url(), _getScore.type(), params);
    }

    import _getScoreByUser = baseAjax.article.getScoreByUser;
    export function getScoreByUser(params: _getScoreByUser.Params) {
        return buildAjax<_getScoreByUser.Params, _getScoreByUser.Return>
        (_getScoreByUser.url(), _getScoreByUser.type(), params);
    }

    import _UpScore = baseAjax.article.upScore;
    export function upScore(params: _UpScore.Params) {
        return buildAjax<_UpScore.Params, _UpScore.Return>
        (_UpScore.url(), _UpScore.type(), params);
    } 

    import _DownScore = baseAjax.article.downScore;
    export function downScore(params: _DownScore.Params) {
        return buildAjax<_DownScore.Params, _DownScore.Return>
        (_DownScore.url(), _DownScore.type(), params);
    } 
}

export module proposal {
    import _AddProp = baseAjax.proposal.add;
    export function add(params: _AddProp.Params) {
        return buildAjax<_AddProp.Params, _AddProp.Return>
        (_AddProp.url(), _AddProp.type(), params);
    }

    import _getAll = baseAjax.proposal.getAll;
    export function getAll(params: _getAll.Params) {
        return buildAjax<_getAll.Params, _getAll.Return>
        (_getAll.url(), _getAll.type(), params);
    }
}

export module user {
    import _Register = baseAjax.user.register;
    export function register(params: _Register.Params) {
        return buildAjax<_Register.Params, _Register.Return>
        (_Register.url(), _Register.type(), params);
    }

    import _Auth = baseAjax.user.auth;
    export function auth(params: _Auth.Params) {
        return buildAjax<_Auth.Params, _Auth.Return>
        (_Auth.url(), _Auth.type(), params);
    }
}

