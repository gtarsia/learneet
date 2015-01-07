var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./client-ajax");

var RenderedArticle = require('./templates/rendered-article');

var SinglePageGui = require("./single-page-gui");
var url = require("./../common/url");
var Arrows = require('./utils/score-arrow');

var base = ".partial.change ";

var ChangeGui = (function (_super) {
    __extends(ChangeGui, _super);
    function ChangeGui() {
        var _this = this;
        _super.call(this, base);
        this.title = this.propertize(base + '.title', 'html');
        this.description = this.propertize(base + '.description', 'html');
        this.state = this.propertize(base + '.state.octicon');
        this.date = this.propertize(base + '.date', 'html');
        this.acceptBtn = this.propertize(base + 'button.accept');
        this.articleCrumb = this.propertize(base + '.article-crumb');
        this.changeCrumb = this.propertize(base + '.change-crumb');
        this.article = { id: "-1" };
        this.change = { id: "-1" };
        this.parseURL();
        var changeCb = ajax.changes.get({ article: this.article, change: this.change });
        this.renderedArticle = new RenderedArticle(base);
        var _self = this;
        $(document).ready(function () {
            _self.articleCrumb.transitionURL(url.article.get(_this.article.id));
            _self.changeCrumb.jq.prop('href', location.pathname);
            _self.changeCrumb.jq.click(function (e) {
                location.reload();
            });
            _self.changeScore = new Arrows.ChangeScore(_this.article, _this.change);
            changeCb.done(function (res) {
                var change = res.result.change;
                var article = res.result.article;
                _self.description.val = change.description;

                _self.date.val = change.date;
                var state = '';
                if (change.state == 'open')
                    state = 'octicon-issue-opened';
                if (change.state == 'close')
                    state = 'octicon-issue-closed';
                _self.state.jq.addClass(state);

                var changed = JsDiff.applyPatch(article.content, change.changes);
                var diff = JsDiff.diffChars(article.content, changed);

                var diffed = '';
                diff.forEach(function (part) {
                    var cls = part.added ? 'diff added' : part.removed ? 'diff removed' : null;
                    diffed += cls ? "<span class='" + cls + "'>" + part.value + '</span>' : part.value;
                });
                _self.renderedArticle.setContent(diffed);
                _self.renderedArticle.setTitle(article.title);
            });
        });
    }
    ChangeGui.prototype.getEditBtn = function () {
        return $("#editBtn");
    };
    ChangeGui.prototype.setCrumb = function () {
    };
    ChangeGui.prototype.parseURL = function () {
        var re = url.change.get('(\\d+)', '(\\d+)');
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.article.id = matches[1];
        this.change.id = matches[2];
    };
    return ChangeGui;
})(SinglePageGui);

module.exports = ChangeGui;
//# sourceMappingURL=change-gui.js.map
