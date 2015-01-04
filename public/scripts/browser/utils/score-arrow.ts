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

export class UpScoreArrow extends ScoreArrow {
    constructor() {
        super('.up-score', '#up-score-off', '#up-score-on')
    } 
}

export class DownScoreArrow extends ScoreArrow {
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

export class UpScore {
    article : {id: string};
    upScore : UpScoreArrow;
    score;
    fetchScore(): any {
        throw new Error('Abstract method');
    }
    updateScore() {
        this.fetchScore()
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
        }
        var p;
        if (this.upScore.isTurnedOn)
            p = ajax.score.upVote({article: this.article});
        else p = ajax.score.removeUpVote({article: this.article});
        p.done(() => {
            this.updateScore();
        })
    }
    constructor(article: {id: string}) {
        var _self = this;
        this.article = article;
        this.upScore = new UpScoreArrow();
        this.score = new Score()
        this.upScore.bothImages.jq.click(() => {
            _self.upScoreClick();
        });
        _self.updateScore();
        $(document).ready(() => {
            ajax.score.getByUser({
                article: {id: _self.article.id},
                user: {id: '1'}
            })
            .done((res) => {
                var article = res.result.article;
                if (article.score == 1) _self.upScore.turnOn();
                //else if (article.score == -1) _self.downScore.turnOn();
            });
        });
    }
}

export class ArticleScore extends UpScore {
    downScore : DownScoreArrow;
    score;
    fetchScore() {
        return ajax.score.get({
            article: {id: this.article.id}
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
        super(article);
        this.upScore.bothImages.jq.unbind('click');
        var _self = this;
        this.article = article;
        this.downScore = new DownScoreArrow();
        this.downScore.bothImages.jq.click(() => {
            _self.downScoreClick();
        });
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

export class ChangeScore extends UpScore {

}