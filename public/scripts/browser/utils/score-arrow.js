var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./../gui');
var ajax = require('./../client-ajax');

var ScoreArrow = (function (_super) {
    __extends(ScoreArrow, _super);
    function ScoreArrow(classImageSelector, offImageSelector, onImageSelector) {
        _super.call(this);
        this.isTurnedOn = false;
        this.bothImages = this.propertize(classImageSelector);
        this.offImage = this.propertize(offImageSelector);
        this.onImage = this.propertize(onImageSelector);
    }
    ScoreArrow.prototype.toggle = function () {
        if (this.isTurnedOn)
            this.turnOff();
        else
            this.turnOn();
    };
    ScoreArrow.prototype.turnOff = function () {
        this.isTurnedOn = false;
        this.onImage.jq.hide();
        this.offImage.jq.show();
    };
    ScoreArrow.prototype.turnOn = function () {
        this.isTurnedOn = true;
        this.onImage.jq.show();
        this.offImage.jq.hide();
    };
    return ScoreArrow;
})(Gui);
exports.ScoreArrow = ScoreArrow;

var UpScoreArrow = (function (_super) {
    __extends(UpScoreArrow, _super);
    function UpScoreArrow() {
        _super.call(this, '.up-score', '#up-score-off', '#up-score-on');
    }
    return UpScoreArrow;
})(ScoreArrow);
exports.UpScoreArrow = UpScoreArrow;

var DownScoreArrow = (function (_super) {
    __extends(DownScoreArrow, _super);
    function DownScoreArrow() {
        _super.call(this, '.down-score', '#down-score-off', '#down-score-on');
    }
    return DownScoreArrow;
})(ScoreArrow);
exports.DownScoreArrow = DownScoreArrow;

var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        _super.call(this);
        this.score = this.propertize('#article-score', 'html');
    }
    Score.prototype.set = function (score) {
        this.score.val = score;
    };
    return Score;
})(Gui);
exports.Score = Score;

var UpScore = (function () {
    function UpScore() {
        var _self = this;
        this.upScore = new UpScoreArrow();
        this.score = new Score();
        this.upScore.bothImages.jq.click(function () {
            _self.upScoreClick();
        });
        _self.updateScore();
        $(document).ready(function () {
            _self.fetchScoreByUser().done(function (score) {
                if (score == 1)
                    _self.upScore.turnOn();
            });
        });
    }
    UpScore.prototype._abstract = function () {
        throw new Error('Abstract method');
    };
    UpScore.prototype.fetchScore = function () {
        return this._abstract();
    };
    UpScore.prototype.fetchScoreByUser = function () {
        return this._abstract();
    };
    UpScore.prototype.upVote = function () {
        return this._abstract();
    };
    UpScore.prototype.removeUpVote = function () {
        return this._abstract();
    };
    UpScore.prototype.updateScore = function () {
        var _this = this;
        this.fetchScore().done(function (score) {
            _this.score.set(score);
        });
    };
    UpScore.prototype.upScoreClick = function () {
        var _this = this;
        if (this.upScore.isTurnedOn) {
            this.upScore.turnOff();
        } else {
            this.upScore.turnOn();
        }
        var p;
        if (this.upScore.isTurnedOn)
            p = this.upVote();
        else
            p = this.removeUpVote();
        p.done(function () {
            _this.updateScore();
        });
    };
    return UpScore;
})();
exports.UpScore = UpScore;

