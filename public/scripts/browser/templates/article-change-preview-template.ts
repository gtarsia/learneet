import ajax = require("./../client-ajax");
import BaseArticleGui = require('./../base-article-gui');
import Gui = require("./../gui");
import url = require("./../../common/url");
import Arrows = require('./../utils/score-arrow');
declare function marked(s);

declare var gui: BaseArticleGui;

class ArticleChangePreviewTemplate extends Gui {
    id: string = "-1";
    changesTemplate = this.propertize("#changes-template", 'html');
    changesFrame = this.propertize("#changes-frame");
    constructor(args: {id: string}) {
        super();
        this.id = args.id;
        var _self = this;
        $(document).ready(() => {
            var changes = [];
            changes.push({
                author: 'erandros', 
                icon: 'open', 
                avatar: '/images/avatar.png', 
                score: 13, 
                description: 'doing some changes',
                url: '/articles/1/changes/1',
                octicon: 'octicon-issue-opened',
                date: 'Dec 24th, 22:20'
            });
            changes.push({
                author: 'erandros', 
                icon: 'closed', 
                avatar: '/images/avatar.png', 
                score: '5', 
                description: 'did some changes', 
                url: '/articles/1/changes/2',
                octicon: 'octicon-issue-closed',
                date: 'Dec 21, 20:21'
            });
            var template = _self.changesTemplate.val;
            Mustache.parse(template);
            var rendered = Mustache.render(template, {changes: changes});
            _self.changesFrame.jq.append(rendered);
        });
    }
} 

export = ArticleChangePreviewTemplate;