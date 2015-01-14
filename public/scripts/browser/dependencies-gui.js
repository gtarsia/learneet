var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./client-ajax");
var url = require("./../common/url");
var SinglePageGui = require("./single-page-gui");

var base = '.partial.dependencies ';

var DependenciesGui = (function (_super) {
    __extends(DependenciesGui, _super);
    function DependenciesGui() {
        _super.call(this, base);
        this.articleCrumb = this.propertize(base + '.article.crumb');
        this.dependencies = this.propertize(base + '.dependency.list');
        this.dependenciesTemplate = this.propertize(base + '.template', 'html');
        this.dependenciesLinks = this.propertize(base + '.dependency a.dependencies');
        this.articlesLinks = this.propertize(base + '.dependency a.article');
        this.parseURL();
        var _self = this;
        var titleCb = ajax.article.getTitleWithId({ article: { id: _self.id } });
        var dependenciesCb = ajax.dependencies.getAll({ article: { id: _self.id } });
        $(document).ready(function () {
            _self.setBreadcrumb();
            _self.dependencies.jq.empty();
            titleCb.done(function (res) {
                var article = res.result;
                _self.articleCrumb.jq.html('Back to Article(' + article.title + ')');
            });
            dependenciesCb.done(function (res) {
                var deps = res.result;
                deps.forEach(function (dep) {
                    dep.dependencyId = dep.id;
                    dep.dependencyUrl = url.dependencies.get(dep.id);
                    dep.articleUrl = url.article.get(dep.id);
                });
                console.log(deps);
                var template = _self.dependenciesTemplate.val;
                Mustache.parse(template);
                var rendered = Mustache.render(template, { dependencies: deps });
                _self.dependencies.jq.html(rendered);
                _self.dependenciesLinks.transitionURL('');
                _self.articlesLinks.transitionURL('');
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