var UpDownScore = (function () {
    function UpDownScore() {
        var _self = this;
        this.upScore = new UpScoreArrow();
        this.downScore = new DownScoreArrow();
        this.score = new Score();
        this.upScore.bothImages.jq.click(function () {
            _self.upScoreClick();
        });
        this.downScore.bothImages.jq.click(function () {
            _self.downScoreClick();
        });
        _self.updateScore();
        $(document).ready(function () {
            _self.fetchScoreByUser().done(function (score) {
                if (score == 1)
                    _self.upScore.turnOn();
                else if (score == -1)
                    _self.downScore.turnOn();
            });
        });
    }
    UpDownScore.prototype._abstract = function () {
        throw new Error('Abstract method');
    };
    UpDownScore.prototype.fetchScore = function () {
        this._abstract();
    };
    UpDownScore.prototype.fetchScoreByUser = function () {
        this._abstract();
    };
    UpDownScore.prototype.upVote = function () {
        this._abstract();
    };
    UpDownScore.prototype.removeUpVote = function () {
        this._abstract();
    };
    UpDownScore.prototype.downVote = function () {
        this._abstract();
    };
    UpDownScore.prototype.removeDownVote = function () {
        this._abstract();
    };
    UpDownScore.prototype.updateScore = function () {
        var _this = this;
        this.fetchScore().done(function (score) {
            _this.score.set(score);
        });
    };
    UpDownScore.prototype.upScoreClick = function () {
        var _this = this;
        if (this.upScore.isTurnedOn) {
            this.upScore.turnOff();
        } else {
            this.upScore.turnOn();
            this.downScore.turnOff();
        }
        var p;
        if (this.upScore.isTurnedOn)
            p = this.upVote();
        else
            p = this.removeUpVote();
        p.done(function () {
            _this.updateScore();
        });
    };
    UpDownScore.prototype.downScoreClick = function () {
        var _this = this;
        if (this.downScore.isTurnedOn) {
            this.downScore.turnOff();
        } else {
            this.downScore.turnOn();
            this.upScore.turnOff();
        }
        var p;
        if (this.downScore.isTurnedOn)
            p = this.downVote();
        else
            p = this.removeDownVote();
        p.done(function () {
            _this.updateScore();
        });
    };
    return UpDownScore;
})();
exports.UpDownScore = UpDownScore;

var ArticleScore = (function (_super) {
    __extends(ArticleScore, _super);
    function ArticleScore(article) {
        this.article = article;
        _super.call(this);
    }
    ArticleScore.prototype.fetchScore = function () {
        var _self = this;
        return ajax.score.get({
            article: { id: _self.article.id }
        }).then(function (res) {
            return res.result.article.score;
        });
    };
    ArticleScore.prototype.fetchScoreByUser = function () {
        return ajax.score.getByUser({
            article: { id: this.article.id }
        }).then(function (res) {
            return res.result.article.score;
        });
    };
    ArticleScore.prototype.upVote = function () {
        return ajax.score.upVote({ article: this.article });
    };
    ArticleScore.prototype.removeUpVote = function () {
        return ajax.score.removeUpVote({ article: this.article });
    };
    ArticleScore.prototype.downVote = function () {
        return ajax.score.downVote({ article: this.article });
    };
    ArticleScore.prototype.removeDownVote = function () {
        return ajax.score.removeDownVote({ article: this.article });
    };
    return ArticleScore;
})(UpDownScore);
exports.ArticleScore = ArticleScore;

var ChangeScore = (function (_super) {
    __extends(ChangeScore, _super);
    function ChangeScore(article, change) {
        this.article = article;
        this.change = change;
        _super.call(this);
    }
    ChangeScore.prototype.fetchScore = function () {
        return ajax.changes.getScore({
            article: { id: this.article.id },
            score: { id: this.change.id }
        }).then(function (res) {
            return res.result.change.score;
        });
    };
    ChangeScore.prototype.fetchScoreByUser = function () {
        return ajax.changes.getScoreByUser({
            article: { id: this.article.id },
            score: { id: this.change.id }
        }).then(function (res) {
            return res.result.change.score;
        });
    };
    ChangeScore.prototype.upVote = function () {
        return this._abstract();
    };
    ChangeScore.prototype.removeUpVote = function () {
        return this._abstract();
    };
    return ChangeScore;
})(UpScore);
exports.ChangeScore = ChangeScore;
//# sourceMappingURL=score-arrow.js.map
