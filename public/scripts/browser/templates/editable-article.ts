import Gui = require('./../gui')



class EditableArticle extends Gui {
    content;
    title;
    constructor(base: string) {
        super();
        var _self = this;
        this.content = this.propertize(base + 'textarea.article-content', 'val');
        this.title = this.propertize(base + 'input.article-title', 'val');
    }
}

export = EditableArticle;