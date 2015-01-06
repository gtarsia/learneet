var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./../client-ajax");

var Gui = require("./../gui");
var url = require("./../../common/url");

var ArticleChangePreviewTemplate = (function (_super) {
    __extends(ArticleChangePreviewTemplate, _super);
    function ArticleChangePreviewTemplate(article) {
        _super.call(this);
        this.id = "-1";
        this.changesTemplate = this.propertize("#changes-template", 'html');
        this.changesFrame = this.propertize("#changes-frame");
        this.changesLink = this.propertize(".change-description a");
        this.id = article.id;
        var _self = this;
        $(document).ready(function () {
            ajax.changes.getAll({ article: article }).done(function (res) {
                var changes = res.result;
                changes.forEach(function (change) {
                    var octi = '';
                    if (change.state == 'open')
                        octi = 'octicon-issue-opened';
                    else if (change.state == 'closed')
                        octi = 'octicon-issue-closed';
                    change.octicon = octi;
                    change.avatar = '/images/avatar.png';
                    change.url = url.change.get(_self.id, change.id);
                });
                var template = _self.changesTemplate.val;
                Mustache.parse(template);
                var rendered = Mustache.render(template, { changes: changes });
                _self.changesFrame.jq.append(rendered);
                _self.changesLink.transitionURL('');
            });
        });
    }
    return ArticleChangePreviewTemplate;
})(Gui);

module.exports = ArticleChangePreviewTemplate;
//# sourceMappingURL=article-change-preview-template.js.map
