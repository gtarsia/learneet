var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var clientAjax = require("./client-ajax");

var url = require("./../common/url");
var SinglePageGui = require("./single-page-gui");

var render = require('./utils/render');

var base = '.index.partial ';

var IndexGui = (function (_super) {
    __extends(IndexGui, _super);
    function IndexGui() {
        _super.call(this, base);
        this.createBtn = this.propertize(base + "button.create");
        this.articleThumbs = this.propertize(base + '.article-thumbs');
        this.articleThumbTemplate = this.propertize(base + '#article-thumb-template');
        this.articleThumbsLinks = this.propertize(base + '.article-thumb a');
        var _self = this;
        _self.articleThumbs.jq.empty();
        $(document).ready(function () {
            _self.createBtn.transitionURL(url.article.create());
            clientAjax.article.getAll({}).done(function (res) {
                _self.articleThumbs.jq.empty();
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var articles = res.result;
                var length = articles.length;
                for (var i = 0; i < length; i++) {
                    var article = articles[i];
                    if (!article) {
                        articles.splice(i, 1);
                        i--;
                        continue;
                    }
                    if (!article.content) {
                        articles.splice(i, 1);
                        i--;
                        continue;
                    }
                    article.url = url.article.get(article.id);
                    var s = article.content.substr(0, 150) + '...';
                    article.content = render.toKatex(s);
                }
                var template = $("#article-thumb-template").html();
                Mustache.parse(template);
                var rendered = Mustache.render(template, { articles: articles });
                _self.articleThumbs.jq.html(rendered);
                _self.articleThumbsLinks.transitionURL('');
                $('.article-thumb').velocity({ opacity: 0 }, { duration: 0 });
                $.each($('.article-thumb'), function (i, el) {
                    setTimeout(function () {
                        $(el).velocity({
                            opacity: 1.0, translateX: '100px'
                        }, 250);
                    }, (i * 100));
                });
            });
        });
    }
    IndexGui.prototype.setThumbs = function (html) {
    };
    IndexGui.prototype.buildArticleThumbsTemplate = function (articles) {
        return articles.toString();
    };
    return IndexGui;
})(SinglePageGui);

module.exports = IndexGui;
//# sourceMappingURL=index-gui.js.map
