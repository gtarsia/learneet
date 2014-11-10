import clientAjax = require("./client-ajax");
import parser = require('./parser');
import RenderedArticle = require('./templates/rendered-article');
import Gui = require("./gui");
import url = require("./../common/url");
declare function marked(s);

export class ArticleGui extends Gui {
    id: string = "-1";
    dependenciesTemplate;
    getEditBtn() {
        return $("#editBtn");
    }
    article: RenderedArticle;
    constructor() {
        super();        
        var _self = this;
        $(document).ready(function() {
            _self.dependenciesTemplate = _self.propertize("#dependencies-template");
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
            clientAjax.article.getDependencies({
                id: _self.id
            })
            .done(function(res) {
                var deps: any = res.result;
                var length = deps.length;
                for (var i = 0; i < length; i++) {
                    deps[i].url = url.article.get(deps[i].id);
                }
                var template = _self.dependenciesTemplate.jq.html();
                Mustache.parse(template);   // optional, speeds up future uses
                var rendered = Mustache.render(template, 
                    { deps: deps});
                _self.dependenciesTemplate.jq.after(rendered);
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