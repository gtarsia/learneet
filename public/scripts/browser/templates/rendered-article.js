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
    function RenderedArticle(parent) {
        _super.call(this);
        var _self = this;
        if (!parent)
            parent = '';
        this.content = this.propertize(parent + ' div.article-content', 'html');
        this.title = this.propertize(parent + ' h1.article-title', 'html');
    }
    RenderedArticle.prototype.scroll = function (line) {
        var outputLine = $(".line" + line);
        if (outputLine.length) {
            $(".selected").removeClass("selected");
            outputLine.addClass("selected");
            this.content.jq.scrollTop((this.content.jq.scrollTop() - this.content.jq.offset().top) + outputLine.offset().top - this.content.jq.height() / 2);
        }
    };
    RenderedArticle.prototype.setTitle = function (title) {
        this.title.val = title;
    };
    RenderedArticle.prototype.setContent = function (content) {
        this.content.val = render.toMarkedKatex(content);
    };
    return RenderedArticle;
})(Gui);

module.exports = RenderedArticle;
//# sourceMappingURL=rendered-article.js.map
