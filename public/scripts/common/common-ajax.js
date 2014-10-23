exports.AjaxType = {
    GET: "GET",
    POST: "POST"
};

(function (Article) {
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
})(exports.Article || (exports.Article = {}));
var Article = exports.Article;

if (typeof customExports != 'undefined')
    customExports[getScriptName()] = exports;
//# sourceMappingURL=common-ajax.js.map
