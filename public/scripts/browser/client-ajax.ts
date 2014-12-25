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
        return buildIAjax<_get.Params, _get.Return>
        (new _get.Ajax(), params);
    }

    import _create = baseAjax.article.create;
    export function create(params: _create.Params)  {
        return buildIAjax<_create.Params, _create.Return>
        (new _create.Ajax(), params);
    }

    import _getAll = baseAjax.article.getAll;
    export function getAll(params) {
        return buildIAjax<_getAll.Params, _getAll.Return>
        (new _getAll.Ajax(), params);
    }

    import _update = baseAjax.article.update;
    export function update(params) {
        return buildIAjax<_update.Params, _update.Return>
        (new _update.Ajax(), params);
    }

    import _query = baseAjax.article.queryTitle;
    export function query(params) {
        return buildIAjax<_query.Params, _query.Return>
        (new _query.Ajax(), params);
    }
}

export module score {
    import _get = baseAjax.score.get;
    export function get(params) {
        return buildIAjax<_get.Params, _get.Return>
        (new _get.Ajax(), params);
    }

    import _getByUser = baseAjax.score.getByUser;
    export function getByUser(params) {
        return buildIAjax<_getByUser.Params, _getByUser.Return>
        (new _getByUser.Ajax(), params);
    }

    import _up = baseAjax.score.up;
    export function upVote(params) {
        return buildIAjax<_up.Params, _up.Return>
        (new _up.Ajax(), params);
    }

    import _removeUp = baseAjax.score.removeUp;
    export function removeUpVote(params) {
        return buildIAjax<_removeUp.Params, _removeUp.Return>
        (new _removeUp.Ajax(), params);
    }

    import _down = baseAjax.score.down;
    export function downVote(params) {
        return buildIAjax<_down.Params, _down.Return>
        (new _down.Ajax(), params);
    } 

    import _removeDown = baseAjax.score.removeDown;
    export function removeDownVote(params) {
        return buildIAjax<_removeDown.Params, _removeDown.Return>
        (new _removeDown.Ajax(), params);
    }
/*
    import _removeUp = baseAjax.score.removeUp;
    export function removeUpVote(params) {
        return buildIAjax<_removeUp.Params, _removeUp.Return>
        (new _removeUp.Ajax(), params);
    }
    */
}

export module dependencies {
    import _add = baseAjax.dependencies.add;
    export function add(params){
        return buildIAjax<_add.Params, _add.Return>
        (new _add.Ajax(), params);
    }

    import _get = baseAjax.dependencies.get;
    export function get(params) {
        return buildIAjax<_get.Params, _get.Return>
        (new _get.Ajax(), params)
    }

    import _remove = baseAjax.dependencies.remove;
    export function remove(params) {
        return buildIAjax<_remove.Params, _remove.Return>
        (new _remove.Ajax(), params);
    }
}

export module changes {
    import _getAll = baseAjax.changes.getAll;
    export function get(params) {
        return buildIAjax<_getAll.Params, _getAll.Return>
        (new _getAll.Ajax(), params)
    }
}
/*
export module proposal {
    import _add = baseAjax.proposal.add;
    export function add(params) {
        return buildIAjax<_add.Params, _add.Return>
        (new _add.Ajax(), params);
    }

    import _getAll = baseAjax.proposal.getAll;
    export function getAll(params) {
        return buildIAjax<_getAll.Params, _getAll.Return>
        (new _getAll.Ajax(), params);
    }
}
*/
export module user {
    import _register = baseAjax.user.register;
    export function register(params) {
        return buildIAjax<_register.Params, _register.Return>
        (new _register.Ajax(), params);
    }

    import _auth = baseAjax.user.auth;
    export function auth(params) {
        return buildIAjax<_auth.Params, _auth.Return>
        (new _auth.Ajax(), params);
    }
}

