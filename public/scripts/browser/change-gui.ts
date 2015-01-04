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
var base = ".partial.change ";

class ChangeGui extends Partial {
    title = this.propertize(base + '.title', 'html');
    description = this.propertize(base + '.description', 'html');
    state = this.propertize(base + '.state.octicon');
    date = this.propertize(base + '.date', 'html');
    acceptBtn = this.propertize(base + 'button.accept');
    renderedArticle: RenderedArticle;
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
        var changeCb = ajax.changes.get({article: this.article, change: this.change})
        var articleCb = ajax.article.get({article: this.article});
        this.renderedArticle = new RenderedArticle(base);
        var _self = this;
        $(document).ready(() => {
            changeCb.done(res => {
                var change = res.result;
                _self.description.val = change.description;
                //_self.score.val = change.score;
                _self.date.val = change.date;
                var state = '';
                if (change.state == 'open') state = 'octicon-issue-opened'
                if (change.state == 'close') state = 'octicon-issue-closed'
                _self.state.jq.addClass(state);
                debugger;
            })
            articleCb.done(res => {
                var article = res.result;
                _self.renderedArticle.setContent(article.content);
                _self.renderedArticle.setTitle(article.title);
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