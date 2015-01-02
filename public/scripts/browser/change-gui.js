var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ajax = require("./client-ajax");

var Partial = require("./partial");
var url = require("./../common/url");

var ChangeGui = (function (_super) {
    __extends(ChangeGui, _super);
    function ChangeGui() {
        _super.call(this, '.change.partial');
        this.article = { id: "-1" };
        this.change = { id: "-1" };
        this.parseURL();
        var cb = ajax.changes.get({ article: this.article, change: this.change });
        var _self = this;
        $(document).ready(function () {
            cb.done(function (res) {
                debugger;
            });
        });
    }
    ChangeGui.prototype.getEditBtn = function () {
        return $("#editBtn");
    };
    ChangeGui.prototype.setCrumb = function () {
    };
    ChangeGui.prototype.parseURL = function () {
        debugger;
        var re = url.change.get('(\\d+)', '(\\d+)');
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.article.id = matches[1];
        this.change.id = matches[2];
    };
    return ChangeGui;
})(Partial);

if (subGuiName == 'ChangeGui') {
    subGui = new ChangeGui();
}

module.exports = ChangeGui;
//# sourceMappingURL=change-gui.js.map
