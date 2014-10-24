import ClientAjax = require("./client-ajax");
import GoTo = ClientAjax.GoTo;


export class EmbedEditArticleGui {
    id: string = "-1";
    bindTitlePreview() {
        $("input.article-title").keyup(function(e) {
            var title = $("input.article-title").val();
            $("h1.article-title").html(title);
        });
    }
    getContentId() {
        return "content";
    }
    setTitle(title) {
        $("#title").html(title);
    }
    setContent(content) {
        $('#' + this.getContentId()).html(content);
    }
    getSaveBtn() {
        return $("#saveBtn");
    }
    constructor() {
        var _self = this;
        $(document).ready(function() {
            _self.bindTitlePreview();
            var href = $(location).attr("href");
            _self.id = href.substr(href.lastIndexOf('/') + 1);
            new ClientAjax.Article.Get().ajax({ id: parseInt(_self.id) })
            .done(function(res) {
                debugger;
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result
                _self.setTitle(result.title);
                _self.setContent(result.content);
            });
            _self.getSaveBtn().click(() => {
                GoTo.editArticle(_self.id);
            });
        });
    }
}


declare var guiName;

if (guiName == 'EmbedEditArticle') {
    new EmbedEditArticleGui();
}