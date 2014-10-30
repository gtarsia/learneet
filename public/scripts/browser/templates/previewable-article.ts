declare function marked(s: string) : string;

import RenderedArticle = require('./rendered-article');
import EditableArticle = require("./editable-article");

class PreviewableArticle {
    output: RenderedArticle;
    input: EditableArticle;
    get article() { return this.input.article; }
    bindScrolls() {
        var _self = this;
        function getPercent(el) { return 100 * el.scrollTop() / (el[0].scrollHeight - el.height()); }
        function setPercent(el, percent) { el.scrollTop((el[0].scrollHeight - el.height()) * percent / 100); }
        function bindScroll(src, dest) {
            src.scroll(function () {
                if (_self.ignoreScroll) {
                    _self.ignoreScroll = false;
                    return;
                }
                _self.ignoreScroll = true;
                setPercent(dest, getPercent(src));
            });
        }
        bindScroll(this.input.content.jq, this.output.content.jq);
        bindScroll(this.output.content.jq, this.input.content.jq);
    }
    ignoreScroll: boolean;
    bindTitlePreview() {
        var inputTitle = this.input.title;
        var outputTitle = this.output.title;
        inputTitle.jq.keyup(function(e) {
            var title: any = inputTitle.val;
            outputTitle.val = title;  
        });
    }
    bindContentPreview() {
        var inputContent = this.input.content;
        var outputContent = this.output.content;
        inputContent.jq.keyup(function(e) {
            var content = inputContent.val;
            var html = katex.renderToString("\\displaystyle {" + content + "}");
            outputContent.val = html;
        });
    }
    constructor() {
        this.input = new EditableArticle();
        this.output = new RenderedArticle();
        this.ignoreScroll = false;
        this.bindTitlePreview();
        this.bindContentPreview();
        this.bindScrolls();
    }
}

export = PreviewableArticle;