var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./client-ajax");

var RenderedArticle = require('./templates/rendered-article');

var ArticleChangePreviewTemplate = require('./templates/article-change-preview-template');

var Partial = require("./partial");
var url = require("./../common/url");
var Arrows = require('./utils/score-arrow');

var ArticleGui = (function (_super) {
    __extends(ArticleGui, _super);
    function ArticleGui(args) {
        _super.call(this, '.article.partial');
        this.id = "-1";
        this.dependenciesTemplate = this.propertize("#dependencies-template");
        this.editArticleBtn = this.propertize("a#editArticle");
        this.addProposalBtn = this.propertize("button#addProposal");
        this.viewProposalsBtn = this.propertize("button#viewProposals");
        this.articleCrumb = this.propertize("#article-crumb");
        this.articleHiddenId = this.propertize("[type=hidden]#article-id", "val");
        var _self = this;
        $(document).ready(function () {
            if (args.id)
                _self.id = args.id;
            else
                _self.id = _self.articleHiddenId.val;
            _self.articleChanges = new ArticleChangePreviewTemplate({ id: _self.id });
            _self.setCrumb();
            _self.article = new RenderedArticle();
            _self.articleScore = new Arrows.ArticleScore({ id: _self.id });
            ajax.article.get({ article: { id: _self.id } }).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                _self.article.title.val = result.title;
                _self.article.content.val = marked(result.content);
            });
            _self.editArticleBtn.transitionURL(url.article.edit(_self.id));
            return;
            ajax.dependencies.get({
                article: { id: _self.id }
            }).done(function (res) {
                var deps = res.result;
                var length = deps.length;
                for (var i = 0; i < length; i++) {
                    deps[i].url = url.article.get(deps[i].id);
                }
                var template = _self.dependenciesTemplate.jq.html();
                Mustache.parse(template);
                var rendered = Mustache.render(template, { deps: deps });
                _self.dependenciesTemplate.jq.after(rendered);
            });
        });
    }
    ArticleGui.prototype.getEditBtn = function () {
        return $("#editBtn");
    };

    ArticleGui.prototype.setCrumb = function () {
        this.articleCrumb.transitionURL(location.pathname);
    };
    return ArticleGui;
})(Partial);

if (subGuiName == 'ArticleGui') {
    subGui = new ArticleGui({});
}

module.exports = ArticleGui;
//# sourceMappingURL=article-gui.js.map
