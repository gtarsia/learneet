import Gui = require('./gui')

class SinglePageGui extends Gui {
    main;
    base;
    constructor(componentSel: string) {
        super();
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