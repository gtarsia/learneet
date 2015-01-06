import url = require("./../common/url");
import Gui = require("./gui");
import Partial = require("./partial");
import ArticleGui = require("./article-gui");
import EditArticleGui = require("./edit-article-gui");
import ChangeGui = require("./change-gui");

declare var subGui;

class BaseArticleGui extends Gui {
    viewTransition(urlToGo: string, isBack?: boolean) {
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
            if (match) {
                subGui = partial.gui();
            }
        });
    }
    constructor() {
        super();
        var _self = this;
        window.onpopstate = () => {
            console.log('pop state');
            _self.viewTransition(location.pathname, true);
        }
        $.get(url.article.partials())
        .done(res => {
            $(document).ready(() => {
                $("#main").append(res);
                //Remove the second of the partials so you never get duplicates
                subGui.main.jq[1].remove();
            });
        });

    }
}

declare var guiName;
declare var gui;

if (guiName == 'BaseArticleGui') {
    gui = new BaseArticleGui();
}

export = BaseArticleGui;