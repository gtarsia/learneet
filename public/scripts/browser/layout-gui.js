var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require("./gui");

var LoggedHeaderGui = require('./header/logged-header-gui');

var LayoutGui = (function (_super) {
    __extends(LayoutGui, _super);
    function LayoutGui() {
        _super.call(this);
        this.logo = this.propertize('#logo');
        var _self = this;
        if (userId)
            header = new LoggedHeaderGui();
        $(document).ready(function () {
            if (singlePageApp.started)
                _self.logo.transitionURL('/');
        });
    }
    return LayoutGui;
})(Gui);

layoutGui = new LayoutGui();

module.exports = LayoutGui;
//# sourceMappingURL=layout-gui.js.map
