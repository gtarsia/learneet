declare function marked(s: string);

class PreviewableArticle {
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
        bindScroll(this.src, this.dest);
        bindScroll(this.dest, this.src);
    }
    ignoreScroll: boolean;
    bindTitlePreview() {
        this.src.keyup(function(e) {
            var title = $("input.article-title").val();
            $("h1.article-title").html(title);
        });
    }
    bindContentPreview() {
        $("textarea.article-content").keyup(function(e) {
            var content = $("textarea.article-content").val();
            $("div.article-content").html(marked(content));
        });
    }
    src: any
    dest: any
    constructor(src, dest) {
        this.ignoreScroll = false;
        this.src = src;
        this.dest = dest;
        this.bindTitlePreview();
        this.bindContentPreview();
        this.bindScrolls();
    }
}

export = PreviewableArticle;