var RenderedArticle = (function () {
    function RenderedArticle() {
        var _self = this;
        this.content = {
            get jq() {
                return $("div.article-content");
            },
            get val() {
                return _self.content.jq.html();
            },
            set val(val) {
                _self.content.jq.html(val);
            }
        };
        this.title = {
            get jq() {
                return $("h1.article-title");
            },
            get val() {
                return _self.title.jq.html();
            },
            set val(val) {
                _self.title.jq.html(val);
            }
        };
    }
    RenderedArticle.prototype.scroll = function (line) {
        var outputLine = $(".line" + line);
        if (outputLine.length) {
            $(".selected").removeClass("selected");
            outputLine.addClass("selected");
            this.content.jq.scrollTop((this.content.jq.scrollTop() - this.content.jq.offset().top) + outputLine.offset().top - this.content.jq.height() / 2);
        }
    };
    return RenderedArticle;
})();

module.exports = RenderedArticle;
//# sourceMappingURL=rendered-article.js.map
