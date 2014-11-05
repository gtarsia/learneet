var ClientAjax = require('./client-ajax');
declare var clientAjax;
clientAjax = ClientAjax;

class Gui {
    redirect(view: string) {
        window.location.href = view;
    }
    propertize(selector: string, valFnName?: string): {jq: JQuery; val?: string;} {
        var obj = {
            get jq() { return $(selector); },
        }
        if (valFnName != '') 
        Object.defineProperty(obj, "val", {
            get: function() {
                return obj.jq[valFnName]();
            },
            set: function(val) {
                obj.jq[valFnName](val);
            }    
        });
        return obj;
    }
}

export = Gui