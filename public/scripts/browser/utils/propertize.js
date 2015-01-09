function propertize(selector, valFnName) {
    var obj = {
        get jq() {
            return $(selector);
        },
        get selector() {
            return selector;
        },
        transitionURL: function (url) {
            if (url)
                this.jq.prop('href', url);
            else
                url = this.jq[0].pathname;
            this.jq.click(function (e) {
                singlePageApp.viewTransition(url);
                e.preventDefault();
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
