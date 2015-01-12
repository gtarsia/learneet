var url = require("./../common/url");

var ArticleGui = require("./article-gui");
var EditArticleGui = require("./edit-article-gui");
var DependenciesGui = require("./dependencies-gui");
var ChangeGui = require("./change-gui");

function findSinglePageGui(urlToGo) {
    var partials = [
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
            sel: '.edit-article-partial' },
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
            sel: '.dependencies.partial' }
    ];
    var _gui;
    partials.forEach(function (partial) {
        var match = urlToGo.match('^' + partial.re + '$');
        if (match && !_gui) {
            _gui = partial.gui;
        }
    });
    return _gui;
}
exports.findSinglePageGui = findSinglePageGui;

function viewTransition(urlToGo, isBack) {
    var before = performance.now();
    $(".partial.active *").unbind();
    $('.partial.active').removeClass('active');
    console.log(performance.now() - before);
    if (!isBack)
        history.pushState({}, '', urlToGo);
    $(".partial").hide();
    gui = exports.findSinglePageGui(urlToGo)();
    gui.main.jq.addClass('active');
}
exports.viewTransition = viewTransition;

function startSingleApp(gui) {
    window.onpopstate = function () {
        console.log('pop state');
        exports.viewTransition(location.pathname, true);
    };
    $(document).ready(function () {
        exports.viewTransition(location.pathname);
    });
}
exports.startSingleApp = startSingleApp;

var guiFound = exports.findSinglePageGui(location.pathname);
if (guiFound)
    exports.startSingleApp(guiFound);

singlePageApp.viewTransition = exports.viewTransition;
//# sourceMappingURL=single-page-app.js.map
