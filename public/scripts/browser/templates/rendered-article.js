var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./../gui');
var render = require('./../utils/render');

var RenderedArticle = (function (_super) {
    __extends(RenderedArticle, _super);
    function RenderedArticle(base) {
        _super.call(this);
        var _self = this;
        this.content = this.propertize(base + ' div.article-content', 'html');
        this.title = this.propertize(base + ' h1.article-title', 'html');
        this.avatar = this.propertize(base + ' .article-header img.avatar');
    }
    RenderedArticle.prototype.scroll = function (line) {
        var outputLine = $(".line" + line);
        if (outputLine.length) {
            $(".selected").removeClass("selected");
            outputLine.addClass("selected");
            this.content.jq.scrollTop((this.content.jq.scrollTop() - this.content.jq.offset().top) + outputLine.offset().top - this.content.jq.height() / 2);
        }
    };
    RenderedArticle.prototype.clear = function () {
        this.title.val = '';
        this.content.val = '';
    };
    RenderedArticle.prototype.setTitle = function (title) {
        this.title.jq.velocity({ opacity: 0 }, { duration: 0 });
        this.title.val = title;
        this.title.jq.velocity({ opacity: 1 }, { duration: 180 });
    };
    RenderedArticle.prototype.setContent = function (content) {
        this.content.jq.velocity({ opacity: 0 }, { duration: 0 });
        this.content.val = render.toMarkedKatex(content);
        this.content.jq.velocity({ opacity: 1 }, { duration: 180 });
    };
    return RenderedArticle;
})(Gui);

module.exports = RenderedArticle;
//# sourceMappingURL=rendered-article.js.map
