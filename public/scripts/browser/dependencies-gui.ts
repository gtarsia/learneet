import ajax = require("./client-ajax");
import url = require("./../common/url");
import SinglePageGui = require("./single-page-gui");

declare function marked(c: string);

class DependenciesGui extends SinglePageGui {
    id;
    articleCrumb = this.propertize('.article.crumb');
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
        super('.dependencies.partial');
        this.parseURL();
        var _self = this;
        var titleCb = ajax.article.getTitleWithId({article: {id: _self.id}});
        $(document).ready(function() {
            _self.setBreadcrumb();
            titleCb.done(res => {
                var article = res.result;
                _self.articleCrumb.jq.html('Back to Article(' + article.title + ')');
            })

        });
    }
}

export = DependenciesGui