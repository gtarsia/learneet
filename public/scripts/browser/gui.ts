import clientAjax = require('./client-ajax');
import SinglePageApp = require('./single-page-app');
import _propertize = require('./utils/propertize')

class Gui {
    titleDeferred;
    constructor() { 
        this.titleDeferred = jQuery.Deferred();
        this.titleDeferred.done(title => {
            document.title = title;
        });
        $(document).ready(() => { 
            $('#main').find('button').velocity({opacity: 0}, {duration: 0});
            $('#main').find('button').velocity({opacity: 1}, {duration: 500});    
        }) 
    }
    redirect(view: string) {
        window.location.href = view;
    }
    propertize(selector: string, valFnName?: string): 
    {jq: JQuery; val?: string; transitionURL: (url: string) => void} {
        return _propertize(selector, valFnName);
    }
}

export = Gui