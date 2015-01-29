var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./client-ajax");

var RenderedArticle = require('./templates/rendered-article');
var ArticleChangePreviewTemplate = require('./templates/article-change-preview-template');

var SinglePageGui = require("./single-page-gui");
var url = require("./../common/url");
var Arrows = require('./utils/score-arrow');
var Dependencies = require('./templates/dependencies');

var base = '.partial.article ';

var ArticleGui = (function (_super) {
    __extends(ArticleGui, _super);
    function ArticleGui(args) {
        _super.call(this, base);
        this.article = { id: null, rendered: null };
        this.editArticleBtn = this.propertize("a#editArticle");
        this.addProposalBtn = this.propertize("button#addProposal");
        this.viewProposalsBtn = this.propertize("button#viewProposals");
        this.articleCrumb = this.propertize("#article-crumb");
        this.dependenciesLink = this.propertize(base + 'h1 a.dependencies');
        this.parseURL();
        this.dependencies = new Dependencies(base, this.article.id);
        var _self = this;
        $(document).ready(function () {
            _self.articleChanges = new ArticleChangePreviewTemplate({ id: _self.article.id });
            _self.setCrumb();
            _self.article.rendered = new RenderedArticle(base);
            _self.article.rendered.clear();
            _self.articleScore = new Arrows.ArticleScore(_self.article);
            ajax.article.get({ article: { id: _self.article.id } }).done(function (res) {
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
            _self.dependenciesLink.transitionURL(url.dependencies.get(_self.article.id));
        });
    }
    ArticleGui.prototype.getEditBtn = function () {
        return $("#editBtn");
    };

    ArticleGui.prototype.setCrumb = function () {
        this.articleCrumb.transitionURL(location.pathname);
    };
    ArticleGui.prototype.parseURL = function () {
        var re = url.article.get('(\\d+)');
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.article.id = matches[1];
    };
    return ArticleGui;
})(SinglePageGui);

module.exports = ArticleGui;
//# sourceMappingURL=article-gui.js.map
