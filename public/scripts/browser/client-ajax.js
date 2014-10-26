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
    var Create = (function (_super) {
        __extends(Create, _super);
        function Create() {
            _super.call(this, Art.Create.url(), Art.Create.type());
        }
        return Create;
    })(ClientAjax);
    Article.Create = Create;
    var GetAll = (function (_super) {
        __extends(GetAll, _super);
        function GetAll() {
            _super.call(this, Art.GetAll.url(), Art.GetAll.type());
        }
        return GetAll;
    })(ClientAjax);
    Article.GetAll = GetAll;
    var Update = (function (_super) {
        __extends(Update, _super);
        function Update() {
            _super.call(this, Art.Update.url(), Art.Update.type());
        }
        return Update;
    })(ClientAjax);
    Article.Update = Update;
})(exports.Article || (exports.Article = {}));
var Article = exports.Article;
//# sourceMappingURL=client-ajax.js.map
