var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./gui');

var SinglePageGui = (function (_super) {
    __extends(SinglePageGui, _super);
    function SinglePageGui(componentSel) {
        _super.call(this);
        this.base = componentSel;
        this.main = this.propertize(componentSel);
        var _self = this;
        $(document).ready(function () {
            _self.main.jq.show();
            _self.main.jq.velocity({ opacity: 0 }, { duration: 0 });
            _self.main.jq.velocity({ opacity: 1 }, { duration: 300 });
        });
    }
    return SinglePageGui;
})(Gui);

module.exports = SinglePageGui;
//# sourceMappingURL=single-page-gui.js.map
