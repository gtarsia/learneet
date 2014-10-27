
class EditableArticle {
    getArticle() {
        return {
            title: this.getTitle().val(),
            content: this.getContent().val()
        }
    }
    getContent() {
        return $("textarea.article-content");
    }
    getTitle() {
        return $("input.article-title");
    }
    constructor() {
        
    }
}

export = EditableArticle;