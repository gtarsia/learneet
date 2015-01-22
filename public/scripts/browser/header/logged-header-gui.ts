import Gui = require("./../gui");
import url = require('./../../common/url');

declare var headerName;

var base = '#rightHeader '

class LoggedHeaderGui extends Gui {
    avatar = this.propertize(base + '#avatar');
    constructor() {
        super();
        var _self = this;
        $(document).ready(() => {
            _self.redirect('/');
            _self.avatar.transitionURL(url.user.get());
        });
    }
}

