import Gui = require('./gui')

class SinglePageGui extends Gui {
    main;
    base;
    titleDeferred;
    constructor(componentSel: string) {
        super();
        this.titleDeferred = jQuery.Deferred();
        this.titleDeferred.done(title => {
            document.title = title;
        });
        this.base = componentSel;
        this.main = this.propertize(componentSel);
        var _self = this;
        $(document).ready(() => {
            _self.main.jq.show();
            _self.main.jq.velocity({opacity: 0}, {duration: 0});
            _self.main.jq.velocity({opacity: 1}, {duration: 300});
        })
    }
}

export = SinglePageGui