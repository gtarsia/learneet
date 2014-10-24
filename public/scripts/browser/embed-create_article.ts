import utils = require("./Utils");
import ClientAjax = require("./client-ajax");

class EmbedCreateArticleGui {
    getContent(): string {
        return $("#content").val();
    }
    getTitle(): string {
        return $("#title").val();
    }
    constructor() {
        var _this = this;
        $(document).ready(function () {
            console.log("ready!");
            $("#create").click(() => {
                debugger;
                console.log('Creando artículo');
                new ClientAjax.Article.Create().ajax(
                { content: _this.getContent(), title: _this.getTitle() })
                .done(function(res) {
                    console.log(res);
                });
            });
        })

    }
}
declare var guiName;
if (guiName == 'EmbedCreateArticle') {
    new EmbedCreateArticleGui();
}