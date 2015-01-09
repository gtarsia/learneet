
declare var singlePageApp;

function propertize(selector: string, valFnName?: string): 
    {jq: JQuery; val?: string; transitionURL: (url: string) => void} {
    var obj = {
        get jq() { return $(selector); },
        get selector() { return selector; },
        transitionURL: function(url: string) { 
            if (url) this.jq.prop('href', url);
            //I get the pathname because otherwise 
            //I would get the full URL, which doesn't work for REGEX
            else url = this.jq[0].pathname;
            this.jq.click(e => {
                singlePageApp.viewTransition(url);    
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