import ajax = require('./../client-ajax');
import url = require("./../../common/url");
import Gui = require('./../gui');

class Dependencies extends Gui {
    id;
    removeDependencyBtns;
    dependenciesTemplate;
    dependencySelect : any;
    addDependencyBtn;
    dependenciesIds : any;
    dependency: any;
    dependencies;
    dependenciesLinks;
    articlesLinks;
    constructor(id: string) {
        super();
        this.id = id;
        this.removeDependencyBtns = this.propertize(".removeDependency");
        this.dependenciesTemplate = this.propertize('.template.dependencies', 'html');
        this.dependencySelect = this.propertize('select.dependency');
        this.addDependencyBtn = this.propertize('.add-dependency');
        this.dependenciesIds = this.propertize(".dependency-id");
        this.dependency = this.propertize(".dependency");
        this.dependencies = this.propertize('.dependency.list');
        this.dependenciesLinks = this.propertize('.dependency a.dependencies');
        this.articlesLinks = this.propertize('.dependency a.article');
        this.refreshDependencies();
        var _self = this;
        $(document).ready(function() {
            _self.dependencies.jq.empty();
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
    refreshDependencies() {
        var _self = this;
        var dependenciesCb = ajax.dependencies.getAll({dependent: {id: _self.id}});
        $(document).ready(function() {
            dependenciesCb.done(res => {
                var deps: any = res.result;
                var none = 'display: none;';
                deps.forEach(dep => {
                    dep.dependency = {};
                    dep.dependency.url = url.dependencies.get(dep.article.id);
                    dep.article.url = url.article.get(dep.article.id);
                    if (dep.starred == 'true')
                    { dep.starStyle = ''; 
                        dep.emptyStarStyle = none; }
                    else 
                    { dep.starStyle = none; 
                        dep.emptyStarStyle = ''; }
                    dep.arrowUpStyle = none;
                    dep.emptyArrowUpStyle = '';
                })
                console.log(deps);
                var template = _self.dependenciesTemplate.val;
                Mustache.parse(template);
                var rendered = Mustache.render(template, {dependencies: deps});
                _self.dependencies.jq.empty();
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

export = Dependencies;