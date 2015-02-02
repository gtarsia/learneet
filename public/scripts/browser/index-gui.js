var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var clientAjax = require("./client-ajax");

var url = require("./../common/url");
var Gui = require("./gui");
var render = require('./utils/render');

var IndexGui = (function (_super) {
    __extends(IndexGui, _super);
    function IndexGui() {
        _super.call(this);
        this.createBtn = this.propertize('button.create');
        this.articleThumbs = this.propertize('.article-thumbs');
        this.articleThumbTemplate = this.propertize('#article-thumb-template');
        this.articleThumbsLinks = this.propertize('.article-thumb a');
        this.titleDeferred.resolve('Learneet');
        var _self = this;
        _self.articleThumbs.jq.empty();
        $(document).ready(function () {
            _self.createBtn.transitionURL(url.article.create());
            clientAjax.article.getAllThumbs({}).done(function (res) {
                _self.articleThumbs.jq.empty();
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var articles = res.result;
                var _articles = [];
                var length = articles.length;
                for (var i = 0; i < length; i++) {
                    var el = articles[i];
                    if (!el || !el.article || !el.article.content)
                        continue;
                    el.article.url = url.article.get(el.article.id);
                    el.article.content = render.toKatex(el.article.content);
                    _articles.push(el);
                }
                var template = $("#article-thumb-template").html();
                Mustache.parse(template);
                var rendered = Mustache.render(template, { articles: _articles });
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
})(Gui);

module.exports = IndexGui;
//# sourceMappingURL=index-gui.js.map
