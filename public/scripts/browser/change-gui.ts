import ajax = require("./client-ajax");
import parser = require('./parser');
import RenderedArticle = require('./templates/rendered-article');
import BaseArticleGui = require('./base-article-gui');
import ArticleChangePreviewTemplate = require('./templates/article-change-preview-template');
import Gui = require("./gui");
import Partial = require("./partial");
import url = require("./../common/url");
import Arrows = require('./utils/score-arrow');
declare function marked(s);

declare var gui: BaseArticleGui;

class ChangeGui extends Partial {
    article: {id: string} = {id: "-1"};
    change: {id: string} = {id: "-1"};
    data: {}
    getEditBtn() {
        return $("#editBtn");
    }
    setCrumb() {
    }
    parseURL() {
        debugger;
        var re = url.change.get('(\\d+)', '(\\d+)')
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.article.id = matches[1];
        this.change.id = matches[2];
    }
    constructor() {
        super('.change.partial');
        this.parseURL();
        var cb = ajax.changes.get({article: this.article, change: this.change})
        var _self = this;
        $(document).ready(() => {
            cb.done(res => {
                debugger;
            })
        });
    }
} 

declare var subGuiName;
declare var subGui;

if (subGuiName == 'ChangeGui') {
    subGui = new ChangeGui();
}

export = ChangeGui;