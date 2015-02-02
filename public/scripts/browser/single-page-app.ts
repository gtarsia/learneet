import url = require("./../common/url");
import Gui = require("./gui");
import SinglePageApp = require("./single-page-app");
import IndexGui = require("./index-gui");
import ArticleGui = require("./article-gui");
import CreateArticleGui = require("./create-article-gui");
import EditArticleGui = require("./edit-article-gui");
import DependenciesGui = require("./dependencies-gui");
import UserGui = require("./user-gui");
import EditUserGui = require("./edit-user-gui");
import ChangeGui = require("./change-gui");

declare var gui : Gui;
declare var singlePageApp;
var partials = [
    {re: '/',
    gui: function() {return new IndexGui()},
    sel: '.index.partial'},

    {re: '/create_article',
    gui: function() {return new CreateArticleGui()},
    sel: '.create-article.partial'},

    {re: url.article.get('\\d+'), 
    gui: function() {return new ArticleGui({})},
    sel: '.article.partial' }, 

    {re: url.article.edit('\\d+'), 
    gui: function() { return new EditArticleGui({})},
    sel: '.edit-article.partial'},

    {re: url.change.get('\\d+', '\\d+'), 
    gui: function() { return new ChangeGui()},
    sel: '.change.partial'},

    {re: url.dependencies.get('\\d+'),
    gui: function() {return new DependenciesGui()},
    sel: '.dependencies.partial'},

    {re: url.user.get('\\d+'),
    gui: function() {return new UserGui()},
    sel: '.user.partial'},

    {re: url.user.edit('\\d+'),
    gui: function() {return new EditUserGui()},
    sel: '.edit-user.partial'}
];

function findPartial(urlToGo: string) {
    var _partial;
    partials.forEach(function(partial:any) {
        var match = urlToGo.match('^' + partial.re + '$');
        if (match && !_partial) {
            _partial = partial;
        }
    });
    return _partial
}

export function findGui(urlToGo: string) {
    var _gui;
    partials.forEach(function(partial:any) {
        var match = urlToGo.match('^' + partial.re + '$');
        if (match && !_gui) {
            _gui = partial.gui;
        }
    });
    return _gui;
}

export function viewTransition(urlToGo: string, isBack?: boolean) {
    if (window.onbeforeunload) {
        var w: any = window;
        if (!confirm(w.onbeforeunload())) return;
        window.onbeforeunload = null;
    }
    if (!isBack) history.pushState({}, '', urlToGo);
    var before = performance.now();
    var partial = findPartial(urlToGo);
    $("#main *").unbind();

    $("#main").html(partial.html);
    var child = $("#main").children().first();
    child.show();
    child.velocity({opacity: 0}, {duration: 0});
    child.velocity({opacity: 1}, {duration: 300});
    singlePageApp.gui = partial.gui();
    console.log(performance.now() - before);
}

function storePartials() {
    partials.forEach(function(partial:any) {
        partial.html = $(partial.sel);
        $(partial.sel).remove();
    });
}

export function startSingleApp() {
    singlePageApp.started = true;
    window.onpopstate = () => {
        console.log('pop state');
        viewTransition(location.pathname, true);
    }
    $(document).ready(() => {
        storePartials();
        viewTransition(location.pathname);
    });
}
singlePageApp.viewTransition = viewTransition;
var partial = findPartial(location.pathname);

if (partial) startSingleApp();



