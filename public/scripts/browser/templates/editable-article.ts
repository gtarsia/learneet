import Gui = require('./../gui')



class EditableArticle extends Gui {
    content;
    title;
    constructor() {
        super();
        var _self = this;
        this.content = this.propertize('textarea.article-content', 'val');
        this.title = this.propertize('input.article-title', 'val');
    }
}

export = EditableArticle;