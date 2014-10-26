var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ClientAjax = require("./client-ajax");

var RenderedArticle = require('./rendered-article');
var Gui = require("./embed-gui");
var url = require("./../common/url");

var EmbedArticleGui = (function (_super) {
    __extends(EmbedArticleGui, _super);
    function EmbedArticleGui() {
        _super.call(this);
        this.id = "-1";
        var _self = this;
        $(document).ready(function () {
            _self.article = new RenderedArticle();
            _self.id = $("[type=hidden]#article-id").val();
            new ClientAjax.Article.Get().ajax({ id: _self.id }).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                _self.article.setTitle(result.title);
                _self.article.setContent(marked(result.content));
            });
            _self.getEditBtn().click(function () {
                _self.redirect(url.article.edit(_self.id));
            });
        });
    }
    EmbedArticleGui.prototype.getEditBtn = function () {
        return $("#editBtn");
    };
    return EmbedArticleGui;
})(Gui);
exports.EmbedArticleGui = EmbedArticleGui;

if (guiName == 'EmbedArticle') {
    new EmbedArticleGui();
}
//# sourceMappingURL=embed-article.js.map
