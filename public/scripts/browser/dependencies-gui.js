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
        this.dependencySelect = this.propertize(base + 'select.dependency');
        this.addDependencyBtn = this.propertize(base + '.add-dependency');
        this.dependenciesIds = this.propertize(".dependency-id");
        this.dependency = this.propertize(base + ".dependency");
        this.removeDependencyBtns = this.propertize(base + ".removeDependency");
        this.parseURL();
        var _self = this;
        var titleCb = ajax.article.getTitleWithId({ article: { id: _self.id } });
        this.refreshDependencies();
        $(document).ready(function () {
            _self.setBreadcrumb();
            _self.dependencies.jq.empty();
            titleCb.done(function (res) {
                var article = res.result;
                _self.articleCrumb.jq.html('Back to Article(' + article.title + ')');
                _self.titleDeferred.resolve('Dependencies(' + article.title + ') - Learneet');
            });
            var selectizeOpts = {
                create: false,
                valueField: 'id',
                labelField: 'title',
                searchField: 'title',
                load: function (query, callback) {
                    if (!query.length)
                        return callback();
                    ajax.article.query({ query: query }).then(function (res) {
                        callback(res.result);
                    });
                },
                render: {
                    option: function (item, escape) {
                        return '<div>' + '<span class="dependency">' + '<span class="dependency-title">' + item.title + '</span>' + '<span class="dependency-by"></span>' + '</span>' + '</div>';
                    }
                }
            };
            var el = _self.dependencySelect.jq[0];
            if (el)
                if (el.selectize)
                    el.selectize.destroy();
            _self.dependencySelect.jq.selectize(selectizeOpts);
            _self.addDependencyBtn.jq.click(function () {
                var id = _self.dependencySelect.jq.val();
                if (id != "") {
                    ajax.dependencies.add({
                        dependent: { id: _self.id },
                        dependency: { id: id }
                    }).then(function (res) {
                        console.log(res);
                        _self.refreshDependencies();
                    });
                }
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
    DependenciesGui.prototype.removeDependency = function (jq) {
        var id = $(jq).siblings(this.dependenciesIds.jq).val();
        var _self = this;
        ajax.dependencies.remove({
            dependent: { id: this.id },
            dependency: { id: id }
        }).then(function (res) {
            _self.refreshDependencies();
        });
    };

    DependenciesGui.prototype.refreshDependencies = function () {
        var _self = this;
        var dependenciesCb = ajax.dependencies.getAll({ dependent: { id: _self.id } });
        $(document).ready(function () {
            dependenciesCb.done(function (res) {
                var deps = res.result;
                var none = 'display: none;';
                deps.forEach(function (dep) {
                    dep.dependencyId = dep.id;
                    dep.dependencyUrl = url.dependencies.get(dep.id);
                    dep.articleUrl = url.article.get(dep.id);
                    if (dep.starred == 'true') {
                        dep.starStyle = '';
                        dep.emptyStarStyle = none;
                    } else {
                        dep.starStyle = none;
                        dep.emptyStarStyle = '';
                    }

                    dep.arrowUpStyle = none;
                    dep.emptyArrowUpStyle = '';
                });
                console.log(deps);
                var template = _self.dependenciesTemplate.val;
                Mustache.parse(template);
                var rendered = Mustache.render(template, { dependencies: deps });
                _self.dependencies.jq.html(rendered);
                _self.dependenciesLinks.transitionURL('');
                _self.articlesLinks.transitionURL('');
                _self.removeDependencyBtns.jq.on("click", function () {
                    if (!confirm('Are you sure you want to remove this dependency?'))
                        return;
                    var myThis = eval("this");
                    _self.removeDependency(myThis);
                });
            });
        });
    };
    return DependenciesGui;
})(SinglePageGui);

module.exports = DependenciesGui;
//# sourceMappingURL=dependencies-gui.js.map
