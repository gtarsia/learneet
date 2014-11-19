import clientAjax = require("./client-ajax");
import PreviewableArticle = require("./templates/previewable-article");
import Gui = require("./gui");
import url = require("./../common/url");
import diff = require("diff");
import validate = require('./../common/validate');

declare function marked(c: string);

export class AddProposalGui extends Gui {
    id: string = "-1";
    proposeBtn = this.propertize('button#propose');
    article: PreviewableArticle;
    changesDescription = this.propertize("#changesDescription", "val");
    oldStr;
    saveArticle() {
    }
    constructor() {
        super();
        var _self = this;
        $(document).ready(function() {
            _self.changesDescription = _self.propertize("#changesDescription", "val")
            _self.article = new PreviewableArticle();
            _self.id = $("[type=hidden]#article-id").val();
            _self.article.fetchDBArticle({id: _self.id})
            .then(() => {
                _self.oldStr = _self.article.input.content.val;
            });
            _self.proposeBtn.jq.click(() => {
                var description = _self.changesDescription.val;
                var its = validate.version.changesDescription(description);
                if (!its.ok) {
                    var api = _self.changesDescription.jq.qtip({ // Grab some elements to apply the tooltip to
                        content: { text: its.because },
                        show: { when: false, ready: true },
                        position: { my: 'top left', at: 'bottom center' },
                        hide: false
                    })
                    setTimeout(api.qtip.bind(api, 'destroy'), 5000)
                }
                var str = _self.article.input.content.val;
                var patch = diff.createPatch('', _self.oldStr, str, '', '');
                console.log('The patch is :' + patch);
            });
        });
    }
}


declare var guiName;
declare var gui;
if (guiName == 'AddProposalGui') {
    gui = new AddProposalGui();
}