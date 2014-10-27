var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./gui');

var RegisterGui = (function (_super) {
    __extends(RegisterGui, _super);
    function RegisterGui() {
        _super.call(this);
        var _self = this;
        $(document).ready(function () {
            _self.getRegisterBtn().click(function () {
                console.log('Tried to register');
            });
        });
    }
    RegisterGui.prototype.getRegisterBtn = function () {
        return $("button#register");
    };
    return RegisterGui;
})(Gui);

if (guiName == 'RegisterGui') {
    gui = new RegisterGui();
}
//# sourceMappingURL=register-gui.js.map
