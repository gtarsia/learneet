import Gui = require('./../gui')
import ajax = require('./../client-ajax')
import baseAjax = require('./../../common/base-ajax')

export class ScoreArrow extends Gui {
    bothImages;
    offImage;
    onImage;
    isTurnedOn;
    constructor(classImageSelector: string, offImageSelector: string, onImageSelector: string) {
        super();
        this.isTurnedOn = false;
        this.bothImages = this.propertize(classImageSelector);
        this.offImage = this.propertize(offImageSelector);
        this.onImage = this.propertize(onImageSelector);
    }
    toggle() {
        if (this.isTurnedOn) this.turnOff();
        else this.turnOn();
    }
    turnOff() {
        this.isTurnedOn = false;
        this.onImage.jq.hide();
        this.offImage.jq.show();
    }
    turnOn() {
        this.isTurnedOn = true;
        this.onImage.jq.show();
        this.offImage.jq.hide();
    }
}

export class UpScore extends ScoreArrow {
    constructor() {
        super('.up-score', '#up-score-off', '#up-score-on')
    } 
}

export class DownScore extends ScoreArrow {
    constructor() {
        super('.down-score', '#down-score-off', '#down-score-on');
    }
}

export class Score extends Gui {
    score;
    constructor() {
        super();
        this.score = this.propertize('#article-score', 'html');
    }
    set(args: {article: {score: Number}}) {
        this.score.val = args.article.score;
    }
}

export class ArticleScore {
    article : {id: string};
    upScore : UpScore;
    downScore : DownScore;
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
        if (this.upScore.isTurnedOn) {
            this.upScore.turnOff();
        }
        else {
            this.upScore.turnOn();
            this.downScore.turnOff();
        }
        var p;
        if (this.upScore.isTurnedOn)
            p = ajax.score.upVote({article: this.article});
        else p = ajax.score.removeUpVote({article: this.article});
        p.done(() => {
            this.fetchScore();
        })
    }
    downScoreClick() {
        if (this.downScore.isTurnedOn) {
            this.downScore.turnOff();
        }
        else {
            this.downScore.turnOn();
            this.upScore.turnOff();
        }
        var p;
        if (this.downScore.isTurnedOn)
            p = ajax.score.downVote({article: this.article});
        else p = ajax.score.removeDownVote({article: this.article});
        p.done(() => {
            this.fetchScore();
        })
    }
    constructor(article: {id: string}) {
        var _self = this;
        this.article = article;
        this.upScore = new UpScore();
        this.downScore = new DownScore();
        this.score = new Score()
        this.upScore.bothImages.jq.click(() => {
            _self.upScoreClick();
        });
        this.downScore.bothImages.jq.click(() => {
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
