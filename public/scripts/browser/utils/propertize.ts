import SinglePageApp = require('./../single-page-app');

function propertize(selector: string, valFnName?: string): 
    {jq: JQuery; val?: string; transitionURL: (url: string) => void} {
    var obj = {
        get jq() { return $(selector); },
        get selector() { return selector; },
        transitionURL: function(url: string) { 
            if (url) this.jq.prop('href', url);
            else url = this.jq.prop('href');
            this.jq.click(e => {
                SinglePageApp.viewTransition(url);    
                e.preventDefault();
            })
        }
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

export = propertize;