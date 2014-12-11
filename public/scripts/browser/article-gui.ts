import clientAjax = require("./client-ajax");
import parser = require('./parser');
import RenderedArticle = require('./templates/rendered-article');
import Gui = require("./gui");
import url = require("./../common/url");
import Arrows = require('./utils/score-arrow');
declare function marked(s);

export class ArticleGui extends Gui {
    id: string = "-1";
    dependenciesTemplate;
    getEditBtn() {
        return $("#editBtn");
    }
    addProposalBtn = this.propertize("button#addProposal");
    viewProposalsBtn = this.propertize("button#viewProposals");
    article: RenderedArticle;
    articleScore;
    constructor() {
        super();        
        var _self = this;
        $(document).ready(function() {
            _self.dependenciesTemplate = _self.propertize("#dependencies-template");
            _self.article = new RenderedArticle();
            _self.id = $("[type=hidden]#article-id").val();
            _self.articleScore = new Arrows.ArticleScore(
                {up: 'input#up-score', down: 'input#down-score',
                score: 'div#article-score'}, {id: _self.id}
            );
            clientAjax.article.get({article: { id: _self.id }})
            .done(function(res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result
                _self.article.title.val = result.title;
                _self.article.content.val = marked(result.content);
            });
            /*_self.upScoreBtn.jq.click(() => {
                this.attr('src', 'srcImage.jpg');
            })*/
            return;
            clientAjax.article.getDependencies({
                article: { id: _self.id }
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
        });
    }
} 

declare var guiName;
declare var gui;

if (guiName == 'ArticleGui') {
    gui = new ArticleGui();
}