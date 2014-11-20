import clientAjax = require("./client-ajax");
//import parser = require('./parser');
//import RenderedArticle = require('./templates/rendered-article');
import Gui = require("./gui");
import url = require("./../common/url");
declare function marked(s);

export class ProposalsGui extends Gui {
    id: string = "-1";
    proposalsTemplate = this.propertize("#proposals-template")
    constructor() {
        super();
        var _self = this;
        $(document).ready(() => {
            _self.id = $("[type=hidden]#article-id").val();
            clientAjax.proposal.getAll({ proposal: {
                    article: { id: _self.id }
                }
            })
            .done(function(res) {
                var proposals: any = res.result.proposals;
                var length = proposals.length;
                for (var i = 0; i < length; i++) {
                    proposals[i].url = url.article.get(proposals[i].id);
                }
                var template = _self.proposalsTemplate.jq.html();
                Mustache.parse(template);   // optional, speeds up future uses
                var rendered = Mustache.render(template, 
                    { props: proposals});
                _self.proposalsTemplate.jq.after(rendered);
            });
        })
    }
}

declare var guiName;
declare var gui;

if (guiName == 'ProposalsGui') {
    gui = new ProposalsGui();
}