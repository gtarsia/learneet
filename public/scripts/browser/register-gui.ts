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
    validateUsername() {
    }
    validate() {
    }
    getUser() {
    }
    constructor() {
        super();
        var _self = this;
        _self.registerBtn = _self.propertize('button#register');
        _self.username = _self.propertize('input#username', 'val');
        _self.password = _self.propertize('input#password', 'val');
        _self.email = _self.propertize('input#email', 'val');
        $(document).ready(() => {
            _self.registerBtn.jq.click(() => {
                var user: any = _self.getUser();
                new clientAjax.user.Register().ajax(user)
                console.log('Tried to register');
            });
        });
    }
}

declare var guiName;
declare var gui;

if (guiName == 'RegisterGui') {
    gui = new RegisterGui();
}