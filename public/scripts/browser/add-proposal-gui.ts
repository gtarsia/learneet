import clientAjax = require("./client-ajax");
import PreviewableArticle = require("./templates/previewable-article");
import Gui = require("./gui");
import url = require("./../common/url");
import val = require("./../common/validation");

declare function marked(c: string);

export class AddProposalGui extends Gui {
    id: string = "-1";
    query(s: string) {
        
    }
    saveBtn = { get jq() { return $('button#save') } };
    cancelBtn = { get jq() { return $('button#cancel') } };
    article: PreviewableArticle;
    changesDescription;
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
            _self.saveBtn.jq.click(() => {
                _self.saveArticle();
            });
            _self.cancelBtn.jq.click(() => {
                _self.redirect(url.article.get(_self.id));
            });
        });
    }
}


declare var guiName;
declare var gui;
if (guiName == 'AddProposalGui') {
    gui = new AddProposalGui();
}