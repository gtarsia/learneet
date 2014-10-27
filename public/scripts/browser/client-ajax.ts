import utils = require('./Utils');
import baseAjax = require('./../common/base-ajax');
import AjaxType = baseAjax.AjaxType;

export class ClientAjax<ArgsType, ReturnType> {
    type: string;
    url: string;
    constructor(url: string, type: string) {
        this.url = url;
        this.type = type;
    }
    ajax(params: ArgsType): JQueryXHR<ReturnType> {
        switch (this.type) {
        case AjaxType.GET:
            return $.get(this.url, params); break;
        case AjaxType.POST:
            return $.post(this.url, params); break;
        }
    }
}

export module article {
    import baseGet = baseAjax.article.get;
    class Get extends ClientAjax<baseGet.ParamsType, baseGet.ReturnType> {
        constructor() {
            super(baseGet.url(), baseGet.type());
        }
    }
    export function get(params: baseGet.ParamsType): JQueryXHR<baseGet.ReturnType> {
        return new Get().ajax(params);
    }

    import baseCreate = baseAjax.article.create;
    class Create extends ClientAjax<baseCreate.ParamsType, baseCreate.ReturnType> {
        constructor() {
            super(baseCreate.url(), baseCreate.type());
        }
    }
    export function create(params: baseCreate.ParamsType): JQueryXHR<baseCreate.ReturnType> {
        return new Create().ajax(params);
    }

    import baseGetAll = baseAjax.article.getAll;
    class GetAll
        extends ClientAjax<baseGetAll.ParamsType, baseGetAll.ReturnType> {
        constructor() {
            super(baseGetAll.url(), baseGetAll.type());
        }
    }
    export function getAll(params: baseGetAll.ParamsType): JQueryXHR<baseGetAll.ReturnType> {
        return new GetAll().ajax(params);
    }

    import baseUpdate = baseAjax.article.update;
    class Update
        extends ClientAjax<baseUpdate.ParamsType, baseUpdate.ReturnType> {
        constructor() {
            super(baseUpdate.url(), baseUpdate.type());
        }
    }
    export function update(params: baseUpdate.ParamsType): JQueryXHR<baseUpdate.ReturnType> {
        return new Update().ajax(params);
    }
}

export module user {
    import baseRegister = baseAjax.user.register;
    export class Register 
        extends ClientAjax<baseRegister.ParamsType, baseRegister.ReturnType> {
        constructor() {
            super(baseRegister.url(), baseRegister.type());
        }
    }
    export function register(params: baseRegister.ParamsType): JQueryXHR<baseRegister.ReturnType> {
        return new Register().ajax(params);
    }
}

