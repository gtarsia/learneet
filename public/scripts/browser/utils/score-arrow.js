var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ScoreArrow = (function () {
    function ScoreArrow(offImageUrl, onImageUrl) {
    }
    ScoreArrow.prototype.turnOff = function () {
    };
    ScoreArrow.prototype.turnOn = function () {
    };
    return ScoreArrow;
})();
exports.ScoreArrow = ScoreArrow;

var UpScoreArrow = (function (_super) {
    __extends(UpScoreArrow, _super);
    function UpScoreArrow() {
        _super.call(this, '/images/up-score.png', '/images/down-score.png');
    }
    return UpScoreArrow;
})(ScoreArrow);
exports.UpScoreArrow = UpScoreArrow;

var DownScoreArrow = (function (_super) {
    __extends(DownScoreArrow, _super);
    function DownScoreArrow() {
    }
    return DownScoreArrow;
})(ScoreArrow);
exports.DownScoreArrow = DownScoreArrow;
//# sourceMappingURL=score-arrow.js.map
