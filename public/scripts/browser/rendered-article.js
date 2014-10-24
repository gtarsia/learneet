var RenderedArticle = (function () {
    function RenderedArticle() {
    }
    RenderedArticle.prototype.getTitle = function () {
        return $("h1.article-title");
    };
    RenderedArticle.prototype.getContent = function () {
        return $("div.article-content");
    };
    RenderedArticle.prototype.setTitle = function (s) {
        return $("h1.article-title").html(s);
    };
    RenderedArticle.prototype.setContent = function (s) {
        return $("div.article-content").html(s);
    };
    return RenderedArticle;
})();

module.exports = RenderedArticle;
//# sourceMappingURL=rendered-article.js.map
