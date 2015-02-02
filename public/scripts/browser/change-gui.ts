import ajax = require("./client-ajax");
import parser = require('./parser');
import RenderedArticle = require('./templates/rendered-article');
import ArticleChangePreviewTemplate = require('./templates/article-change-preview-template');
import Gui = require("./gui");
import url = require("./../common/url");
import Arrows = require('./utils/score-arrow');

declare function marked(s);
declare var JsDiff: any;

class ChangeGui extends Gui {
    title = this.propertize('.title', 'html');
    description = this.propertize('.description', 'html');
    state = this.propertize('.state.octicon');
    date = this.propertize('.date', 'html');
    acceptBtn = this.propertize('button.accept');
    articleCrumb = this.propertize('.article-crumb');
    renderedArticle: RenderedArticle;
    article: {id: string} = {id: "-1"};
    change: {id: string} = {id: "-1"};
    data: {}
    changeScore;
    getEditBtn() {
        return $("#editBtn");
    }
    setCrumb() {
    }
    parseURL() {
        var re = url.change.get('(\\d+)', '(\\d+)')
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.article.id = matches[1];
        this.change.id = matches[2];
    }
    constructor() {
        super();
        this.parseURL();
        var changeCb = ajax.changes.get({article: this.article, change: this.change})
        this.renderedArticle = new RenderedArticle();
        var _self = this;
        $(document).ready(() => {
            _self.articleCrumb.transitionURL(url.article.get(this.article.id));
            _self.changeScore = new Arrows.ChangeScore(this.article, this.change);
            changeCb.done(res => {
                var change = res.result.change;
                var article = res.result.article;
                _self.description.val = change.description;
                //_self.score.val = change.score;
                _self.date.val = change.date;
                var state = '';
                if (change.state == 'open') state = 'octicon-issue-opened'
                if (change.state == 'close') state = 'octicon-issue-closed'
                _self.state.jq.addClass(state);

                var changed = JsDiff.applyPatch(article.content, change.changes)
                var diff = JsDiff.diffChars(article.content, changed);
                
                var diffed = '';
                diff.forEach(function(part){
                  // green for additions, red for deletions
                  // grey for common parts
                    var cls = part.added ? 'diff added' :
                    part.removed ? 'diff removed' : null;
                    diffed += cls ? "<span class='" + cls + "'>" + part.value + '</span>' 
                        : part.value;
                });
                _self.renderedArticle.setContent(diffed);
                _self.renderedArticle.setTitle(article.title);
            })
        });
    }
} 

export = ChangeGui;