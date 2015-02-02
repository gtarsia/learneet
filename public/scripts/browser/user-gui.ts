import ajax = require("./client-ajax");
import Gui = require("./gui");
import url = require("./../common/url");
import validate = require("./../common/validate");
import baseAjax = require("./../common/base-ajax");

declare function marked(c: string);

var base = '.partial.user ';
declare var singlePageApp;

class UserGui extends Gui {
    id: string = "-1";
    parent;
    parseURL() {
        var re = url.user.get('(\\d+)')
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.id = matches[1];
    }
    constructor() {
        super();
        this.parseURL();
        var _self = this;
        _self.titleDeferred.resolve(
                    'User - Learneet')
        $(document).ready(function() {
        });
    }
}

export = UserGui