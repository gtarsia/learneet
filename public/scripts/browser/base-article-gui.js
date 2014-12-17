var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var url = require("./../common/url");
var Gui = require("./gui");

var BaseArticleGui = (function (_super) {
    __extends(BaseArticleGui, _super);
    function BaseArticleGui() {
        _super.call(this);
        function check() {
            var partials = [
                { re: url.article.get('\\d+'), partial: 'article-partial' },
                { re: url.article.edit('\\d+'), partial: 'edit-article-partial' }
            ];
            partials.forEach(function (partial) {
                debugger;
                var what = location.pathname.match(partial.re);
            });
        }
        debugger;
        check();
    }
    return BaseArticleGui;
})(Gui);
exports.BaseArticleGui = BaseArticleGui;

if (guiName == 'BaseArticleGui') {
    gui = new BaseArticleGui();
}
//# sourceMappingURL=base-article-gui.js.map
