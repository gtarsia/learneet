import utils = require('./Utils');
import CommonAjax = require('./../common/common-ajax');
import AjaxType = CommonAjax.AjaxType;
 
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

export module Article {
    import Art = CommonAjax.Article;
    export class Get
        extends ClientAjax<Art.Get.ParamsType,
                           Art.Get.ReturnType> {
        constructor() {
            super(Art.Get.url(), Art.Get.type());
        }
   }
}
