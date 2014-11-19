import clientAjax = require("./client-ajax");
import PreviewableArticle = require("./templates/previewable-article");
import Gui = require("./gui");
import url = require("./../common/url");
import val = require("./../common/validation");
import diff = require("diff");

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
                _self.oldStr = _self.article.input.content;
            });
            _self.proposeBtn.jq.click(() => {
                var str = _self.article.input.content;
                var patch = diff.createPatch('', _self.oldStr, str);
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