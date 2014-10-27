var RenderedArticle = require('./rendered-article');
var EditableArticle = require("./editable-article");

var PreviewableArticle = (function () {
    function PreviewableArticle() {
        this.input = new EditableArticle();
        this.output = new RenderedArticle();
        this.ignoreScroll = false;
        this.bindTitlePreview();
        this.bindContentPreview();
        this.bindScrolls();
    }
    PreviewableArticle.prototype.getArticle = function () {
        return this.input.getArticle();
    };
    PreviewableArticle.prototype.bindScrolls = function () {
        var _self = this;
        function getPercent(el) {
            return 100 * el.scrollTop() / (el[0].scrollHeight - el.height());
        }
        function setPercent(el, percent) {
            el.scrollTop((el[0].scrollHeight - el.height()) * percent / 100);
        }
        var src = _self.input.getContent();
        var dest = _self.output.getContent();
        function bindScroll(src, dest) {
            src.scroll(function () {
                if (_self.ignoreScroll) {
                    _self.ignoreScroll = false;
                    return;
                }
                _self.ignoreScroll = true;
                setPercent(dest, getPercent(src));
            });
        }
        bindScroll(src, dest);
        bindScroll(dest, src);
    };

    PreviewableArticle.prototype.bindTitlePreview = function () {
        var i = this.input.getTitle();
        var o = this.output.getTitle();
        i.keyup(function (e) {
            var title = i.val();
            o.html(title);
        });
    };
    PreviewableArticle.prototype.bindContentPreview = function () {
        var i = this.input.getContent();
        var o = this.output.getContent();
        i.keyup(function (e) {
            var content = i.val();
            o.html(marked(content));
        });
    };
    return PreviewableArticle;
})();

module.exports = PreviewableArticle;
//# sourceMappingURL=previewable-article.js.map
