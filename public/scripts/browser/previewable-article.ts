declare function marked(s: string);

class PreviewableArticle {
    getArticle() {
        return {
            title: this.getInputTitle().val(),
            content: this.getInputContent().val()
        }
    }
    getInputContent() {
        return $("textarea.article-content");
    }
    getOutputContent() {
        return $("div.article-content");
    }
    getInputTitle() {
        return $("input.article-title");
    }
    getOutputTitle() {
        return $("h1.article-title");
    }
    bindScrolls() {
        var _self = this;
        function getPercent(el) { return 100 * el.scrollTop() / (el[0].scrollHeight - el.height()); }
        function setPercent(el, percent) { el.scrollTop((el[0].scrollHeight - el.height()) * percent / 100); }
        var src = _self.getInputContent();
        var dest = _self.getOutputContent();
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
        var i = this.getInputTitle(); var o = this.getOutputTitle();
        i.keyup(function(e) {
            var title = i.val();
            o.html(title);  
        });
    }
    bindContentPreview() {
        var i = this.getInputContent(); var o = this.getOutputContent();
        i.keyup(function(e) {
            var content = i.val();
            o.html(marked(content));
        });
    }
    constructor() {
        this.ignoreScroll = false;
        this.bindTitlePreview();
        this.bindContentPreview();
        this.bindScrolls();
    }
}

export = PreviewableArticle;