import Gui = require('./gui');
import clientAjax = require('./client-ajax')

export interface Validation {
    ok: Boolean; why: string[];
}

class LogInGui extends Gui {
    username;
    password;
    loginBtn;
    form;
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
        _self.form = _self.propertize('form.form-inner');
        $(document).ready(() => {
            _self.form.jq.submit((event) => {
                event.preventDefault();
                var user = _self.getUser();
                clientAjax.user.auth(user)
                .done((res) => {
                    console.log('Logged in');
                    _self.redirect('/');
                })
                .fail((res) => {
                    console.log('Couldn\'t log');
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