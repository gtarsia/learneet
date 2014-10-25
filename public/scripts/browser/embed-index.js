var ClientAjax = require("./client-ajax");

var EmbedIndexGui = (function () {
    function EmbedIndexGui() {
        var _self = this;
        $(document).ready(function () {
            new ClientAjax.Article.GetAll().ajax({}).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                var template = $("#article-thumb-template").html();
                Mustache.parse(template);
                var rendered = Mustache.render(template, { articles: result });
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
