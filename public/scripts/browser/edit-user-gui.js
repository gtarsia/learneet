var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var url = require("./../common/url");
var SinglePageGui = require("./single-page-gui");

var base = '.partial.edit-user ';

var EditUserGui = (function (_super) {
    __extends(EditUserGui, _super);
    function EditUserGui() {
        _super.call(this, base);
        this.id = "-1";
        this.parseURL();
        var _self = this;
        _self.titleDeferred.resolve('Edit User - Learneet');
        $(document).ready(function () {
        });
    }
    EditUserGui.prototype.parseURL = function () {
        var re = url.user.edit('(\\d+)');
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.id = matches[1];
    };
    return EditUserGui;
})(SinglePageGui);

module.exports = EditUserGui;
//# sourceMappingURL=edit-user-gui.js.map
