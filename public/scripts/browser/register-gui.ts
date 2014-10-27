import Gui = require('./gui');
import clientAjax = require('./client-ajax')

export interface Validation {
    ok: Boolean; why: string[];
}

class RegisterGui extends Gui {
    getRegisterBtn() {
        return $("button#register");
    }
    getUsername() {
        return $("input#username");
    }
    getPassword() {
        return $("input#password");
    }
    getEmail() {
        return $("input#email");
    }
    validateUsername() {

    }
    validate() {
    }
    getUser() {
        return {

        }
    }
    constructor() {
        super();
        var _self = this;
        $(document).ready(() => {
            _self.getRegisterBtn().click(() => {
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