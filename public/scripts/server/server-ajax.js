var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CommonAjax = require('./../common/common-ajax');

var AjaxType = CommonAjax.AjaxType;
var article = require('./article');

function getServerAjaxList() {
    return [
        new Article.Create(),
        new Article.Get(),
        new Article.GetAll(),
        new Article.Update()
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

(function (Article) {
    var Create = (function (_super) {
        __extends(Create, _super);
        function Create() {
            _super.call(this, CommonAjax.Article.Create.url(), CommonAjax.Article.Create.type());
        }
        Create.prototype.handler = function (req, res, next) {
            article.create(req.body).then(function (result) {
                res.send(result);
            });
        };
        return Create;
    })(ServerAjax);
    Article.Create = Create;

    var Get = (function (_super) {
        __extends(Get, _super);
        function Get() {
            _super.call(this, CommonAjax.Article.Get.url(), CommonAjax.Article.Get.type());
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
    Article.Get = Get;

    var CommonGetAll = CommonAjax.Article.GetAll;
    var GetAll = (function (_super) {
        __extends(GetAll, _super);
        function GetAll() {
            _super.call(this, CommonGetAll.url(), CommonGetAll.type());
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
    Article.GetAll = GetAll;

    var CommonUpdate = CommonAjax.Article.Update;
    var Update = (function (_super) {
        __extends(Update, _super);
        function Update() {
            _super.call(this, CommonUpdate.url(), CommonUpdate.type());
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
    Article.Update = Update;
})(exports.Article || (exports.Article = {}));
var Article = exports.Article;
//# sourceMappingURL=server-ajax.js.map
