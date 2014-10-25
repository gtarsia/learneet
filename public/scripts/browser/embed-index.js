var ClientAjax = require("./client-ajax");

var url = require("./../common/url");

var EmbedIndexGui = (function () {
    function EmbedIndexGui() {
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
})();

if (guiName == 'EmbedIndexGui') {
    gui = new EmbedIndexGui();
}
//# sourceMappingURL=embed-index.js.map
