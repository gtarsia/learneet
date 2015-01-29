declare function marked(s: string) : string;

import RenderedArticle = require('./rendered-article');
import EditableArticle = require("./editable-article");
import clientAjax = require(".././client-ajax");
import baseAjax = require("../.././common/base-ajax");
import render = require("./../utils/render");

class PreviewableArticle {
    output: RenderedArticle;
    input: EditableArticle;
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
    //If s is specified, it also sets the input, otherwise it uses the input
    updateTitle(s?: string) {
        if (s) this.input.title.val = s;
        else s = this.input.title.val;
        this.output.title.val = s;  
    }
    updateContent(s?: string) {
        if (s) this.input.content.val = s;
        else s = this.input.content.val;
        this.output.content.val = render.toMarkedKatex(s);
    }
    getArticle() {
        return { 
            article: {title: this.input.title.val, 
                content: this.input.content.val}
        }
    }
    bindTitlePreview() {
        var _self = this;
        var inputTitle = this.input.title;
        var outputTitle = this.output.title;
        inputTitle.jq.keyup(function(e) {
            _self.updateTitle();
        });
    }
    bindContentPreview() {
        var _self = this;
        var inputContent = this.input.content;
        var outputContent = this.output.content;
        inputContent.jq.keyup(function(e) {
            //translateWithParsing();
            _self.updateContent();
            window.onbeforeunload = x => {return "Are you sure you want to leave?"};
        });
    }
    fetchDBArticle(args: {id: string}): JQueryPromise<baseAjax.article.get.Return> {
        var _self = this;
        return clientAjax.article.get({article: args})
        .then(function(res) {
            if (!res.ok) {
                console.log(res.why);
                return;
            }
            var result = res.result
            _self.updateTitle(result.article.title);
            _self.updateContent(result.article.content);
            return null;
        });
    }
    constructor(base: string) {
        this.input = new EditableArticle(base);
        this.output = new RenderedArticle(base);
        this.ignoreScroll = false;
        this.bindTitlePreview();
        this.bindContentPreview();
        //this.bindScrolls();
    }
}

export = PreviewableArticle;