var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./client-ajax");

var RenderedArticle = require('./templates/rendered-article');

var Partial = require("./partial");
var url = require("./../common/url");
var Arrows = require('./utils/score-arrow');

var base = ".partial.change ";

var ChangeGui = (function (_super) {
    __extends(ChangeGui, _super);
    function ChangeGui() {
        var _this = this;
        _super.call(this, '.change.partial');
        this.title = this.propertize(base + '.title', 'html');
        this.description = this.propertize(base + '.description', 'html');
        this.state = this.propertize(base + '.state.octicon');
        this.date = this.propertize(base + '.date', 'html');
        this.acceptBtn = this.propertize(base + 'button.accept');
        this.article = { id: "-1" };
        this.change = { id: "-1" };
        this.parseURL();
        var changeCb = ajax.changes.get({ article: this.article, change: this.change });
        var articleCb = ajax.article.get({ article: this.article });
        this.renderedArticle = new RenderedArticle(base);
        var _self = this;
        $(document).ready(function () {
            _self.changeScore = new Arrows.ChangeScore(_this.article, _this.change);
            changeCb.done(function (res) {
                var change = res.result;
                _self.description.val = change.description;

                _self.date.val = change.date;
                var state = '';
                if (change.state == 'open')
                    state = 'octicon-issue-opened';
                if (change.state == 'close')
                    state = 'octicon-issue-closed';
                _self.state.jq.addClass(state);
            });
            articleCb.done(function (res) {
                var article = res.result;
                _self.renderedArticle.setContent(article.content);
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
})(Partial);

if (subGuiName == 'ChangeGui') {
    subGui = new ChangeGui();
}

module.exports = ChangeGui;
//# sourceMappingURL=change-gui.js.map
