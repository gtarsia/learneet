function propertize(selector, valFnName) {
    var obj = {
        get jq() {
            return $(selector);
        },
        get selector() {
            return selector;
        },
        transitionURL: function (url) {
            this.jq.each(function (index, el) {
                var _url = url;
                if (_url)
                    $(el).prop('href', url);
                else
                    _url = el.pathname;
                $(el).click(function (e) {
                    if (e.button != 0)
                        return;
                    singlePageApp.viewTransition(_url);
                    e.preventDefault();
                });
            });
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
}

module.exports = propertize;
//# sourceMappingURL=propertize.js.map
