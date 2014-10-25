var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ClientAjax = require("./client-ajax");
var PreviewableArticle = require("./previewable-article");
var Gui = require("./embed-gui");
var url = require("./../common/url");

var EmbedCreateArticleGui = (function (_super) {
    __extends(EmbedCreateArticleGui, _super);
    function EmbedCreateArticleGui() {
        _super.call(this);
        var _self = this;
        $(document).ready(function () {
            _self.previewArticle = new PreviewableArticle();
            $("#create").click(function () {
                console.log('Trying to create: ');
                var article = _self.previewArticle.getArticle();
                console.log(article);
                new ClientAjax.Article.Create().ajax(article).done(function (res) {
                    var id = res.result.id;
                    _self.redirect(url.article.get(id));
                });
            });
        });
    }
    return EmbedCreateArticleGui;
})(Gui);

if (guiName == 'EmbedCreateArticle') {
    new EmbedCreateArticleGui();
}
//# sourceMappingURL=embed-create_article.js.map
