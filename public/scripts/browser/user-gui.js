var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gui = require("./gui");
var url = require("./../common/url");

var base = '.partial.user ';

var UserGui = (function (_super) {
    __extends(UserGui, _super);
    function UserGui() {
        _super.call(this);
        this.id = "-1";
        this.parseURL();
        var _self = this;
        _self.titleDeferred.resolve('User - Learneet');
        $(document).ready(function () {
        });
    }
    UserGui.prototype.parseURL = function () {
        var re = url.user.get('(\\d+)');
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.id = matches[1];
    };
    return UserGui;
})(Gui);

module.exports = UserGui;
//# sourceMappingURL=user-gui.js.map
