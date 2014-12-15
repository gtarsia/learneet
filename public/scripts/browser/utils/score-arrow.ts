import Gui = require('./../gui')
import ajax = require('./../client-ajax')
import baseAjax = require('./../../common/base-ajax')

export class ScoreArrow extends Gui {
    arrow;
    offImageUrl;
    onImageUrl;
    isTurnedOn;
    constructor(arrowSelector: string, offImageUrl: string, onImageUrl: string) {
        super();
        this.isTurnedOn = false;
        this.arrow = this.propertize(arrowSelector)
        this.offImageUrl = offImageUrl;
        this.onImageUrl = onImageUrl;
    }
    changeImage(url: string) {
        var _self = this;
        _self.arrow.jq.attr('src', url);
    }
    toggle() {
        if (this.isTurnedOn) this.turnOff();
        else this.turnOn();
    }
    turnOff() {
        this.isTurnedOn = false;
        this.changeImage(this.offImageUrl);
    }
    turnOn() {
        this.isTurnedOn = true;
        this.changeImage(this.onImageUrl);
    }
}

export class upScore extends ScoreArrow {
    constructor(arrowSelector: string) {
        super(arrowSelector, '/images/up-score.png', '/images/up-score-hover.png')
    } 
}

export class downScore extends ScoreArrow {
    constructor(arrowSelector: string) {
        super(arrowSelector, '/images/down-score.png', '/images/down-score-hover.png');
    }
}

export class Score extends Gui {
    score;
    constructor(selector: string) {
        super();
        this.score = this.propertize(selector, 'html');
    }
    set(args: {article: {score: Number}}) {
        this.score.val = args.article.score;
    }
}

export class ArticleScore {
    article : {id: string};
    upScore;
    downScore;
    score;
    fetchScore() {
        ajax.score.get({
            article: {id: this.article.id}
        })
        .done((res : baseAjax.JsonReturn<{article: {score: Number}}>) => {
            this.score.set(res.result)
        })
    }
    upScoreClick() {
        if (this.downScore.isTurnedOn && 
            !this.upScore.isTurnedOn)
            this.downScore.turnOff();
        this.upScore.toggle();
        var p;
        if (this.upScore.isTurnedOn)
            p = ajax.score.upVote({article: this.article});
        else p = ajax.score.removeUpVote({article: this.article});
        p.done(() => {
            this.fetchScore();
        })
    }
    downScoreClick() {
        if (this.upScore.isTurnedOn && !this.downScore.isTurnedOn)
            this.upScore.turnOff();
        this.downScore.toggle();
        if (this.downScore.isTurnedOn)
            ajax.score.downVote({article: this.article});
        this.fetchScore();
    }
    constructor(selectors: {up: string; down: string; score: string },
        article: {id: string}) {
        var _self = this;
        this.article = article;
        this.upScore = new upScore(selectors.up);
        this.downScore = new downScore(selectors.down);
        this.score = new Score(selectors.score)
        this.upScore.arrow.jq.click(() => {
            _self.upScoreClick();
        });
        this.downScore.arrow.jq.click(() => {
            _self.downScoreClick();
        });
        _self.fetchScore();
        $(document).ready(() => {
            ajax.score.getByUser({
                article: {id: _self.article.id},
                user: {id: '1'}
            })
            .done((res) => {
                var article = res.result.article;
                if (article.score == 1) _self.upScore.turnOn();
                else if (article.score == -1) _self.downScore.turnOn();
            });
        });
    }
}
