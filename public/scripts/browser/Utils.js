(function (m) {
    function _redirect(url) {
        throw new Error('Not Implemented Exception');
    }
    m.redirect = {
        to: {
            index: function () {
                _redirect('/index');
            }
        }
    };
})(exports.m || (exports.m = {}));
var m = exports.m;
//# sourceMappingURL=Utils.js.map
