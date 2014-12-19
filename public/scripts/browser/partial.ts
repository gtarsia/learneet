import Gui = require('./gui')

class Partial extends Gui {
    main;
    constructor(partialSel: string) {
        super();
        this.main = this.propertize(partialSel);
        var _self = this;
        $(document).ready(() => {
            _self.main.jq.show();
        })
    }
}

export = Partial;