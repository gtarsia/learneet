var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./client-ajax");
var url = require("./../common/url");
var SinglePageGui = require("./single-page-gui");

var DependenciesGui = (function (_super) {
    __extends(DependenciesGui, _super);
    function DependenciesGui() {
        _super.call(this, '.dependencies.partial');
        this.articleCrumb = this.propertize('.article.crumb');
        this.parseURL();
        var _self = this;
        var titleCb = ajax.article.getTitleWithId({ article: { id: _self.id } });
        $(document).ready(function () {
            _self.setBreadcrumb();
            titleCb.done(function (res) {
                var article = res.result;
                _self.articleCrumb.jq.html('Back to Article(' + article.title + ')');
            });
        });
    }
    DependenciesGui.prototype.parseURL = function () {
        var re = url.dependencies.get('(\\d+)');
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.id = matches[1];
    };
    DependenciesGui.prototype.setBreadcrumb = function () {
        this.articleCrumb.transitionURL(url.article.get(this.id));
    };
    return DependenciesGui;
})(SinglePageGui);

module.exports = DependenciesGui;
//# sourceMappingURL=dependencies-gui.js.map
