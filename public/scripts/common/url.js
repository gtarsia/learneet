var url;
(function (url) {
    (function (article) {
        function get(id) {
            return (id != null ? "/articles/" + id : "/articles/:id");
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
        function partials() {
            return "/partials-article";
        }
        article.partials = partials;
    })(url.article || (url.article = {}));
    var article = url.article;
    (function (change) {
        function get(articleId, changeId) {
            return (changeId == null || articleId == null ? "/articles/:article_id/changes/:changes_id" : "/articles/" + articleId + "/changes/" + changeId);
        }
        change.get = get;
    })(url.change || (url.change = {}));
    var change = url.change;
    (function (dependencies) {
        function get(articleId) {
            return (articleId == null ? "/articles/:article_id/dependencies" : "/articles/" + articleId + "/dependencies");
        }
        dependencies.get = get;
    })(url.dependencies || (url.dependencies = {}));
    var dependencies = url.dependencies;

    (function (proposals) {
        function add(id) {
            return (id != null ? "/add_proposal/" + id : "/add_proposal/:id");
        }
        proposals.add = add;
        function getAll(id) {
            return (id != null ? "/proposals/" + id : "/proposals/:id");
        }
        proposals.getAll = getAll;
    })(url.proposals || (url.proposals = {}));
    var proposals = url.proposals;
    (function (user) {
        function get(id) {
            return (id != null ? "/users/" + id : "/users/:id");
        }
        user.get = get;
        function edit(id) {
            return (id != null ? "/edit-user/" + id : "/edit-user/:id");
        }
        user.edit = edit;
        function register() {
            return "/register";
        }
        user.register = register;
    })(url.user || (url.user = {}));
    var user = url.user;
})(url || (url = {}));

module.exports = url;
//# sourceMappingURL=url.js.map
