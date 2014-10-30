import Gui = require('./gui');
import clientAjax = require('./client-ajax')

export interface Validation {
    ok: Boolean; why: string[];
}

class RegisterGui extends Gui {
    registerBtn;
    username;
    password;
    email;
    form
    validateUsername() {
    }
    validate() {
    }
    getUser() {
        return {
            username: this.username.val,
            password: this.password.val,
            email: this.email.val
        }
    }
    constructor() {
        super();
        var _self = this;
        _self.registerBtn = _self.propertize('button#register');
        _self.username = _self.propertize('input#username', 'val');
        _self.password = _self.propertize('input#password', 'val');
        _self.email = _self.propertize('input#email', 'val');
        _self.form = _self.propertize('form.form-inner');
        $(document).ready(() => {
            _self.username.jq.focus();
            _self.form.jq.submit((event) => {
                event.preventDefault();
                var user = _self.getUser();
                clientAjax.user.register(user)
                .done((res) => {
                    if (!res.ok) {
                        console.log('Couldn\'t register because ' + res.why);
                        return;
                    }
                    _self.redirect('/');
                });
            });
        });
    }
}

declare var guiName;
declare var gui;

if (guiName == 'RegisterGui') {
    gui = new RegisterGui();
}