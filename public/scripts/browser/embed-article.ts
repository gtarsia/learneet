import ClientAjax = require("./client-ajax");
import parser = require('./parser');
import GoTo = ClientAjax.GoTo;
import RenderedArticle = require('./rendered-article');
declare function marked(s);

export class EmbedArticleGui {
    id: string = "-1";
    getEditBtn() {
        return $("#editBtn");
    }
    article: RenderedArticle;
    constructor() {
        
        var _self = this;
        $(document).ready(function() {
            _self.article = new RenderedArticle();
            var href = $(location).attr("href");
            _self.id = href.substr(href.lastIndexOf('/') + 1);
            new ClientAjax.Article.Get().ajax({ id: parseInt(_self.id) })
            .done(function(res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result
                _self.article.setTitle(result.title);
                _self.article.setContent(marked(result.content));
            });
            _self.getEditBtn().click(() => {
                GoTo.editArticle(_self.id);
            });
        });
    }
} 

declare var guiName;

if (guiName == 'EmbedArticle') {
    new EmbedArticleGui();
}