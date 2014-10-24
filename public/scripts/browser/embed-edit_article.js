var ClientAjax = require("./client-ajax");
var GoTo = ClientAjax.GoTo;

var EmbedEditArticleGui = (function () {
    function EmbedEditArticleGui() {
        this.id = "-1";
        var _self = this;
        $(document).ready(function () {
            _self.bindTitlePreview();
            var href = $(location).attr("href");
            _self.id = href.substr(href.lastIndexOf('/') + 1);
            new ClientAjax.Article.Get().ajax({ id: parseInt(_self.id) }).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                _self.setTitle(result.title);
                _self.setContent(result.content);
            });
            _self.getSaveBtn().click(function () {
                GoTo.editArticle(_self.id);
            });
        });
    }
    EmbedEditArticleGui.prototype.bindTitlePreview = function () {
        $("input.article-title").keyup(function (e) {
            var title = $("input.article-title").val();
            $("h1.article-title").html(title);
        });
    };
    EmbedEditArticleGui.prototype.getContentId = function () {
        return "content";
    };
    EmbedEditArticleGui.prototype.setTitle = function (title) {
        $("#title").html(title);
    };
    EmbedEditArticleGui.prototype.setContent = function (content) {
        $('#' + this.getContentId()).html(content);
    };
    EmbedEditArticleGui.prototype.getSaveBtn = function () {
        return $("#saveBtn");
    };
    return EmbedEditArticleGui;
})();
exports.EmbedEditArticleGui = EmbedEditArticleGui;

if (guiName == 'EmbedEditArticle') {
    new EmbedEditArticleGui();
}
//# sourceMappingURL=embed-edit_article.js.map
