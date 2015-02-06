var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require('./../client-ajax');
var url = require("./../../common/url");
var Gui = require('./../gui');

var Dependencies = (function (_super) {
    __extends(Dependencies, _super);
    function Dependencies(id) {
        _super.call(this);
        this.removeDependencyBtns = this.propertize(".removeDependency");
        this.dependenciesTemplate = this.propertize('.template.dependencies', 'html');
        this.dependencySelect = this.propertize('select.dependency');
        this.addDependencyBtn = this.propertize('.add-dependency');
        this.dependenciesIds = this.propertize(".dependency-id");
        this.dependency = this.propertize(".dependency");
        this.dependencies = this.propertize('.dependency.list');
        this.dependenciesLinks = this.propertize('.dependency a.dependencies');
        this.articlesLinks = this.propertize('.dependency a.article');
        this.fullUpScoreArrow = this.propertize('span.octicon-arrow-up.full');
        this.emptyUpScoreArrow = this.propertize('span.octicon-arrow-up.empty');
        this.id = id;
        this.refreshDependencies();
        var _self = this;
        $(document).ready(function () {
            _self.dependencies.jq.empty();
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
    Dependencies.prototype.removeDependency = function (jq) {
        var id = $(jq).siblings(this.dependenciesIds.selector).val();
        var _self = this;
        ajax.dependencies.remove({
            dependent: { id: this.id },
            dependency: { id: id }
        }).then(function (res) {
            _self.refreshDependencies();
        });
    };
    Dependencies.prototype.upScore = function (jq) {
        var _this = this;
        var id = $(jq).siblings(this.dependenciesIds.selector).val();
        var _self = this;
        ajax.dependencies.upScore({
            dependent: { id: this.id },
            dependency: { id: id }
        }).then(function (res) {
            $(jq).siblings(_this.emptyUpScoreArrow.selector).hide();
            $(jq).siblings(_this.fullUpScoreArrow.selector).show();
        });
    };
    Dependencies.prototype.removeUpScore = function (jq) {
        var _this = this;
        var id = $(jq).siblings(this.dependenciesIds.selector).val();
        var _self = this;
        ajax.dependencies.removeUpScore({
            dependent: { id: this.id },
            dependency: { id: id }
        }).then(function (res) {
            $(jq).siblings(_this.fullUpScoreArrow.selector).hide();
            $(jq).siblings(_this.emptyUpScoreArrow.selector).show();
        });
    };
    Dependencies.prototype.refreshDependencies = function () {
        var _self = this;
        var dependenciesCb = ajax.dependencies.getAll({ dependent: { id: _self.id } });
        $(document).ready(function () {
            dependenciesCb.done(function (res) {
                var deps = res.result;
                var none = 'display: none;';
                deps.forEach(function (dep) {
                    dep.dependency = {};
                    dep.dependency.url = url.dependencies.get(dep.article.id);
                    dep.article.url = url.article.get(dep.article.id);
                    if (dep.starred == 'true') {
                        dep.starStyle = '';
                        dep.emptyStarStyle = none;
                    } else {
                        dep.starStyle = none;
                        dep.emptyStarStyle = '';
                    }
                    if (dep.article.upScore) {
                        dep.fullArrowUpStyle = '';
                        dep.emptyArrowUpStyle = none;
                    } else {
                        dep.emptyArrowUpStyle = '';
                        dep.fullArrowUpStyle = none;
                    }
                });
                console.log(deps);
                var template = _self.dependenciesTemplate.val;
                Mustache.parse(template);
                var rendered = Mustache.render(template, { dependencies: deps });
                _self.dependencies.jq.empty();
                _self.dependencies.jq.html(rendered);
                _self.dependenciesLinks.transitionURL('');
                _self.articlesLinks.transitionURL('');

                _self.fullUpScoreArrow.jq.click(function () {
                    _self.removeUpScore(eval("this"));
                });
                _self.emptyUpScoreArrow.jq.click(function () {
                    _self.upScore(eval("this"));
                });
            });
        });
    };
    return Dependencies;
})(Gui);

module.exports = Dependencies;
//# sourceMappingURL=dependencies.js.map
