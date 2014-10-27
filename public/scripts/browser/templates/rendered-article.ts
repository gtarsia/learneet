
class RenderedArticle {
    getTitle() {
        return $("h1.article-title");
    }
    getContent() {
        return $("div.article-content");
    }
    setTitle(s) {
        return $("h1.article-title").html(s);
    }
    setContent(s) {
        return $("div.article-content").html(s);
    }
    constructor() {
        
    }
}
 
export = RenderedArticle; 