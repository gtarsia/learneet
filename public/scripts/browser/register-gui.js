var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require('./gui');
var clientAjax = require('./client-ajax');

var RegisterGui = (function (_super) {
    __extends(RegisterGui, _super);
    function RegisterGui() {
        _super.call(this);
        var _self = this;
        $(document).ready(function () {
            _self.getRegisterBtn().click(function () {
                var user = _self.getUser();
                new clientAjax.user.Register().ajax(user);
                console.log('Tried to register');
            });
        });
    }
    RegisterGui.prototype.getRegisterBtn = function () {
        return $("button#register");
    };
    RegisterGui.prototype.getUsername = function () {
        return $("input#username");
    };
    RegisterGui.prototype.getPassword = function () {
        return $("input#password");
    };
    RegisterGui.prototype.getEmail = function () {
        return $("input#email");
    };
    RegisterGui.prototype.validateUsername = function () {
    };
    RegisterGui.prototype.validate = function () {
    };
    RegisterGui.prototype.getUser = function () {
        return {};
    };
    return RegisterGui;
})(Gui);

if (guiName == 'RegisterGui') {
    gui = new RegisterGui();
}
//# sourceMappingURL=register-gui.js.map
