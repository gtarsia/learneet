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
    set(score) {
        this.score.val = score;
    }
}

export class UpScore {
    upScore : UpScoreArrow;
    score;
    _abstract(): any { throw new Error('Abstract method' ) }
    fetchScore(): any { return this._abstract() }
    fetchScoreByUser(): any { return this._abstract() }
    upVote() : any { return this._abstract() }
    removeUpVote() : any { return this._abstract() }
    updateScore() {
        this.fetchScore()
        .done(score => {
            this.score.set(score)
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
            p = this.upVote();
        else p = this.removeUpVote();
        p.done(() => {
            this.updateScore();
        })
    }
    constructor() {
        var _self = this;
        this.upScore = new UpScoreArrow();
        this.score = new Score()
        this.upScore.bothImages.jq.click(() => {
            _self.upScoreClick();
        });
        _self.updateScore();
        $(document).ready(() => {
            _self.fetchScoreByUser()
            .done(score => {
                if (score == 1) _self.upScore.turnOn();
                //else if (article.score == -1) _self.downScore.turnOn();
            });
        });
    }
}

export class UpDownScore {
    upScore : UpScoreArrow;
    downScore : DownScoreArrow;
    score;
    _abstract() { throw new Error('Abstract method'); }
    fetchScore(): any { this._abstract(); }
    fetchScoreByUser(): any { this._abstract(); }
    upVote(): any { this._abstract(); }
    removeUpVote(): any { this._abstract(); }
    downVote(): any { this._abstract(); }
    removeDownVote(): any { this._abstract(); }
    updateScore() {
        this.fetchScore()
        .done(score => {
            this.score.set(score)
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
            p = this.upVote();
        else p = this.removeUpVote();
        p.done(() => {
            this.updateScore();
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
            p = this.downVote();
        else p = this.removeDownVote();
        p.done(() => {
            this.updateScore();
        })
    }
    constructor() {
        var _self = this;
        this.upScore = new UpScoreArrow();
        this.downScore = new DownScoreArrow();
        this.score = new Score()
        this.upScore.bothImages.jq.click(() => {
            _self.upScoreClick();
        });
        this.downScore.bothImages.jq.click(() => {
            _self.downScoreClick();
        });
        _self.updateScore();
        $(document).ready(() => {
            _self.fetchScoreByUser()
            .done(score => {
                if (score == 1) _self.upScore.turnOn();
                else if (score == -1) _self.downScore.turnOn();
            });
        });
    }
}

export class ArticleScore extends UpDownScore {
    article: {id: string};
    constructor(article: {id: string}) {
        this.article = article;
        super();
    }
    fetchScore(): any {
        var _self = this;
        return ajax.score.get({
            article: {id: _self.article.id}
        })
        .then(res => {
            return res.result.article.score
        });
    }
    fetchScoreByUser(): any {
        return ajax.score.getByUser({
            article: {id: this.article.id}
        })
        .then(res => {
            return res.result.article.score
        });
    }
    upVote(): any { 
        return ajax.score.upVote({article: this.article});
    }
    removeUpVote(): any { 
        return ajax.score.removeUpVote({article: this.article}); 
    }
    downVote(): any { 
        return ajax.score.downVote({article: this.article}); 
    }
    removeDownVote(): any { 
        return ajax.score.removeDownVote({article: this.article}); 
    }
}

export class ChangeScore extends UpScore {
    article: {id: string};
    change: {id: string};
    constructor(article: {id: string}, change: {id: string}) {
        this.article = article;
        this.change = change;
        super();
    }
    fetchScore(): any {
        return ajax.changes.getScore({
            article: {id: this.article.id},
            score: {id: this.change.id}
        })
        .then(res => {
            return res.result.change.score
        });
    }
    fetchScoreByUser(): any { 
        return ajax.changes.getScoreByUser({
            article: {id: this.article.id},
            score: {id: this.change.id}
        })
        .then(res => {
            return res.result.change.score
        });
    }
    upVote() : any { 
        return this._abstract() 
    }
    removeUpVote() : any { 
        return this._abstract() 
    }
}