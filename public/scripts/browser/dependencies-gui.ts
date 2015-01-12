import ajax = require("./client-ajax");
import url = require("./../common/url");
import SinglePageGui = require("./single-page-gui");

declare function marked(c: string);

class DependenciesGui extends SinglePageGui {
    id;
    parseURL() {
        var re = url.dependencies.get('(\\d+)')
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.id = matches[1];
    }
    constructor() {
        super('.dependencies.partial');
        this.parseURL();
        var _self = this;
        var titleCb = ajax.article.getTitleWithId({article: {id: _self.id}});
        $(document).ready(function() {
            titleCb.done(res => {
                var article = res.result;

            })
        });
    }
}

export = DependenciesGui