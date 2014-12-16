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

var UpScore = (function (_super) {
    __extends(UpScore, _super);
    function UpScore() {
        _super.call(this, '.up-score', '#up-score-off', '#up-score-on');
    }
    return UpScore;
})(ScoreArrow);
exports.UpScore = UpScore;

var DownScore = (function (_super) {
    __extends(DownScore, _super);
    function DownScore() {
        _super.call(this, '.down-score', '#down-score-off', '#down-score-on');
    }
    return DownScore;
})(ScoreArrow);
exports.DownScore = DownScore;

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

var ArticleScore = (function () {
    function ArticleScore(article) {
        var _self = this;
        this.article = article;
        this.upScore = new UpScore();
        this.downScore = new DownScore();
        this.score = new Score();
        this.upScore.bothImages.jq.click(function () {
            _self.upScoreClick();
        });
        this.downScore.bothImages.jq.click(function () {
            _self.downScoreClick();
        });
        _self.fetchScore();
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
        var _this = this;
        ajax.score.get({
            article: { id: this.article.id }
        }).done(function (res) {
            _this.score.set(res.result);
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
})();
exports.ArticleScore = ArticleScore;
//# sourceMappingURL=score-arrow.js.map
