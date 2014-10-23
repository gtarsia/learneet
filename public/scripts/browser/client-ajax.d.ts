import CommonAjax = require('./../common/common-ajax');
export declare class ClientAjax<ArgsType, ReturnType> {
    public type: string;
    public url: string;
    constructor(url: string, type: string);
    public ajax(params: ArgsType): JQueryXHR;
}
export declare module Article {
    class Get extends ClientAjax<CommonAjax.Article.Get.ParamsType, CommonAjax.Article.Get.ReturnType> {
        constructor();
    }
}
