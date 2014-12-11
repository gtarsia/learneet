var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./../gui');
var clientAjax = require('./../client-ajax');

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

var UpScoreArrow = (function (_super) {
    __extends(UpScoreArrow, _super);
    function UpScoreArrow(arrowSelector) {
        _super.call(this, arrowSelector, '/images/up-score.png', '/images/up-score-hover.png');
    }
    return UpScoreArrow;
})(ScoreArrow);
exports.UpScoreArrow = UpScoreArrow;

var DownScoreArrow = (function (_super) {
    __extends(DownScoreArrow, _super);
    function DownScoreArrow(arrowSelector) {
        _super.call(this, arrowSelector, '/images/down-score.png', '/images/down-score-hover.png');
    }
    return DownScoreArrow;
})(ScoreArrow);
exports.DownScoreArrow = DownScoreArrow;

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
        this.upScoreArrow = new UpScoreArrow(selectors.up);
        this.downScoreArrow = new DownScoreArrow(selectors.down);
        this.score = new Score(selectors.score);
        this.upScoreArrow.arrow.jq.click(function () {
            if (_self.downScoreArrow.isTurnedOn && !_self.upScoreArrow.isTurnedOn)
                _self.downScoreArrow.turnOff();
            _self.upScoreArrow.toggle();
        });
        this.downScoreArrow.arrow.jq.click(function () {
            if (_self.upScoreArrow.isTurnedOn && !_self.downScoreArrow.isTurnedOn)
                _self.upScoreArrow.turnOff();
            _self.downScoreArrow.toggle();
        });
        clientAjax.article.getScore({
            article: { id: _self.article.id }
        }).done(function (res) {
            _self.score.set(res.result);
        });
    }
    return ArticleScore;
})();
exports.ArticleScore = ArticleScore;
//# sourceMappingURL=score-arrow.js.map
