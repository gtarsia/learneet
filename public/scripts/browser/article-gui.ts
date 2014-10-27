import clientAjax = require("./client-ajax");
import parser = require('./parser');
import RenderedArticle = require('./templates/rendered-article');
import Gui = require("./gui");
import url = require("./../common/url");
declare function marked(s);

export class ArticleGui extends Gui {
    id: string = "-1";
    getEditBtn() {
        return $("#editBtn");
    }
    article: RenderedArticle;
    constructor() {
        super();        
        var _self = this;
        $(document).ready(function() {
            _self.article = new RenderedArticle();
            _self.id = $("[type=hidden]#article-id").val();
            clientAjax.article.get({ id: _self.id })
            .done(function(res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result
                _self.article.title.val = result.title;
                _self.article.content.val = marked(result.content);
            });
            _self.getEditBtn().click(() => {
                _self.redirect(url.article.edit(_self.id))
            });
        });
    }
} 

declare var guiName;

if (guiName == 'ArticleGui') {
    new ArticleGui();
}