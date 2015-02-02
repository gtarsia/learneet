import ajax = require("./client-ajax");
import url = require("./../common/url");
import Gui = require("./gui");

declare function marked(c: string);

class DependenciesGui extends Gui {
    id;
    articleCrumb = this.propertize('.article.crumb');
    dependencies = this.propertize('.dependency.list');
    dependenciesTemplate = this.propertize('.template.dependencies', 'html');
    dependenciesLinks = this.propertize('.dependency a.dependencies');
    articlesLinks = this.propertize('.dependency a.article');
    dependencySelect:any = this.propertize('select.dependency');
    addDependencyBtn = this.propertize('.add-dependency');
    dependenciesIds: any = this.propertize(".dependency-id");
    dependency: any = this.propertize(".dependency");
    removeDependencyBtns = this.propertize(".removeDependency");
    parseURL() {
        var re = url.dependencies.get('(\\d+)')
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.id = matches[1];
    }
    setBreadcrumb() {
        this.articleCrumb.transitionURL(url.article.get(this.id));
    }
    removeDependency(jq) {
        var id = $(jq).siblings(this.dependenciesIds.jq).val();
        var _self = this;
        ajax.dependencies.remove({
            dependent: { id: this.id},
            dependency: { id: id}
        })
        .then(res => {
            _self.refreshDependencies();
        });
    }
    constructor() {
        super();
        this.parseURL();
        var _self = this;
        var titleCb = ajax.article.getTitleWithId({article: {id: _self.id}});
        this.refreshDependencies();
        $(document).ready(function() {
            _self.setBreadcrumb();
            _self.dependencies.jq.empty();
            titleCb.done(res => {
                var article = res.result;
                _self.articleCrumb.jq.html('Back to Article(' + article.title + ')');
                _self.titleDeferred.resolve(
                    'Dependencies(' + article.title + ') - Learneet')
            })
            var selectizeOpts = {
                create: false,
                valueField: 'id',
                labelField: 'title',
                searchField: 'title',
                load: function(query, callback) {
                    if (!query.length) return callback();
                    ajax.article.query({query: query})
                    .then(res => {
                        callback(res.result);
                    })
                },
                render: {
                    option: function(item, escape) {
                        return '<div>' +
                            '<span class="dependency">' +
                                '<span class="dependency-title">' + item.title + '</span>' +
                                '<span class="dependency-by"></span>' +
                            '</span>' +
                        '</div>';
                    }
                }
            };
            var el = _self.dependencySelect.jq[0];
            if (el) if (el.selectize) el.selectize.destroy();
            _self.dependencySelect.jq.selectize(selectizeOpts);
            _self.addDependencyBtn.jq.click(() => {
                var id = _self.dependencySelect.jq.val();
                if (id != "") {
                    ajax.dependencies.add({
                        dependent: {id: _self.id},
                        dependency: {id: id}
                    })
                    .then(res => {
                        console.log(res);
                        _self.refreshDependencies();
                    });
                }
            });
        });
    }
    refreshDependencies() {
        var _self = this;
        var dependenciesCb = ajax.dependencies.getAll({dependent: {id: _self.id}});
        $(document).ready(function() {
            dependenciesCb.done(res => {
                var deps: any = res.result;
                var none = 'display: none;';
                deps.forEach(dep => {
                    dep.dependencyId = dep.id;
                    dep.dependencyUrl = url.dependencies.get(dep.id);
                    dep.articleUrl = url.article.get(dep.id);
                    if (dep.starred == 'true')
                    { dep.starStyle = ''; dep.emptyStarStyle = none; }
                    else 
                    { dep.starStyle = none; dep.emptyStarStyle = ''; }
                    
                    dep.arrowUpStyle = none;
                    dep.emptyArrowUpStyle = '';
                })
                console.log(deps);
                var template = _self.dependenciesTemplate.val;
                Mustache.parse(template);
                var rendered = Mustache.render(template, {dependencies: deps});
                _self.dependencies.jq.html(rendered);
                _self.dependenciesLinks.transitionURL('');
                _self.articlesLinks.transitionURL('');
                _self.removeDependencyBtns.jq.on("click", () => {
                    if (!confirm('Are you sure you want to remove this dependency?')) return;
                    var myThis:any = eval("this");
                    _self.removeDependency(myThis);
                })
            });
        });
    }
}

export = DependenciesGui