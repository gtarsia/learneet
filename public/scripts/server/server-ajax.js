var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var baseAjax = require('./../common/base-ajax');

var AjaxType = baseAjax.AjaxType;
var article = require('./article');
var user = require('./user');

function getServerAjaxList() {
    return [
        new articleAjax.Create(),
        new articleAjax.Get(),
        new articleAjax.GetAll(),
        new articleAjax.Update(),
        new userAjax.Register()
    ];
}
exports.getServerAjaxList = getServerAjaxList;

var ServerAjax = (function () {
    function ServerAjax(url, type) {
        this.url = url;
        this.type = type;
    }
    ServerAjax.prototype.setExpressAjax = function (app) {
        switch (this.type) {
            case AjaxType.GET:
                app.get(this.url, this.handler);
                break;
            case AjaxType.POST:
                app.post(this.url, this.handler);
                break;
        }
    };
    ServerAjax.prototype.handler = function (req, res, next) {
        this.run(req.params).then(function (value) {
            res.send(value);
        }, function (reason) {
            throw new Error(reason);
        });
    };
    ServerAjax.prototype.run = function (args) {
        throw new Error('Abstract method');
    };
    return ServerAjax;
})();
exports.ServerAjax = ServerAjax;

(function (articleAjax) {
    var baseCreate = baseAjax.article.create;
    var Create = (function (_super) {
        __extends(Create, _super);
        function Create() {
            _super.call(this, baseCreate.url(), baseCreate.type());
        }
        Create.prototype.handler = function (req, res, next) {
            article.create(req.body).then(function (result) {
                res.send(result);
            });
        };
        return Create;
    })(ServerAjax);
    articleAjax.Create = Create;

    var baseGet = baseAjax.article.get;
    var Get = (function (_super) {
        __extends(Get, _super);
        function Get() {
            _super.call(this, baseGet.url(), baseGet.type());
        }
        Get.prototype.handler = function (req, res, next) {
            article.get(req.query).then(function (result) {
                debugger;
                console.log('Se pidio los articulos');
                res.send(result);
            });
        };
        return Get;
    })(ServerAjax);
    articleAjax.Get = Get;

    var baseGetAll = baseAjax.article.getAll;
    var GetAll = (function (_super) {
        __extends(GetAll, _super);
        function GetAll() {
            _super.call(this, baseGetAll.url(), baseGetAll.type());
        }
        GetAll.prototype.handler = function (req, res, next) {
            article.getAll().then(function (result) {
                debugger;
                console.log('Se pidieron todos los articulos');
                res.send(result);
            });
        };
        return GetAll;
    })(ServerAjax);
    articleAjax.GetAll = GetAll;

    var baseUpdate = baseAjax.article.update;
    var Update = (function (_super) {
        __extends(Update, _super);
        function Update() {
            _super.call(this, baseUpdate.url(), baseUpdate.type());
        }
        Update.prototype.handler = function (req, res, next) {
            article.update(req.body).then(function (result) {
                debugger;
                console.log('Se actualizo un articulo');
                res.send(result);
            });
        };
        return Update;
    })(ServerAjax);
    articleAjax.Update = Update;
})(exports.articleAjax || (exports.articleAjax = {}));
var articleAjax = exports.articleAjax;

(function (userAjax) {
    var baseRegister = baseAjax.user.register;
    var Register = (function (_super) {
        __extends(Register, _super);
        function Register() {
            _super.call(this, baseRegister.url(), baseRegister.type());
        }
        Register.prototype.handler = function (req, res, next) {
            debugger;
            user.register(req.body).then(function (result) {
                debugger;
                console.log('Se registro un usuario');
                res.send(result);
            });
        };
        return Register;
    })(ServerAjax);
    userAjax.Register = Register;
})(exports.userAjax || (exports.userAjax = {}));
var userAjax = exports.userAjax;
//# sourceMappingURL=server-ajax.js.map
