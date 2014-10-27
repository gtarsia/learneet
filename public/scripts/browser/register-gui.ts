import Gui = require('./gui');

class RegisterGui extends Gui {
    getRegisterBtn() {
        return $("button#register");
    }
    constructor() {
        super();
        var _self = this;
        $(document).ready(() => {
            _self.getRegisterBtn().click(() => {
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