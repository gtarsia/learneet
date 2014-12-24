var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require("./../gui");

var ArticleChangePreviewTemplate = (function (_super) {
    __extends(ArticleChangePreviewTemplate, _super);
    function ArticleChangePreviewTemplate(args) {
        _super.call(this);
        this.id = "-1";
        this.changesTemplate = this.propertize("#changes-template", 'html');
        this.changesFrame = this.propertize("#changes-frame");
        this.id = args.id;
        var _self = this;
        $(document).ready(function () {
            var changes = [];
            changes.push({
                author: 'erandros',
                icon: 'open',
                avatar: '/images/avatar.png',
                score: 13,
                description: 'doing some changes',
                url: '/articles/1/changes/1',
                date: 'Dec 24th, 22:20'
            });
            changes.push({
                author: 'erandros',
                icon: 'closed',
                avatar: '/images/avatar.png',
                score: '5',
                description: 'did some changes',
                url: '/articles/1/changes/2',
                date: 'Dec 21, 20:21'
            });
            var template = _self.changesTemplate.val;
            Mustache.parse(template);
            var rendered = Mustache.render(template, { changes: changes });
            _self.changesFrame.jq.append(rendered);
        });
    }
    return ArticleChangePreviewTemplate;
})(Gui);

module.exports = ArticleChangePreviewTemplate;
//# sourceMappingURL=article-change-preview-template.js.map
