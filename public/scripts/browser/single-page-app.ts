import url = require("./../common/url");
import Gui = require("./gui");
import SinglePageApp = require("./single-page-app");
import SinglePageGui = require("./single-page-gui");
import IndexGui = require("./index-gui");
import ArticleGui = require("./article-gui");
import CreateArticleGui = require("./create-article-gui");
import EditArticleGui = require("./edit-article-gui");
import DependenciesGui = require("./dependencies-gui");
import UserGui = require("./user-gui");
import EditUserGui = require("./edit-user-gui");
import ChangeGui = require("./change-gui");

declare var gui : SinglePageGui;
declare var singlePageApp;

export function findSinglePageGui(urlToGo: string) {
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
    var before = performance.now();
    $(".partial.active *").unbind();
    $('.partial.active').removeClass('active');
    console.log(performance.now() - before);
    if (!isBack) history.pushState({}, '', urlToGo);
    $(".partial").hide();
    gui = findSinglePageGui(urlToGo)();
    gui.main.jq.addClass('active');
}

export function startSingleApp(gui: SinglePageGui) {
    window.onpopstate = () => {
        console.log('pop state');
        viewTransition(location.pathname, true);
    }
    $(document).ready(() => {
        viewTransition(location.pathname);
    });
}

var guiFound = findSinglePageGui(location.pathname);
if (guiFound) startSingleApp(guiFound);

singlePageApp.viewTransition = viewTransition;
singlePageApp.guiFound = guiFound;

/*
export function findGuiBuilderFromUrl() {
    var partials = [
        {re: url.article.get('\\d+'), 
        gui: function() {return new ArticleGui({})},
        sel: '.article.partial' }, 
        {re: url.article.edit('\\d+'), 
        gui: function() { return new EditArticleGui({})},
        sel: '.edit-article-partial'},
        {re: url.change.get('\\d+', '\\d+'), 
        gui: function() { return new ChangeGui()},
        sel: '.change.partial'}
    ];
    var _guiBuilder;
    partials.forEach(function(partial:any) {
        var match = location.pathname.match('^' + partial.re + '$');
        if (match && !_guiBuilder) {
            _guiBuilder = partial.gui;
        }
    });
    return _guiBuilder;
}

export function viewTransition(urlToGo: string, isBack?: boolean) {
    var before = performance.now();
    $("#main *").unbind();

    console.log(performance.now() - before);
    var _self = this;
    if (!isBack) history.pushState({}, '', urlToGo);
    
    $(".partial").hide();
    var partials = [
        {re: url.article.get('\\d+'), 
        gui: function() {return new ArticleGui({})},
        sel: '.article.partial' }, 
        {re: url.article.edit('\\d+'), 
        gui: function() { return new EditArticleGui({})},
        sel: '.edit-article-partial'},
        {re: url.change.get('\\d+', '\\d+'), 
        gui: function() { return new ChangeGui()},
        sel: '.change.partial'}
    ];
    partials.forEach(function(partial:any) {
        var match = location.pathname.match('^' + partial.re + '$');
        if (match && !gui) {
            gui = partial.gui();
        }
    });
}

export function startSinglePage() {
    window.onpopstate = () => {
        console.log('pop state');
        _self.viewTransition(location.pathname, true);
    }
    $.get(url.article.partials())
    .done(res => {
        $(document).ready(() => {
            $("#main").append(res);
            //Remove the second of the partials so you never get duplicates
            gui.main.jq[1].remove();
            viewTransition(location.pathname)
        });
    });
}


startSinglePage();
*/
