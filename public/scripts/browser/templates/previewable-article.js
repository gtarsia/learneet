var RenderedArticle = require('./rendered-article');
var EditableArticle = require("./editable-article");
var clientAjax = require(".././client-ajax");

var render = require("./../utils/render");

var PreviewableArticle = (function () {
    function PreviewableArticle(base) {
        this.input = new EditableArticle(base);
        this.output = new RenderedArticle();
        this.ignoreScroll = false;
        this.bindTitlePreview();
        this.bindContentPreview();
    }
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
        _self.input.content.jq.bind("change keyup mouseup", function () {
            var line = this.value.substr(0, this.selectionStart).split("\n").length - 1;
            _self.output.scroll(line);
            console.log(line);
        });
    };

    PreviewableArticle.prototype.updateTitle = function (s) {
        if (s)
            this.input.title.val = s;
        else
            s = this.input.title.val;
        this.output.title.val = s;
    };
    PreviewableArticle.prototype.updateContent = function (s) {
        if (s)
            this.input.content.val = s;
        else
            s = this.input.content.val;
        this.output.content.val = render.toMarkedKatex(s);
    };
    PreviewableArticle.prototype.getArticle = function () {
        return {
            article: {
                title: this.input.title.val,
                content: this.input.content.val }
        };
    };
    PreviewableArticle.prototype.bindTitlePreview = function () {
        var _self = this;
        var inputTitle = this.input.title;
        var outputTitle = this.output.title;
        inputTitle.jq.keyup(function (e) {
            _self.updateTitle();
        });
    };
    PreviewableArticle.prototype.bindContentPreview = function () {
        var _self = this;
        var inputContent = this.input.content;
        var outputContent = this.output.content;
        inputContent.jq.keyup(function (e) {
            _self.updateContent();
            window.onbeforeunload = function (x) {
                return "Are you sure you want to leave?";
            };
        });
    };
    PreviewableArticle.prototype.fetchDBArticle = function (args) {
        var _self = this;
        return clientAjax.article.get({ article: args }).then(function (res) {
            if (!res.ok) {
                console.log(res.why);
                return;
            }
            var result = res.result;
            _self.updateTitle(result.title);
            _self.updateContent(result.content);
            return null;
        });
    };
    return PreviewableArticle;
})();

module.exports = PreviewableArticle;
//# sourceMappingURL=previewable-article.js.map
