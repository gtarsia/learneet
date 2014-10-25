var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ClientAjax = require("./client-ajax");

var url = require("./../common/url");
var Gui = require("./embed-gui");

var EmbedIndexGui = (function (_super) {
    __extends(EmbedIndexGui, _super);
    function EmbedIndexGui() {
        _super.call(this);
        var _self = this;
        $(document).ready(function () {
            new ClientAjax.Article.GetAll().ajax({}).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var articles = res.result;
                var length = articles.length;
                for (var i = 0; i < length; i++) {
                    articles[i].url = url.article.get(articles[i].id);
                }
                var template = $("#article-thumb-template").html();
                Mustache.parse(template);
                var rendered = Mustache.render(template, { articles: articles });
                $("#article-thumb-template").remove();
                $("#main .childContainer").html(rendered);
            });
        });
    }
    EmbedIndexGui.prototype.setThumbs = function (html) {
    };
    EmbedIndexGui.prototype.buildArticleThumbsTemplate = function (articles) {
        return articles.toString();
    };
    return EmbedIndexGui;
})(Gui);

if (guiName == 'EmbedIndexGui') {
    gui = new EmbedIndexGui();
}
//# sourceMappingURL=embed-index.js.map
