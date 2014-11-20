 
var ClientAjax = require('./client-ajax');
declare var clientAjax;
clientAjax = ClientAjax; 

class Gui {
    constructor() { 
        $(document).ready(() => { 
            $('#main').find('button').velocity({opacity: 0}, {duration: 0});
            $('#main').find('button').velocity({opacity: 1}, {duration: 500});    
        }) 
    }
    redirect(view: string) {
        window.location.href = view;
    }
    propertize(selector: string, valFnName?: string): {jq: JQuery; val?: string;} {
        var obj = {
            get jq() { return $(selector); },
            get selector() { return selector; }
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