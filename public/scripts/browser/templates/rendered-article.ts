
class RenderedArticle {
    content;
    title;
    constructor() {
        var _self = this;
        this.content = { 
            get jq() { return $("div.article-content"); },
            get val() { return _self.content.jq.html(); },
            set val(val) { _self.content.jq.html(val); }
        };
        this.title = {
            get jq() { return $("h1.article-title"); },
            get val() { return _self.title.jq.html(); },
            set val(val) { _self.title.jq.html(val); } 
        }
    }
}
 
export = RenderedArticle; 