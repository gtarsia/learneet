import Gui = require('./../gui')
import render = require('./../utils/render');

declare function marked(s);

class RenderedArticle extends Gui {
    content;
    title;
    avatar;
    constructor(parent?) {
        super();
        var _self = this;
        if (!parent) parent = '';
        this.content = this.propertize(parent + ' div.article-content', 'html');
        this.title = this.propertize(parent + ' h1.article-title', 'html')
        this.avatar = this.propertize(parent + ' img.avatar');
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
    clear() {
        this.title.val = '';
        this.content.val = '';
    }
    setTitle(title) {
        this.title.jq.velocity({opacity: 0}, {duration: 0});
        this.title.val = title;
        this.title.jq.velocity({opacity: 1}, {duration: 180});
    }
    setContent(content) {
        this.content.jq.velocity({opacity: 0}, {duration: 0});
        this.content.val = render.toMarkedKatex(content);
        this.content.jq.velocity({opacity: 1}, {duration: 180});
    }
}
 
export = RenderedArticle; 