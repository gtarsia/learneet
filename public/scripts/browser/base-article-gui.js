var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var url = require("./../common/url");
var Gui = require("./gui");
var ArticleGui = require("./article-gui");
var EditArticleGui = require("./edit-article-gui");

var BaseArticleGui = (function (_super) {
    __extends(BaseArticleGui, _super);
    function BaseArticleGui() {
        _super.call(this);
        var _self = this;
        $.get(url.article.partials()).done(function (res) {
            $(document).ready(function () {
                $("#main").append(res);
            });
        });
        $(document).ready(function () {
            _self.check();
        });
    }
    BaseArticleGui.prototype.check = function () {
        var _self = this;
        var partials = [
            {
                re: url.article.get('\\d+'), gui: function () {
                    return new ArticleGui(_self);
                },
                sel: '.article-partial' },
            {
                re: url.article.edit('\\d+'), gui: function () {
                    return new EditArticleGui(_self);
                },
                sel: '.edit-article-partial' }
        ];
        partials.forEach(function (partial) {
            var match = location.pathname.match(partial.re);
            if (match) {
                _self.subGui = partial.gui();
                $(".partial").hide();
                $(partial.sel).show();
            }
        });
    };
    return BaseArticleGui;
})(Gui);
exports.BaseArticleGui = BaseArticleGui;

if (guiName == 'BaseArticleGui') {
    gui = new BaseArticleGui();
}
//# sourceMappingURL=base-article-gui.js.map
