declare function marked(s: string) : string;

import RenderedArticle = require('./rendered-article');
import EditableArticle = require("./editable-article");

class PreviewableArticle {
    output: RenderedArticle;
    input: EditableArticle;
    get article() { return this.input.article; }
    bindScrolls() {
        var _self = this;
        function getPercent(el) { return 100 * el.scrollTop() / (el[0].scrollHeight - el.height()); }
        function setPercent(el, percent) { el.scrollTop((el[0].scrollHeight - el.height()) * percent / 100); }
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
        _self.input.content.jq.bind("change keyup mouseup", function() {
            var line = this.value.substr(0, this.selectionStart).split("\n").length - 1;
            _self.output.scroll(line);
            console.log(line);
        });
        //bindScroll(this.input.content.jq, this.output.content.jq);
        //bindScroll(this.output.content.jq, this.input.content.jq);
    }
    ignoreScroll: boolean;
    bindTitlePreview() {
        var inputTitle = this.input.title;
        var outputTitle = this.output.title;
        inputTitle.jq.keyup(function(e) {
            var title: any = inputTitle.val;
            outputTitle.val = title;  
        });
    }
    translateWithParsing(content) {
        var output = '';
        var occurenceIndex = 0;
        var openKatex = false;
        var startIndex = 0;
        var length = content.length;
        while(occurenceIndex != -1 && startIndex < length) {
            // find next occurence of $$
            occurenceIndex = content.indexOf('$$', startIndex);
            // the end index should be the end of string if no symbol was found
            var endIndex = (occurenceIndex == -1 ? length : occurenceIndex);
            // get section to be added
            var section = content.substring(startIndex, endIndex);
            // if it's a katex block, parse it as such
            if (openKatex)
                section = katex.renderToString("\\displaystyle {" + section + "}");
            // add that section
            output += section;
            // point startIndex to endIndex so we reference the next section in the next iteration
            // we also skip the two characters of the symbol
            startIndex = endIndex + 2;
            // if an occurence has been found
            if (occurenceIndex != -1) {
                openKatex = !openKatex;
            }
        }
        return output;
    }
    bindContentPreview() {
        var _self = this;
        var inputContent = this.input.content;
        var outputContent = this.output.content;
        inputContent.jq.keyup(function(e) {
            //translateWithParsing();
            var content = inputContent.val;
            content = _self.translateWithParsing(content);
            //content = katex.renderToString("\\displaystyle {" + content + "}");
            outputContent.val = marked(content);
        });
    }
    constructor() {
        this.input = new EditableArticle();
        this.output = new RenderedArticle();
        this.ignoreScroll = false;
        this.bindTitlePreview();
        this.bindContentPreview();
        this.bindScrolls();
    }
}

export = PreviewableArticle;