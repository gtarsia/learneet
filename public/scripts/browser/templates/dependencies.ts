import ajax = require('./../client-ajax');
import url = require("./../../common/url");
import Gui = require('./../gui');

class Dependencies extends Gui {
    id;
    removeDependencyBtns = this.propertize(".removeDependency");
    dependenciesTemplate = this.propertize('.template.dependencies', 'html');
    dependencySelect = this.propertize('select.dependency');
    addDependencyBtn = this.propertize('.add-dependency');
    dependenciesIds = this.propertize(".dependency-id");
    dependency = this.propertize(".dependency");
    dependencies = this.propertize('.dependency.list');
    dependenciesLinks = this.propertize('.dependency a.dependencies');
    articlesLinks = this.propertize('.dependency a.article');
    fullUpScoreArrow = this.propertize('span.octicon-arrow-up.full');
    emptyUpScoreArrow = this.propertize('span.octicon-arrow-up.empty');
    constructor(id: string) {  
        super();
        this.id = id;
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
            var el: any = _self.dependencySelect.jq[0];
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
        var id = $(jq).siblings(this.dependenciesIds.selector).val();
        var _self = this;
        ajax.dependencies.remove({
            dependent: { id: this.id},
            dependency: { id: id}
        })
        .then(res => {
            _self.refreshDependencies();
        });
    }
    upScore(jq) {
        var id = $(jq).siblings(this.dependenciesIds.selector).val();
        var _self = this;
        ajax.dependencies.upScore({
            dependent: { id: this.id},
            dependency: { id: id}
        })
        .then(res => {
            $(jq).siblings(this.emptyUpScoreArrow.selector).hide();
            $(jq).siblings(this.fullUpScoreArrow.selector).show();
        });
    }
    removeUpScore(jq: any) {
        var id = $(jq).siblings(this.dependenciesIds.selector).val();
        var _self = this;
        ajax.dependencies.removeUpScore({
            dependent: { id: this.id},
            dependency: { id: id}
        })
        .then(res => {
            $(jq).siblings(this.fullUpScoreArrow.selector).hide();
            $(jq).siblings(this.emptyUpScoreArrow.selector).show();
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
                    if (dep.article.upScore) 
                    {   dep.fullArrowUpStyle = '';
                        dep.emptyArrowUpStyle = none; }
                    else 
                    {   dep.emptyArrowUpStyle = '';
                        dep.fullArrowUpStyle = none; }
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
                    var myThis:any = 
                    _self.removeDependency(myThis);
                })
                _self.fullUpScoreArrow.jq.click(() => {
                    _self.removeUpScore(eval("this"));
                })
                _self.emptyUpScoreArrow.jq.click(() => {
                    _self.upScore(eval("this"));
                })
            });
        });
    }
}

export = Dependencies;