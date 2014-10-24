import ClientAjax = require("./client-ajax");
import parser = require('./parser');
import GoTo = ClientAjax.GoTo;


export class EmbedArticleGui {
    id: string = "-1";
    getContentId() {
        return "content";
    }
    setContent(content) {
        $('#' + this.getContentId()).html(content);
    }
    getContent(): string {
        return $('#' + this.getContentId()).val();
    }
    setTitle(title) {
        $("#title").html(title);
    }
    getTitle(): string {
        throw new Error('Not implemented yet');
    }
    getEditBtn() {
        return $("#editBtn");
    }
    constructor() {
        var _self = this;
        $(document).ready(function() {
            var href = $(location).attr("href");
            _self.id = href.substr(href.lastIndexOf('/') + 1);
            new ClientAjax.Article.Get().ajax({ id: parseInt(_self.id) })
            .done(function(res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result
                _self.setTitle(result.title);
                var arr = result.content.split("\n");
                var length = arr.length;
                for (var i = 0; i < length; i++) {
                    parser.parseToDiv(arr[i], i, _self.getContentId());
                }
            });
            _self.getEditBtn().click(() => {
                GoTo.editArticle(_self.id);
            });
        });
    }
} 

declare var guiName;

if (guiName == 'EmbedArticle') {
    new EmbedArticleGui();
}