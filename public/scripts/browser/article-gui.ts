import ajax = require("./client-ajax");
import parser = require('./parser');
import RenderedArticle = require('./templates/rendered-article');
import BaseArticleGui = require('./base-article-gui');
import Gui = require("./gui");
import Partial = require("./partial");
import url = require("./../common/url");
import Arrows = require('./utils/score-arrow');
declare function marked(s);

declare var gui: BaseArticleGui;

class ArticleGui extends Partial {
    id: string = "-1";
    main: string;
    dependenciesTemplate;
    getEditBtn() {
        return $("#editBtn");
    }
    editArticleBtn = this.propertize("a#editArticle");
    addProposalBtn = this.propertize("button#addProposal");
    viewProposalsBtn = this.propertize("button#viewProposals");
    article: RenderedArticle;
    articleScore;
    constructor(args: {id?: string}) {
        super('.article-partial');
        var _self = this;
        $(document).ready(() => {
            if (args.id) {
                _self.id = args.id;
                _self.editArticleBtn.jq.attr('href', url.article.edit(args.id));
            }
            else
                _self.id = $("[type=hidden]#article-id").val();
        });
        this.init();
    }
    init() {
        var _self = this;
        $(document).ready(function() {
            _self.dependenciesTemplate = _self.propertize("#dependencies-template");
            _self.article = new RenderedArticle();
            _self.articleScore = new Arrows.ArticleScore(
               {id: _self.id}
            );
            ajax.article.get({article: { id: _self.id }})
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
            _self.editArticleBtn.jq.click(function (e) {
                var href = $(this).attr('href');
                gui.viewTransition(href);
                e.preventDefault();
            });
            return;
            ajax.dependencies.get({
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

declare var subGuiName;
declare var subGui;

if (subGuiName == 'ArticleGui') {
    subGui = new ArticleGui({});
}

export = ArticleGui;