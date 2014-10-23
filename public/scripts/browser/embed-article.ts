import ClientAjax = require("./client-ajax");

export class EmbedArticleGui {
    setContent(content) {
        $("#content").html(content);
    }
    getContent(): string {
        return $("#content").val();
    }
    setTitle(title) {
        $("#title").html(title);
    }
    getTitle(): string {
        throw new Error('Not implemented yet');
    }
    constructor() {
        var href = $(location).attr("href");
        var id: string = href.substr(href.lastIndexOf('/') + 1);
        var _self = this;
        new ClientAjax.Article.Get().ajax({ id: parseInt(id) })
        .done(function(res) {
            if (!res.ok) {
                console.log(res.why);
                return;
            }
            var result = res.result
            _self.setTitle(result.title);
            _self.setContent(result.content)
        });
        /*
        .then((s) => {

        });
*/
        /*;
        $("#edit").click(() => {
            console.log('Creando artículo');
            ClientAjax.m.Article.Create(
                { content: this.getContent(), title: this.getTitle() }, 1)
                .then(function (value) {
                    
                }, function (reason) {

                });
        });
        */
    }
}

declare var guiName;

if (guiName == 'EmbedArticle') {
    new EmbedArticleGui();
}