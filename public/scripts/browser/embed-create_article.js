var ClientAjax = require("./client-ajax");

var EmbedCreateArticleGui = (function () {
    function EmbedCreateArticleGui() {
        var _this = this;
        $(document).ready(function () {
            console.log("ready!");
            $("#create").click(function () {
                debugger;
                console.log('Creando artículo');
                new ClientAjax.Article.Create().ajax({ content: _this.getContent(), title: _this.getTitle() }).done(function (res) {
                    console.log(res);
                });
            });
        });
    }
    EmbedCreateArticleGui.prototype.getContent = function () {
        return $("#content").val();
    };
    EmbedCreateArticleGui.prototype.getTitle = function () {
        return $("#title").val();
    };
    return EmbedCreateArticleGui;
})();

if (guiName == 'EmbedCreateArticle') {
    new EmbedCreateArticleGui();
}
//# sourceMappingURL=embed-create_article.js.map
