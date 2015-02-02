
declare var singlePageApp;

function propertize(selector: string, valFnName?: string): 
    {jq: JQuery; val?: string; transitionURL: (url: string) => void} {
    var obj = {
        get jq() { return $(selector); },
        get selector() { return selector; },
        transitionURL: function(url: string) { 
            this.jq.each((index, el) => {
                var _url = url;
                if (_url) $(el).prop('href', url);
                //I get the pathname because otherwise 
                //I would get the full URL, which doesn't work for REGEX
                else _url = el.pathname;
                $(el).click(e => {
                    if (e.button != 0) return;
                    e.preventDefault();
                    singlePageApp.viewTransition(_url);    
                })
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