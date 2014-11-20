var url = require('./scripts/common/url');

var db = require('./scripts/server/db');

function renderCb(url, title, fn) {
    return function (req, res) {
        console.log('Is it logged? ' + req.isAuthenticated());
        if (fn != null)
            fn(req, res);
        else
            res.render(url, { title: title + ' - Learneet' });
    };
}

function set(app) {
    app.get('/', renderCb('index', 'Express'));
    app.get('/browse', renderCb('browse', 'Browse'));
    app.get(url.article.get(), function (req, res) {
        var id = req.params.id;
        db.hget('article:' + id, 'title').then(function (title) {
            res.render('article', {
                editUrl: url.article.edit(id),
                id: id,
                title: title + ' - Learneet'
            });
        });
    });
    app.get(url.article.create(), renderCb('create_article', 'Create Article'));
    app.get(url.article.edit(), function (req, res) {
        var id = req.params.id;
        db.hget('article:' + id, 'title').then(function (title) {
            res.render('edit_article', {
                url: url.article.edit(id), id: id, title: title + ' - Learneet'
            });
        });
    });
    app.get(url.proposals.add(), function (req, res) {
        var id = req.params.id;
        db.hget('article:' + id, 'title').then(function (title) {
            res.render('add_proposal', {
                url: url.article.edit(id), id: id, title: title + ' - Learneet'
            });
        });
    });
    app.get(url.proposals.getAll(), function (req, res) {
        res.render('proposals', { id: req.params.id });
    });
    app.get('/login', renderCb('login', 'Login'));
    app.get(url.user.register(), renderCb('register', 'Register'));
    app.get('/register_finished', renderCb('register_finished', 'Register Finished'));
}
exports.set = set;
//# sourceMappingURL=routes.js.map
