import ajax = require("./client-ajax");
import url = require("./../common/url");
import SinglePageGui = require("./single-page-gui");

declare function marked(c: string);
var base = '.partial.dependencies ';

class DependenciesGui extends SinglePageGui {
    id;
    articleCrumb = this.propertize(base + '.article.crumb');
    dependencies = this.propertize(base + '.dependency.list');
    dependenciesTemplate = this.propertize(base + '.template', 'html');
    dependenciesLinks = this.propertize(base + '.dependency a.dependencies');
    articlesLinks = this.propertize(base + '.dependency a.article');
    parseURL() {
        var re = url.dependencies.get('(\\d+)')
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.id = matches[1];
    }
    setBreadcrumb() {
        this.articleCrumb.transitionURL(url.article.get(this.id));
    }
    constructor() {
        super(base);
        this.parseURL();
        var _self = this;
        var titleCb = ajax.article.getTitleWithId({article: {id: _self.id}});
        var dependenciesCb = ajax.dependencies.getAll({user: {id: '1'}, article: {id: _self.id}});
        $(document).ready(function() {
            _self.setBreadcrumb();
            _self.dependencies.jq.empty();
            titleCb.done(res => {
                var article = res.result;
                _self.articleCrumb.jq.html('Back to Article(' + article.title + ')');
            })
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
            })
        });
    }
}

export = DependenciesGui