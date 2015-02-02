var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./../gui');

var EditableArticle = (function (_super) {
    __extends(EditableArticle, _super);
    function EditableArticle() {
        _super.call(this);
        var _self = this;
        this.content = this.propertize('textarea.article-content', 'val');
        this.title = this.propertize('input.article-title', 'val');
    }
    return EditableArticle;
})(Gui);

module.exports = EditableArticle;
//# sourceMappingURL=editable-article.js.map
