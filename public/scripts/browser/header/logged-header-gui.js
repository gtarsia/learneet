var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require("./../gui");
var url = require('./../../common/url');

var base = '#rightHeader ';

var LoggedHeaderGui = (function (_super) {
    __extends(LoggedHeaderGui, _super);
    function LoggedHeaderGui() {
        _super.call(this);
        this.avatar = this.propertize(base + '#avatar');
        this.avatarImg = this.propertize(base + '#avatar img');
        var _self = this;
        $(document).ready(function () {
            _self.avatar.transitionURL(url.user.edit(userId));
        });
    }
    return LoggedHeaderGui;
})(Gui);

module.exports = LoggedHeaderGui;
//# sourceMappingURL=logged-header-gui.js.map
