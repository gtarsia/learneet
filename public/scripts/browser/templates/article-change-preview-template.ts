import ajax = require("./../client-ajax");
import Gui = require("./../gui");
import url = require("./../../common/url");
import Arrows = require('./../utils/score-arrow');
declare function marked(s);

class ArticleChangePreviewTemplate extends Gui {
    id: string = "-1";
    changesTemplate = this.propertize("#changes-template", 'html');
    changesFrame = this.propertize("#changes-frame");
    changesLink = this.propertize(".change-description a");
    constructor(article: {id: string}) {
        super();
        this.id = article.id;
        var _self = this;
        $(document).ready(() => {
            ajax.changes.getAll({article: article})
            .done(res => {
                var changes: any = res.result;
                changes.forEach(function(change) {
                    var octi = '';
                    if (change.state == 'open')
                        octi = 'octicon-issue-opened';
                    else if (change.state == 'closed')
                        octi = 'octicon-issue-closed';
                    change.octicon = octi;
                    change.avatar = '/images/avatar.png';
                    change.url = url.change.get(_self.id, change.id);
                })
                var template = _self.changesTemplate.val;
                Mustache.parse(template);
                var rendered = Mustache.render(template, {changes: changes});
                _self.changesFrame.jq.append(rendered);
                _self.changesLink.transitionURL('');
            });
        });
    }
} 

export = ArticleChangePreviewTemplate;