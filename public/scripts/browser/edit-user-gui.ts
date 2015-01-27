import ajax = require("./client-ajax");
import Gui = require("./gui");
import url = require("./../common/url");
import SinglePageGui = require("./single-page-gui");
import validate = require("./../common/validate");
import baseAjax = require("./../common/base-ajax");

declare function marked(c: string);

var base = '.partial.edit-user ';
declare var singlePageApp;

class EditUserGui extends SinglePageGui {
    id: string = "-1";
    avatar = this.propertize(base + '.avatar');
    parent;

    parseURL() {
        var re = url.user.edit('(\\d+)')
        var regex = new RegExp(re);
        var matches = regex.exec(location.pathname);
        this.id = matches[1];
    }
    constructor() {
        super(base);
        this.parseURL();
        var _self = this;
        var getCb = ajax.user.get({user: {id: this.id}});
        _self.titleDeferred.resolve(
                    'Edit User - Learneet')
        $(document).ready(function() {
            getCb.done(res => {
                if (res.ok)
                _self.avatar.jq.attr('src', res.result.avatar_url + '?size=medium');
                else console.log(res.why);
            })
            $('#uploadForm').submit(function(e) {
                $(this).ajaxSubmit({
                    error: function(xhr) {
                        console.log('Error: ' + xhr.status);
                    },
                    success: function(response) {
                        console.log(response);
                    }
                });
                e.preventDefault();
            });
        });
    }
}

export = EditUserGui