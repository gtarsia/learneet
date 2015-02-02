var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./client-ajax");
var Gui = require("./gui");
var url = require("./../common/url");

var EditUserGui = (function (_super) {
    __extends(EditUserGui, _super);
    function EditUserGui() {
        _super.call(this);
        this.id = "-1";
        this.avatar = this.propertize('.avatar');
        this.parseURL();
        var _self = this;
        var getCb = ajax.user.get({ user: { id: this.id } });
        _self.titleDeferred.resolve('Edit User - Learneet');
        $(document).ready(function () {
            getCb.done(function (res) {
                if (res.ok)
                    _self.avatar.jq.attr('src', res.result.avatar_url + '?size=medium');
                else
                    console.log(res.why);
            });
            $('#uploadForm').submit(function (e) {
                $(this).ajaxSubmit({
                    error: function (xhr) {
                        console.log('Error: ' + xhr.status);
                    },
                    success: function (response) {
                        console.log(response);
                    }
                });
                e.preventDefault();
            });
        });
    }
    EditUserGui.prototype.parseURL = function () {
        var re = url.user.edit('(\\d+)');
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.id = matches[1];
    };
    return EditUserGui;
})(Gui);

module.exports = EditUserGui;
//# sourceMappingURL=edit-user-gui.js.map
