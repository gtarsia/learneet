var ClientAjax = require('./client-ajax');

clientAjax = ClientAjax;

var Gui = (function () {
    function Gui() {
    }
    Gui.prototype.redirect = function (view) {
        window.location.href = view;
    };
    Gui.prototype.propertize = function (selector, valFnName) {
        var obj = {
            get jq() {
                return $(selector);
            },
            get selector() {
                return selector;
            }
        };
        if (valFnName != '')
            Object.defineProperty(obj, "val", {
                get: function () {
                    return obj.jq[valFnName]();
                },
                set: function (val) {
                    obj.jq[valFnName](val);
                }
            });
        return obj;
    };
    return Gui;
})();

module.exports = Gui;
//# sourceMappingURL=gui.js.map
