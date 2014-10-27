
class EditableArticle {
    content;
    title;
    constructor() {
        var _self = this;
        this.content = { 
            get jq() { return $("textarea.article-content"); },
            get val() { return _self.content.jq.val(); },
            set val(val) { _self.content.jq.val(val); }
        };
        this.title = {
            get jq() { return $("input.article-title"); },
            get val() { return _self.title.jq.val(); },
            set val(val) { _self.title.jq.val(val); } 
        }
    }
    get article() { return { title: this.title.val, content: this.content.val} }
}

export = EditableArticle;