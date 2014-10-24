var ClientAjax = require("./client-ajax");
var PreviewableArticle = require("./previewable-article");

var EmbedCreateArticleGui = (function () {
    function EmbedCreateArticleGui() {
        var _self = this;
        $(document).ready(function () {
            _self.previewArticle = new PreviewableArticle();
            $("#create").click(function () {
                console.log('Trying to create: ');
                var article = _self.previewArticle.getArticle();
                console.log(article);
                return;
                console.log('Creando artículo');
                new ClientAjax.Article.Create().ajax(article).done(function (res) {
                    console.log(res);
                });
            });
        });
    }
    return EmbedCreateArticleGui;
})();

if (guiName == 'EmbedCreateArticle') {
    new EmbedCreateArticleGui();
}
//# sourceMappingURL=embed-create_article.js.map
