import ClientAjax = require("./client-ajax");
import CommonAjax = require('./../common/common-ajax');
import Article = CommonAjax.Article;

//$.template('<div><img src="${url}" />${name}</div>');

class EmbedIndexGui {
    setThumbs(html: string) {
        //$(".childContainer").append(html);
    }
    buildArticleThumbsTemplate(articles: Article.Fields[]) {
        return articles.toString();
    }
    constructor() {
        var _self = this;
        $(document).ready(function() {
            new ClientAjax.Article.GetAll().ajax({})
            .done(function(res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
                var template = $("#article-thumb-template").html();
                Mustache.parse(template);   // optional, speeds up future uses
                var rendered = Mustache.render(template, 
                    { articles: result});
                $("#article-thumb-template").remove();
                $("#main .childContainer").html(rendered);
            });
        });
    }
}

declare var guiName;
declare var gui;

if (guiName == 'EmbedIndexGui') {
    gui = new EmbedIndexGui();
}