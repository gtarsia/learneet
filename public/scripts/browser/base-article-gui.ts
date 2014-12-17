import url = require("./../common/url");
import Gui = require("./gui");


export class BaseArticleGui extends Gui {

    constructor() {
        super();
        function check(){
            var partials = [
                {re: url.article.get('\\d+'), partial: 'article-partial' }, 
                {re: url.article.edit('\\d+'), partial: 'edit-article-partial'}
            ];
            partials.forEach(function(partial) {
                debugger;
                var what = location.pathname.match(partial.re);
            });
        }
        debugger;
        check();
    }
}

declare var guiName;
declare var gui;

if (guiName == 'BaseArticleGui') {
    gui = new BaseArticleGui();
}