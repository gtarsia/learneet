import Gui = require('./../gui')
import clientAjax = require('./../client-ajax')
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

export class UpScoreArrow extends ScoreArrow {
    constructor(arrowSelector: string) {
        super(arrowSelector, '/images/up-score.png', '/images/up-score-hover.png')
    } 
}

export class DownScoreArrow extends ScoreArrow {
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
    upScoreArrow;
    downScoreArrow;
    score;
    constructor(selectors: {up: string; down: string; score: string },
        article: {id: string}) {
        var _self = this;
        this.article = article;
        this.upScoreArrow = new UpScoreArrow(selectors.up);
        this.downScoreArrow = new DownScoreArrow(selectors.down);
        this.score = new Score(selectors.score)
        this.upScoreArrow.arrow.jq.click(() => {
            if (_self.downScoreArrow.isTurnedOn && 
                !_self.upScoreArrow.isTurnedOn)
                _self.downScoreArrow.turnOff();
            _self.upScoreArrow.toggle();
        });
        this.downScoreArrow.arrow.jq.click(() => {
            if (_self.upScoreArrow.isTurnedOn && !_self.downScoreArrow.isTurnedOn)
                _self.upScoreArrow.turnOff();
            _self.downScoreArrow.toggle();
        });
        clientAjax.article.getScore({
            article: {id: _self.article.id}
        })
        .done((res : baseAjax.JsonReturn<{article: {score: Number}}>) => {
            _self.score.set(res.result)
        })
    }
}
