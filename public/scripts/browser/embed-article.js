var ClientAjax = require("./client-ajax");

var EmbedArticleGui = (function () {
    function EmbedArticleGui() {
        var href = $(location).attr("href");
        var id = href.substr(href.lastIndexOf('/') + 1);
        var _self = this;
        new ClientAjax.Article.Get().ajax({ id: parseInt(id) }).done(function (res) {
            if (!res.ok) {
                console.log(res.why);
                return;
            }
            var result = res.result;
            _self.setTitle(result.title);
            _self.setContent(result.content);
        });
    }
    EmbedArticleGui.prototype.setContent = function (content) {
        $("#content").html(content);
    };
    EmbedArticleGui.prototype.getContent = function () {
        return $("#content").val();
    };
    EmbedArticleGui.prototype.setTitle = function (title) {
        $("#title").html(title);
    };
    EmbedArticleGui.prototype.getTitle = function () {
        throw new Error('Not implemented yet');
    };
    return EmbedArticleGui;
})();
exports.EmbedArticleGui = EmbedArticleGui;

if (guiName == 'EmbedArticle') {
    new EmbedArticleGui();
}
//# sourceMappingURL=embed-article.js.map
