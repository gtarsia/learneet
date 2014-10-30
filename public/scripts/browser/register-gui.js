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
        _self.registerBtn = _self.propertize('button#register');
        _self.username = _self.propertize('input#username', 'val');
        _self.password = _self.propertize('input#password', 'val');
        _self.email = _self.propertize('input#email', 'val');
        _self.form = _self.propertize('form.form-inner');
        $(document).ready(function () {
            _self.username.jq.focus();
            _self.form.jq.submit(function (event) {
                event.preventDefault();
                var user = _self.getUser();
                clientAjax.user.register(user).done(function (res) {
                    if (!res.ok) {
                        console.log('Couldn\'t register because ' + res.why);
                        return;
                    }
                    _self.redirect('/');
                });
            });
        });
    }
    RegisterGui.prototype.validateUsername = function () {
    };
    RegisterGui.prototype.validate = function () {
    };
    RegisterGui.prototype.getUser = function () {
        return {
            username: this.username.val,
            password: this.password.val,
            email: this.email.val
        };
    };
    return RegisterGui;
})(Gui);

if (guiName == 'RegisterGui') {
    gui = new RegisterGui();
}
//# sourceMappingURL=register-gui.js.map
