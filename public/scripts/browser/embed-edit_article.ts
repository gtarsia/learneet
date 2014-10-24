import ClientAjax = require("./client-ajax");
import GoTo = ClientAjax.GoTo;


export class EmbedEditArticleGui {
    id: string = "-1";
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