var Gui = (function () {
    function Gui() {
    }
    Gui.prototype.redirect = function (view) {
        window.location.href = view;
    };
    return Gui;
})();

module.exports = Gui;
//# sourceMappingURL=gui.js.map
