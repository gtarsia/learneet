var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require("./../gui");

var LoggedHeaderGui = (function (_super) {
    __extends(LoggedHeaderGui, _super);
    function LoggedHeaderGui() {
        _super.call(this);
        var _self = this;
        $(document).ready(function () {
            _self.redirect('/');
        });
    }
    return LoggedHeaderGui;
})(Gui);

if (headerName = 'LoggedHeaderGui')
    new HeaderGui();
//# sourceMappingURL=logged-header-gui.js.map
