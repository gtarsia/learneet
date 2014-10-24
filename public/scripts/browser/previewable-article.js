var RenderedArticle = require('./rendered-article');

var PreviewableArticle = (function () {
    function PreviewableArticle() {
        this.output = new RenderedArticle();
        this.ignoreScroll = false;
        this.bindTitlePreview();
        this.bindContentPreview();
        this.bindScrolls();
    }
    PreviewableArticle.prototype.getArticle = function () {
        return {
            title: this.getInputTitle().val(),
            content: this.getInputContent().val()
        };
    };
    PreviewableArticle.prototype.getInputContent = function () {
        return $("textarea.article-content");
    };
    PreviewableArticle.prototype.getOutputContent = function () {
        return $("div.article-content");
    };
    PreviewableArticle.prototype.getInputTitle = function () {
        return $("input.article-title");
    };

    PreviewableArticle.prototype.getOutputTitle = function () {
        return $("h1.article-title");
    };
    PreviewableArticle.prototype.bindScrolls = function () {
        var _self = this;
        function getPercent(el) {
            return 100 * el.scrollTop() / (el[0].scrollHeight - el.height());
        }
        function setPercent(el, percent) {
            el.scrollTop((el[0].scrollHeight - el.height()) * percent / 100);
        }
        var src = _self.getInputContent();
        var dest = _self.getOutputContent();
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
        var i = this.getInputTitle();
        var o = this.getOutputTitle();
        i.keyup(function (e) {
            var title = i.val();
            o.html(title);
        });
    };
    PreviewableArticle.prototype.bindContentPreview = function () {
        var i = this.getInputContent();
        var o = this.getOutputContent();
        i.keyup(function (e) {
            var content = i.val();
            o.html(marked(content));
        });
    };
    return PreviewableArticle;
})();

module.exports = PreviewableArticle;
//# sourceMappingURL=previewable-article.js.map
