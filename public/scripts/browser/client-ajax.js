var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var baseAjax = require('./../common/base-ajax');
var AjaxType = baseAjax.AjaxType;

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

(function (article) {
    var baseGet = baseAjax.article.get;
    var Get = (function (_super) {
        __extends(Get, _super);
        function Get() {
            _super.call(this, baseGet.url(), baseGet.type());
        }
        return Get;
    })(ClientAjax);
    function get(params) {
        return new Get().ajax(params);
    }
    article.get = get;

    var baseCreate = baseAjax.article.create;
    var Create = (function (_super) {
        __extends(Create, _super);
        function Create() {
            _super.call(this, baseCreate.url(), baseCreate.type());
        }
        return Create;
    })(ClientAjax);
    function create(params) {
        return new Create().ajax(params);
    }
    article.create = create;

    var baseGetAll = baseAjax.article.getAll;
    var GetAll = (function (_super) {
        __extends(GetAll, _super);
        function GetAll() {
            _super.call(this, baseGetAll.url(), baseGetAll.type());
        }
        return GetAll;
    })(ClientAjax);
    function getAll(params) {
        return new GetAll().ajax(params);
    }
    article.getAll = getAll;

    var baseUpdate = baseAjax.article.update;
    var Update = (function (_super) {
        __extends(Update, _super);
        function Update() {
            _super.call(this, baseUpdate.url(), baseUpdate.type());
        }
        return Update;
    })(ClientAjax);
    function update(params) {
        return new Update().ajax(params);
    }
    article.update = update;
})(exports.article || (exports.article = {}));
var article = exports.article;

(function (user) {
    var baseRegister = baseAjax.user.register;
    var Register = (function (_super) {
        __extends(Register, _super);
        function Register() {
            _super.call(this, baseRegister.url(), baseRegister.type());
        }
        return Register;
    })(ClientAjax);
    user.Register = Register;
    function register(params) {
        return new Register().ajax(params);
    }
    user.register = register;
})(exports.user || (exports.user = {}));
var user = exports.user;
//# sourceMappingURL=client-ajax.js.map
