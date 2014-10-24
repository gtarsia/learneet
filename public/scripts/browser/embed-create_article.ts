import utils = require("./Utils");
import ClientAjax = require("./client-ajax");
import PreviewableArticle = require("./previewable-article");

class EmbedCreateArticleGui {
    previewArticle: PreviewableArticle;
    constructor() {
        var _self = this;
        $(document).ready(function () {
            _self.previewArticle = new PreviewableArticle();
            $("#create").click(() => {
                console.log('Trying to create: ');
                var article = _self.previewArticle.getArticle();
                console.log(article);
                return;
                console.log('Creando artículo');
                new ClientAjax.Article.Create().ajax(article)
                .done(function(res) {
                    console.log(res);
                });
            });
        })

    }
}
declare var guiName;
if (guiName == 'EmbedCreateArticle') {
    new EmbedCreateArticleGui();
}