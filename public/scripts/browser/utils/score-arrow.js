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
    function ScoreArrow(arrowSelector, offImageUrl, onImageUrl) {
        _super.call(this);
        this.isTurnedOn = false;
        this.arrow = this.propertize(arrowSelector);
        this.offImageUrl = offImageUrl;
        this.onImageUrl = onImageUrl;
    }
    ScoreArrow.prototype.changeImage = function (url) {
        var _self = this;
        _self.arrow.jq.attr('src', url);
    };
    ScoreArrow.prototype.toggle = function () {
        if (this.isTurnedOn)
            this.turnOff();
        else
            this.turnOn();
    };
    ScoreArrow.prototype.turnOff = function () {
        this.isTurnedOn = false;
        this.changeImage(this.offImageUrl);
    };
    ScoreArrow.prototype.turnOn = function () {
        this.isTurnedOn = true;
        this.changeImage(this.onImageUrl);
    };
    return ScoreArrow;
})(Gui);
exports.ScoreArrow = ScoreArrow;

var upScore = (function (_super) {
    __extends(upScore, _super);
    function upScore(arrowSelector) {
        _super.call(this, arrowSelector, '/images/up-score.png', '/images/up-score-hover.png');
    }
    return upScore;
})(ScoreArrow);
exports.upScore = upScore;

var downScore = (function (_super) {
    __extends(downScore, _super);
    function downScore(arrowSelector) {
        _super.call(this, arrowSelector, '/images/down-score.png', '/images/down-score-hover.png');
    }
    return downScore;
})(ScoreArrow);
exports.downScore = downScore;

var Score = (function (_super) {
    __extends(Score, _super);
    function Score(selector) {
        _super.call(this);
        this.score = this.propertize(selector, 'html');
    }
    Score.prototype.set = function (args) {
        this.score.val = args.article.score;
    };
    return Score;
})(Gui);
exports.Score = Score;

var ArticleScore = (function () {
    function ArticleScore(selectors, article) {
        var _self = this;
        this.article = article;
        this.upScore = new upScore(selectors.up);
        this.downScore = new downScore(selectors.down);
        this.score = new Score(selectors.score);
        this.upScore.arrow.jq.click(function () {
            if (_self.downScore.isTurnedOn && !_self.upScore.isTurnedOn)
                _self.downScore.turnOff();
            _self.upScore.toggle();
            if (_self.upScore.isTurnedOn)
                ajax.score.upVote(_self.article);
        });
        this.downScore.arrow.jq.click(function () {
            if (_self.upScore.isTurnedOn && !_self.downScore.isTurnedOn)
                _self.upScore.turnOff();
            _self.downScore.toggle();
            if (_self.downScore.isTurnedOn)
                ajax.score.downVote(_self.article);
        });
        ajax.score.get({
            article: { id: _self.article.id }
        }).done(function (res) {
            _self.score.set(res.result);
        });
        $(document).ready(function () {
            ajax.score.getByUser({
                article: { id: _self.article.id },
                user: { id: '1' }
            }).then(function (res) {
                var article = res.result.article;
                if (article.score == 1)
                    _self.upScore.turnOn();
                else if (article.score == -1)
                    _self.downScore.turnOn();
            });
        });
    }
    return ArticleScore;
})();
exports.ArticleScore = ArticleScore;
//# sourceMappingURL=score-arrow.js.map
