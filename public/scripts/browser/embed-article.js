var ClientAjax = require("./client-ajax");
var parser = require('./parser');
var GoTo = ClientAjax.GoTo;

var EmbedArticleGui = (function () {
    function EmbedArticleGui() {
        this.id = "-1";
        var _self = this;
        $(document).ready(function () {
            var href = $(location).attr("href");
            _self.id = href.substr(href.lastIndexOf('/') + 1);
            new ClientAjax.Article.Get().ajax({ id: parseInt(_self.id) }).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                _self.setTitle(result.title);
                var arr = result.content.split("\n");
                var length = arr.length;
                for (var i = 0; i < length; i++) {
                    parser.parseToDiv(arr[i], i, _self.getContentId());
                }
            });
            _self.getEditBtn().click(function () {
                GoTo.editArticle(_self.id);
            });
        });
    }
    EmbedArticleGui.prototype.getContentId = function () {
        return "content";
    };
    EmbedArticleGui.prototype.setContent = function (content) {
        $('#' + this.getContentId()).html(content);
    };
    EmbedArticleGui.prototype.getContent = function () {
        return $('#' + this.getContentId()).val();
    };
    EmbedArticleGui.prototype.setTitle = function (title) {
        $("#title").html(title);
    };
    EmbedArticleGui.prototype.getTitle = function () {
        throw new Error('Not implemented yet');
    };
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
