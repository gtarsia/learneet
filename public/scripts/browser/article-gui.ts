import ajax = require("./client-ajax");
import parser = require('./parser');
import RenderedArticle = require('./templates/rendered-article');
import ArticleChangePreviewTemplate = require('./templates/article-change-preview-template');
import Gui = require("./gui");
import url = require("./../common/url");
import Arrows = require('./utils/score-arrow');
import Dependencies = require('./templates/dependencies');
declare function marked(s);

class ArticleGui extends Gui { 
    article: {id: string; rendered: RenderedArticle} = {id: null, rendered: null};
    main: string;
    getEditBtn() {
        return $("#editBtn");
    }
    editArticleBtn = this.propertize("a#editArticle");
    addProposalBtn = this.propertize("button#addProposal");
    viewProposalsBtn = this.propertize("button#viewProposals");
    articleCrumb = this.propertize("#article-crumb");
    articleChanges: ArticleChangePreviewTemplate;
    dependenciesLink = this.propertize('h1 a.dependencies');
    dependencies;
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
        super();
        this.parseURL();
        this.dependencies = new Dependencies(this.article.id);
        var _self = this;
        $(document).ready(() => {
            _self.articleChanges = new ArticleChangePreviewTemplate({id: _self.article.id});
            _self.setCrumb();
            _self.article.rendered = new RenderedArticle();
            _self.article.rendered.clear();
            _self.articleScore = new Arrows.ArticleScore(
               _self.article
            );
            ajax.article.get({article: {id: _self.article.id}})
            .done(function(res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                var rendered = _self.article.rendered;
                rendered.avatar.jq.attr('src', result.user.avatar_url);
                rendered.avatar.jq.attr('title', result.user.username);
                rendered.setTitle(result.article.title);
                rendered.setContent(result.article.content);
                _self.titleDeferred.resolve(result.article.title + ' - Learneet');
            });
            _self.editArticleBtn.transitionURL(url.article.edit(_self.article.id));
            _self.dependenciesLink.transitionURL(url.dependencies.get(_self.article.id))
        });
    }
} 

export = ArticleGui;