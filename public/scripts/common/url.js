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
            return (id != null ? "/edit_article/" + id : "/edit_article/:id");
        }
        article.edit = edit;
        function addProposal(id) {
            return (id != null ? "/add_proposal/" + id : "/add_proposal/:id");
        }
        article.addProposal = addProposal;
    })(url.article || (url.article = {}));
    var article = url.article;
    (function (user) {
        function register() {
            return "/register";
        }
        user.register = register;
    })(url.user || (url.user = {}));
    var user = url.user;
})(url || (url = {}));

module.exports = url;
//# sourceMappingURL=url.js.map
