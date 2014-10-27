var EditableArticle = (function () {
    function EditableArticle() {
    }
    EditableArticle.prototype.getArticle = function () {
        return {
            title: this.getTitle().val(),
            content: this.getContent().val()
        };
    };
    EditableArticle.prototype.getContent = function () {
        return $("textarea.article-content");
    };
    EditableArticle.prototype.getTitle = function () {
        return $("input.article-title");
    };
    return EditableArticle;
})();

module.exports = EditableArticle;
//# sourceMappingURL=editable-article.js.map
