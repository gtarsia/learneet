import Gui = require('./../gui')

declare function marked(s);

class RenderedArticle extends Gui {
    content;
    title;
    constructor(parent?) {
        super();
        var _self = this;
        if (!parent) parent = '';
        this.content = this.propertize(parent + ' div.article-content', 'html');
        this.title = this.propertize(parent + ' h1.article-title', 'html')
    }
    scroll(line: number) {
        var outputLine = $(".line" + line);
        if (outputLine.length) {
            $(".selected").removeClass("selected");
            outputLine.addClass("selected");
            this.content.jq.scrollTop(
                (this.content.jq.scrollTop() - this.content.jq.offset().top)
                + outputLine.offset().top - this.content.jq.height()/2);
        }
    }
    setTitle(title) {
        this.title.val = title
    }
    setContent(content) {
        this.content.val = marked(content);
    }
}
 
export = RenderedArticle; 