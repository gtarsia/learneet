var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CommonAjax = require('./../common/common-ajax');
var AjaxType = CommonAjax.AjaxType;

var ClientAjax = (function () {
    function ClientAjax(url, type) {
        this.url = url;
        this.type = type;
    }
    ClientAjax.prototype.ajax = function (params) {
        switch (this.type) {
            case AjaxType.GET:
                return $.get(this.url, params);
                break;
            case AjaxType.POST:
                return $.post(this.url, params);
                break;
        }
    };
    return ClientAjax;
})();
exports.ClientAjax = ClientAjax;

(function (Article) {
    var Art = CommonAjax.Article;
    var Get = (function (_super) {
        __extends(Get, _super);
        function Get() {
            _super.call(this, Art.Get.url(), Art.Get.type());
        }
        return Get;
    })(ClientAjax);
    Article.Get = Get;
})(exports.Article || (exports.Article = {}));
var Article = exports.Article;
//# sourceMappingURL=client-ajax.js.map
