declare function marked(s: string);

import RenderedArticle = require('./rendered-article');
import EditableArticle = require("./editable-article");

class PreviewableArticle {
    output: RenderedArticle;
    input: EditableArticle;
    getArticle() {
        return this.input.getArticle();
    }
    bindScrolls() {
        var _self = this;
        function getPercent(el) { return 100 * el.scrollTop() / (el[0].scrollHeight - el.height()); }
        function setPercent(el, percent) { el.scrollTop((el[0].scrollHeight - el.height()) * percent / 100); }
        var src = _self.input.getContent();
        var dest = _self.output.getContent();
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
        bindScroll(src, dest);
        bindScroll(dest, src);
    }
    ignoreScroll: boolean;
    bindTitlePreview() {
        var i = this.input.getTitle(); var o = this.output.getTitle();
        i.keyup(function(e) {
            var title = i.val();
            o.html(title);  
        });
    }
    bindContentPreview() {
        var i = this.input.getContent(); var o = this.output.getContent();
        i.keyup(function(e) {
            var content = i.val();
            o.html(marked(content));
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