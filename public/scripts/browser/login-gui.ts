import Gui = require('./gui');
import clientAjax = require('./client-ajax')

export interface Validation {
    ok: Boolean; why: string[];
}

class LogInGui extends Gui {
    username;
    password;
    loginBtn;
    getUser() {
        return {
            username: this.username.val,
            password: this.password.val,
        }
    }
    constructor() {
        super();
        var _self = this;
        _self.loginBtn = _self.propertize('button#login');
        _self.username = _self.propertize('input#username', 'val');
        _self.password = _self.propertize('input#password', 'val');
        $(document).ready(() => {
            _self.loginBtn.jq.click(() => {
                var user = _self.getUser();
                clientAjax.user.auth(user)
                .done((res) => {
                    console.log('Tried to login and was ' + res.result);
                    if (!res.ok) console.log('It wasn\'t ok because ' + res.why);

                })
            });
        });
    }
}

declare var guiName;
declare var gui;

if (guiName == 'LogInGui') {
    gui = new LogInGui();
}