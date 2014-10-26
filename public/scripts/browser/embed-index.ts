import ClientAjax = require("./client-ajax");
import CommonAjax = require('./../common/common-ajax');
import Article = CommonAjax.Article;
import url = require("./../common/url");
import Gui = require("./embed-gui");

//$.template('<div><img src="${url}" />${name}</div>');

class EmbedIndexGui extends Gui {
    setThumbs(html: string) {
        //$(".childContainer").append(html);
    }
    buildArticleThumbsTemplate(articles: Article.Fields[]) {
        return articles.toString();
    }
    constructor() {
        super();
        var _self = this;
        $(document).ready(function() {
            new ClientAjax.Article.GetAll().ajax({})
            .done(function(res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var articles = res.result;
                var length = articles.length;
                for (var i = 0; i < length; i++) {
                    articles[i].url = url.article.get(articles[i].id);
                    articles[i].content = articles[i].content.substr(0, 130) + '...';
                }
                var template = $("#article-thumb-template").html();
                Mustache.parse(template);   // optional, speeds up future uses
                var rendered = Mustache.render(template, 
                    { articles: articles});
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