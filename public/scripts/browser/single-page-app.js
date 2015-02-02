var url = require("./../common/url");

var IndexGui = require("./index-gui");
var ArticleGui = require("./article-gui");
var CreateArticleGui = require("./create-article-gui");
var EditArticleGui = require("./edit-article-gui");
var DependenciesGui = require("./dependencies-gui");
var UserGui = require("./user-gui");
var EditUserGui = require("./edit-user-gui");
var ChangeGui = require("./change-gui");

var partials = [
    {
        re: '/',
        gui: function () {
            return new IndexGui();
        },
        sel: '.index.partial' },
    {
        re: '/create_article',
        gui: function () {
            return new CreateArticleGui();
        },
        sel: '.create-article.partial' },
    {
        re: url.article.get('\\d+'),
        gui: function () {
            return new ArticleGui({});
        },
        sel: '.article.partial' },
    {
        re: url.article.edit('\\d+'),
        gui: function () {
            return new EditArticleGui({});
        },
        sel: '.edit-article.partial' },
    {
        re: url.change.get('\\d+', '\\d+'),
        gui: function () {
            return new ChangeGui();
        },
        sel: '.change.partial' },
    {
        re: url.dependencies.get('\\d+'),
        gui: function () {
            return new DependenciesGui();
        },
        sel: '.dependencies.partial' },
    {
        re: url.user.get('\\d+'),
        gui: function () {
            return new UserGui();
        },
        sel: '.user.partial' },
    {
        re: url.user.edit('\\d+'),
        gui: function () {
            return new EditUserGui();
        },
        sel: '.edit-user.partial' }
];

function findPartial(urlToGo) {
    var _partial;
    partials.forEach(function (partial) {
        var match = urlToGo.match('^' + partial.re + '$');
        if (match && !_partial) {
            _partial = partial;
        }
    });
    return _partial;
}

function findGui(urlToGo) {
    var _gui;
    partials.forEach(function (partial) {
        var match = urlToGo.match('^' + partial.re + '$');
        if (match && !_gui) {
            _gui = partial.gui;
        }
    });
    return _gui;
}
exports.findGui = findGui;

function viewTransition(urlToGo, isBack) {
    if (window.onbeforeunload) {
        var w = window;
        if (!confirm(w.onbeforeunload()))
            return;
        window.onbeforeunload = null;
    }
    if (!isBack)
        history.pushState({}, '', urlToGo);
    var before = performance.now();
    var partial = findPartial(urlToGo);
    $("#main *").unbind();

    $("#main").html(partial.html);
    var child = $("#main").children().first();
    child.show();
    child.velocity({ opacity: 0 }, { duration: 0 });
    child.velocity({ opacity: 1 }, { duration: 300 });
    singlePageApp.gui = partial.gui();
    console.log(performance.now() - before);
}
exports.viewTransition = viewTransition;

function storePartials() {
    partials.forEach(function (partial) {
        partial.html = $(partial.sel);
        $(partial.sel).remove();
    });
}

function startSingleApp() {
    singlePageApp.started = true;
    window.onpopstate = function () {
        console.log('pop state');
        exports.viewTransition(location.pathname, true);
    };
    $(document).ready(function () {
        storePartials();
        exports.viewTransition(location.pathname);
    });
}
exports.startSingleApp = startSingleApp;
singlePageApp.viewTransition = exports.viewTransition;
var partial = findPartial(location.pathname);

if (partial)
    exports.startSingleApp();
//# sourceMappingURL=single-page-app.js.map
