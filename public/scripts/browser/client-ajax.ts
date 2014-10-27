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
    ajax(params: ArgsType): JQueryXHR {
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
    export class Get extends ClientAjax<baseGet.ParamsType, baseGet.ReturnType> {
        constructor() {
            super(baseGet.url(), baseGet.type());
        }
    }

    import baseCreate = baseAjax.article.create;
    export class Create extends ClientAjax<baseCreate.ParamsType, baseCreate.ReturnType> {
        constructor() {
            super(baseCreate.url(), baseCreate.type());
        }
    }

    import baseGetAll = baseAjax.article.getAll;
    export class GetAll
        extends ClientAjax<baseGetAll.ParamsType, baseGetAll.ReturnType> {
        constructor() {
            super(baseGetAll.url(), baseGetAll.type());
        }
    }

    import baseUpdate = baseAjax.article.update;
    export class Update
        extends ClientAjax<baseUpdate.ParamsType, baseUpdate.ReturnType> {
        constructor() {
            super(baseUpdate.url(), baseUpdate.type());
        }
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
}

