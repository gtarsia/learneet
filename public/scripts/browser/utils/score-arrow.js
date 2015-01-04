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
    Score.prototype.set = function (args) {
        this.score.val = args.article.score;
    };
    return Score;
})(Gui);
exports.Score = Score;

var UpScore = (function () {
    function UpScore(article) {
        var _self = this;
        this.article = article;
        this.upScore = new UpScoreArrow();
        this.score = new Score();
        this.upScore.bothImages.jq.click(function () {
            _self.upScoreClick();
        });
        _self.updateScore();
        $(document).ready(function () {
            ajax.score.getByUser({
                article: { id: _self.article.id },
                user: { id: '1' }
            }).done(function (res) {
                var article = res.result.article;
                if (article.score == 1)
                    _self.upScore.turnOn();
            });
        });
    }
    UpScore.prototype.fetchScore = function () {
        throw new Error('Abstract method');
    };
    UpScore.prototype.updateScore = function () {
        var _this = this;
        this.fetchScore().done(function (res) {
            _this.score.set(res.result);
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
            p = ajax.score.upVote({ article: this.article });
        else
            p = ajax.score.removeUpVote({ article: this.article });
        p.done(function () {
            _this.updateScore();
        });
    };
    return UpScore;
})();
exports.UpScore = UpScore;

var ArticleScore = (function (_super) {
    __extends(ArticleScore, _super);
    function ArticleScore(article) {
        _super.call(this, article);
        this.upScore.bothImages.jq.unbind('click');
        var _self = this;
        this.article = article;
        this.downScore = new DownScoreArrow();
        this.downScore.bothImages.jq.click(function () {
            _self.downScoreClick();
        });
        $(document).ready(function () {
            ajax.score.getByUser({
                article: { id: _self.article.id },
                user: { id: '1' }
            }).done(function (res) {
                var article = res.result.article;
                if (article.score == 1)
                    _self.upScore.turnOn();
                else if (article.score == -1)
                    _self.downScore.turnOn();
            });
        });
    }
    ArticleScore.prototype.fetchScore = function () {
        return ajax.score.get({
            article: { id: this.article.id }
        });
    };
    ArticleScore.prototype.upScoreClick = function () {
        var _this = this;
        if (this.upScore.isTurnedOn) {
            this.upScore.turnOff();
        } else {
            this.upScore.turnOn();
            this.downScore.turnOff();
        }
        var p;
        if (this.upScore.isTurnedOn)
            p = ajax.score.upVote({ article: this.article });
        else
            p = ajax.score.removeUpVote({ article: this.article });
        p.done(function () {
            _this.fetchScore();
        });
    };
    ArticleScore.prototype.downScoreClick = function () {
        var _this = this;
        if (this.downScore.isTurnedOn) {
            this.downScore.turnOff();
        } else {
            this.downScore.turnOn();
            this.upScore.turnOff();
        }
        var p;
        if (this.downScore.isTurnedOn)
            p = ajax.score.downVote({ article: this.article });
        else
            p = ajax.score.removeDownVote({ article: this.article });
        p.done(function () {
            _this.fetchScore();
        });
    };
    return ArticleScore;
})(UpScore);
exports.ArticleScore = ArticleScore;

var ChangeScore = (function (_super) {
    __extends(ChangeScore, _super);
    function ChangeScore() {
        _super.apply(this, arguments);
    }
    return ChangeScore;
})(UpScore);
exports.ChangeScore = ChangeScore;
//# sourceMappingURL=score-arrow.js.map
