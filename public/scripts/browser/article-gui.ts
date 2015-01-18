import ajax = require("./client-ajax");
import parser = require('./parser');
import RenderedArticle = require('./templates/rendered-article');
import ArticleChangePreviewTemplate = require('./templates/article-change-preview-template');
import Gui = require("./gui");
import SinglePageGui = require("./single-page-gui");
import url = require("./../common/url");
import Arrows = require('./utils/score-arrow');
declare function marked(s);

var base = '.partial.article '

class ArticleGui extends SinglePageGui { 
    article: {id: string; rendered: RenderedArticle} = {id: null, rendered: null};
    main: string;
    dependenciesTemplate = this.propertize("#dependencies-template");
    getEditBtn() {
        return $("#editBtn");
    }
    editArticleBtn = this.propertize("a#editArticle");
    addProposalBtn = this.propertize("button#addProposal");
    viewProposalsBtn = this.propertize("button#viewProposals");
    articleCrumb = this.propertize("#article-crumb");
    articleChanges: ArticleChangePreviewTemplate;
    dependenciesLink = this.propertize(base + 'h1 a.dependencies')
    articleScore;
    setCrumb() {
        this.articleCrumb.transitionURL(location.pathname)
    }
    parseURL() {
        var re = url.article.get('(\\d+)')
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.article.id = matches[1];
    }
    constructor(args: {id?: string}) {
        super('.article.partial');
        this.parseURL();
        var _self = this;
        $(document).ready(() => {
            _self.articleChanges = new ArticleChangePreviewTemplate({id: _self.article.id});
            _self.setCrumb();
            _self.article.rendered = new RenderedArticle();
            _self.articleScore = new Arrows.ArticleScore(
               _self.article
            );
            ajax.article.get({article: {id: _self.article.id}})
            .done(function(res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result
                _self.article.rendered.setTitle(result.title);
                _self.article.rendered.setContent(result.content);
                _self.titleDeferred.resolve(result.title + ' - Learneet');
            });
            _self.editArticleBtn.transitionURL(url.article.edit(_self.article.id));
            _self.dependenciesLink.transitionURL(url.dependencies.get(_self.article.id))
            return;
            ajax.dependencies.getAll({
                article: _self.article
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

export = ArticleGui;