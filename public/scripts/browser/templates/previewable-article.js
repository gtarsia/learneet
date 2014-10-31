var RenderedArticle = require('./rendered-article');
var EditableArticle = require("./editable-article");

var PreviewableArticle = (function () {
    function PreviewableArticle() {
        this.input = new EditableArticle();
        this.output = new RenderedArticle();
        this.ignoreScroll = false;
        this.bindTitlePreview();
        this.bindContentPreview();
        this.bindScrolls();
    }
    Object.defineProperty(PreviewableArticle.prototype, "article", {
        get: function () {
            return this.input.article;
        },
        enumerable: true,
        configurable: true
    });
    PreviewableArticle.prototype.bindScrolls = function () {
        var _self = this;
        function getPercent(el) {
            return 100 * el.scrollTop() / (el[0].scrollHeight - el.height());
        }
        function setPercent(el, percent) {
            el.scrollTop((el[0].scrollHeight - el.height()) * percent / 100);
        }
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
        bindScroll(this.input.content.jq, this.output.content.jq);
        bindScroll(this.output.content.jq, this.input.content.jq);
    };

    PreviewableArticle.prototype.bindTitlePreview = function () {
        var inputTitle = this.input.title;
        var outputTitle = this.output.title;
        inputTitle.jq.keyup(function (e) {
            var title = inputTitle.val;
            outputTitle.val = title;
        });
    };
    PreviewableArticle.prototype.translateWithParsing = function (content) {
        var output = '';
        var occurenceIndex = 0;
        var openKatex = false;
        var startIndex = 0;
        var length = content.length;
        while (occurenceIndex != -1 && startIndex < length) {
            occurenceIndex = content.indexOf('$$', startIndex);

            var endIndex = (occurenceIndex == -1 ? length : occurenceIndex);

            var section = content.substring(startIndex, endIndex);

            if (openKatex)
                section = katex.renderToString("\\displaystyle {" + section + "}");

            output += section;

            startIndex = endIndex + 2;

            if (occurenceIndex != -1) {
                openKatex = !openKatex;
            }
        }
        return output;
    };
    PreviewableArticle.prototype.bindContentPreview = function () {
        var _self = this;
        var inputContent = this.input.content;
        var outputContent = this.output.content;
        inputContent.jq.keyup(function (e) {
            var content = inputContent.val;
            content = _self.translateWithParsing(content);

            outputContent.val = marked(content);
        });
    };
    return PreviewableArticle;
})();

module.exports = PreviewableArticle;
//# sourceMappingURL=previewable-article.js.map
