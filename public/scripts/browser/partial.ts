import Gui = require('./gui')

class Partial extends Gui {
    main;
    base;

    constructor(partialSel: string) {
        super();
        this.base = partialSel;
        this.main = this.propertize(partialSel);
        var _self = this;
        $(document).ready(() => {
            _self.main.jq.show();
            _self.main.jq.velocity({opacity: 0}, {duration: 0});
            _self.main.jq.velocity({opacity: 1}, {duration: 500});
        })
    }
}

export = Partial;