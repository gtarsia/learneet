exports.AjaxType = {
    GET: "GET",
    POST: "POST"
};

(function (Article) {
    function WrapFieldWithId(fields, id) {
        return { title: fields.title, content: fields.content, id: id };
    }
    Article.WrapFieldWithId = WrapFieldWithId;

    (function (Create) {
        function url() {
            return '/api/create_article';
        }
        Create.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        Create.type = type;
    })(Article.Create || (Article.Create = {}));
    var Create = Article.Create;

    (function (Get) {
        function url() {
            return '/api/get';
        }
        Get.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        Get.type = type;
    })(Article.Get || (Article.Get = {}));
    var Get = Article.Get;

    (function (GetAll) {
        function url() {
            return '/api/getall';
        }
        GetAll.url = url;
        function type() {
            return exports.AjaxType.GET;
        }
        GetAll.type = type;
    })(Article.GetAll || (Article.GetAll = {}));
    var GetAll = Article.GetAll;

    (function (Update) {
        function url() {
            return '/api/update';
        }
        Update.url = url;
        function type() {
            return exports.AjaxType.POST;
        }
        Update.type = type;
    })(Article.Update || (Article.Update = {}));
    var Update = Article.Update;
})(exports.Article || (exports.Article = {}));
var Article = exports.Article;

if (typeof customExports != 'undefined')
    customExports[getScriptName()] = exports;
//# sourceMappingURL=common-ajax.js.map
