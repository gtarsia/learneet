import utils = require("./Utils");
import ClientAjax = require("./client-ajax");
import PreviewableArticle = require("./previewable-article");
import Gui = require("./embed-gui");
import url = require("./../common/url")

class EmbedCreateArticleGui extends Gui {
    previewArticle: PreviewableArticle;
    constructor() {
        super();
        var _self = this;
        $(document).ready(function () {
            _self.previewArticle = new PreviewableArticle();
            $("#create").click(() => {
                console.log('Trying to create: ');
                var article = _self.previewArticle.getArticle();
                console.log(article);
                new ClientAjax.Article.Create().ajax(article)
                .done(function(res) {
                    var id = res.result.id;
                    _self.redirect(url.article.get(id));
                });
            });
        })
    }
}
declare var guiName;
if (guiName == 'EmbedCreateArticle') {
    new EmbedCreateArticleGui();
}