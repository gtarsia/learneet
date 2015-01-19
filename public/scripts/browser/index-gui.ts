import clientAjax = require("./client-ajax");
import baseAjax = require('./../common/base-ajax');
import baseArticle = baseAjax.article;
import url = require("./../common/url");
import SinglePageGui = require("./single-page-gui");
import Gui = require("./gui");
import render = require('./utils/render');

//$.template('<div><img src="${url}" />${name}</div>');
var base = '.index.partial ';

class IndexGui extends SinglePageGui {
    createBtn = this.propertize(base + "button.create");
    articleThumbs = this.propertize(base + '.article-thumbs');
    articleThumbTemplate = this.propertize(base + '#article-thumb-template')
    articleThumbsLinks = this.propertize(base + '.article-thumb a');
    setThumbs(html: string) {
        //$(".childContainer").append(html);
    }
    buildArticleThumbsTemplate(articles: baseAjax.Fields[]) {
        return articles.toString();
    }
    constructor() {
        super(base);
        this.titleDeferred.resolve('Learneet');
        var _self = this;
        _self.articleThumbs.jq.empty();
        $(document).ready(function() {
            _self.createBtn.transitionURL(url.article.create());
            clientAjax.article.getAll({})
            .done(function(res) {
                _self.articleThumbs.jq.empty();
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var articles: any = res.result;
                var _articles = [];
                var length = articles.length;
                for (var i = 0; i < length; i++) {
                    var article = articles[i];
                    if (!article) continue;
                    if (!article.content)  continue;
                    article.url = url.article.get(article.id);
                    var s = article.content.substr(0, 150) + '...';
                    article.content = render.toKatex(s);
                    _articles.push(article);
                }
                var template = $("#article-thumb-template").html();
                Mustache.parse(template);   // optional, speeds up future uses
                var rendered = Mustache.render(template, 
                    { articles: _articles});
                _self.articleThumbs.jq.html(rendered);
                _self.articleThumbsLinks.transitionURL('');
                $('.article-thumb').velocity({opacity: 0}, {duration: 0});
                $.each($('.article-thumb'), function(i, el){
                    setTimeout(function(){
                       $(el).velocity({
                        opacity: 1.0, translateX: '100px'
                       }, 250);
                    }, ( i * 100 ));
                    
                });
                //$("#main .childContainer").html(rendered);
            });
        });
    }
}

export = IndexGui;