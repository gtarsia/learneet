import url = require("./../common/url");
import Gui = require("./gui");
import Partial = require("./partial");
import ArticleGui = require("./article-gui");
import EditArticleGui = require("./edit-article-gui");

declare var subGui;

class BaseArticleGui extends Gui {
    subGui: Partial;
    viewTransition(urlToGo: string, isBack?: boolean) {
        var _self = this;
        if (!isBack) history.pushState({}, '', urlToGo);
        $(".partial").hide();
        var partials = [
            {re: url.article.get('\\d+'), 
            gui: function() {return new ArticleGui({})},
            sel: '.article-partial' }, 
            {re: url.article.edit('\\d+'), 
            gui: function() { return new EditArticleGui({})},
            sel: '.edit-article-partial'}
        ];
        partials.forEach(function(partial:any) {
            var match = location.pathname.match(partial.re);
            if (match) {
                _self.subGui = partial.gui();
                $(partial.sel).show();
            }
        });
    }
    constructor() {
        super();
        var _self = this;
        this.subGui = subGui;
        window.onpopstate = () => {
            console.log('pop state');
            _self.viewTransition(location.pathname, true);
        }
        $.get(url.article.partials())
        .done(res => {
            $(document).ready(() => {
                $("#main").append(res);
                _self.subGui.main.jq[1].remove();
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