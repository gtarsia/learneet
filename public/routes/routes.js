var url = require('./../scripts/common/url');

function renderCb(url, title, fn) {
    return function (req, res) {
        if (fn != null) {
            fn(req, res);
        }
        res.render(url, { title: title });
    };
}

function set(app) {
    app.get('/', renderCb('index', 'Express'));
    app.get('/browse', renderCb('browse', 'Browse'));
    app.get(url.article.get(), renderCb('article', 'Article'));
    app.get(url.article.create(), renderCb('create_article', 'Create Article'));
    app.get(url.article.edit(), renderCb('edit_article', 'Edit Article'));
    app.get('/login', renderCb('login', 'Login'));
    app.get('/register', renderCb('register', 'Register'));
    app.get('/register_finished', renderCb('register_finished', 'Register Finished'));
}
exports.set = set;
//# sourceMappingURL=routes.js.map
