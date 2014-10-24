var ClientAjax = require("./client-ajax");

var GoTo = ClientAjax.GoTo;
var RenderedArticle = require('./rendered-article');

var EmbedArticleGui = (function () {
    function EmbedArticleGui() {
        this.id = "-1";
        var _self = this;
        $(document).ready(function () {
            _self.article = new RenderedArticle();
            var href = $(location).attr("href");
            _self.id = href.substr(href.lastIndexOf('/') + 1);
            new ClientAjax.Article.Get().ajax({ id: parseInt(_self.id) }).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                _self.article.setTitle(result.title);
                _self.article.setContent(marked(result.content));
            });
            _self.getEditBtn().click(function () {
                GoTo.editArticle(_self.id);
            });
        });
    }
    EmbedArticleGui.prototype.getEditBtn = function () {
        return $("#editBtn");
    };
    return EmbedArticleGui;
})();
exports.EmbedArticleGui = EmbedArticleGui;

if (guiName == 'EmbedArticle') {
    new EmbedArticleGui();
}
//# sourceMappingURL=embed-article.js.map
