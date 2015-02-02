var _propertize = require('./utils/propertize');

var Gui = (function () {
    function Gui() {
        this.titleDeferred = jQuery.Deferred();
        this.titleDeferred.done(function (title) {
            document.title = title;
        });
        $(document).ready(function () {
            $('#main').find('button').velocity({ opacity: 0 }, { duration: 0 });
            $('#main').find('button').velocity({ opacity: 1 }, { duration: 500 });
        });
    }
    Gui.prototype.redirect = function (view) {
        window.location.href = view;
    };
    Gui.prototype.propertize = function (selector, valFnName) {
        return _propertize(selector, valFnName);
    };
    return Gui;
})();

module.exports = Gui;
//# sourceMappingURL=gui.js.map
