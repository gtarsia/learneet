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
            clientAjax.article.getAllThumbs({})
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
                    var el = articles[i];
                    if (!el || !el.article || !el.article.content)
                        continue;
                    el.article.url = url.article.get(el.article.id);
                    el.article.content = render.toKatex(el.article.content);
                    _articles.push(el);
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