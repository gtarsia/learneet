var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./gui');

var Partial = (function (_super) {
    __extends(Partial, _super);
    function Partial(partialSel) {
        _super.call(this);
        this.main = this.propertize(partialSel);
        var _self = this;
        $(document).ready(function () {
            _self.main.jq.show();
            _self.main.jq.velocity({ opacity: 0 }, { duration: 0 });
            _self.main.jq.velocity({ opacity: 1 }, { duration: 500 });
        });
    }
    return Partial;
})(Gui);

module.exports = Partial;
//# sourceMappingURL=partial.js.map
