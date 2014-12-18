import url = require("./../common/url");
import Gui = require("./gui");
import ArticleGui = require("./article-gui");
import EditArticleGui = require("./edit-article-gui");

export class BaseArticleGui extends Gui {
    subGui: Gui;
    check() {
        var _self = this;
        var partials = [
            {re: url.article.get('\\d+'), gui: function() {return new ArticleGui(_self)},
            sel: '.article-partial' }, 
            {re: url.article.edit('\\d+'), gui: function() { return new EditArticleGui(_self)},
            sel: '.edit-article-partial'}
        ];
        partials.forEach(function(partial:any) {
            var match = location.pathname.match(partial.re);
            if (match) {
                _self.subGui = partial.gui();
                $(".partial").hide();
                $(partial.sel).show();
            }
        });
    }
    constructor() {

        super();
        var _self = this;
        $.get(url.article.partials())
        .done(res => {
            $(document).ready(() => {
                $("#main").append(res);
            });
        });
        $(document).ready(() => {
            _self.check();
        });
    }
}

declare var guiName;
declare var gui;

if (guiName == 'BaseArticleGui') {
    gui = new BaseArticleGui();
}