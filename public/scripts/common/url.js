var url;
(function (url) {
    (function (article) {
        function get(id) {
            return (id != null ? "/article/" + id : "/article/:id");
        }
        article.get = get;
        function create() {
            return "/create_article";
        }
        article.create = create;
        function edit(id) {
            return (id != null ? "/edit_article" + id : "/edit_article/:id");
        }
        article.edit = edit;
    })(url.article || (url.article = {}));
    var article = url.article;
})(url || (url = {}));

module.exports = url;
//# sourceMappingURL=url.js.map
