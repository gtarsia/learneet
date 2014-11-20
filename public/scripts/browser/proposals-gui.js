var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var clientAjax = require("./client-ajax");

var Gui = require("./gui");
var url = require("./../common/url");

var ProposalsGui = (function (_super) {
    __extends(ProposalsGui, _super);
    function ProposalsGui() {
        _super.call(this);
        this.id = "-1";
        this.proposalsTemplate = this.propertize("#proposals-template");
        var _self = this;
        $(document).ready(function () {
            _self.id = $("[type=hidden]#article-id").val();
            clientAjax.proposal.getAll({
                proposal: {
                    article: { id: _self.id }
                }
            }).done(function (res) {
                var proposals = res.result.proposals;
                var length = proposals.length;
                for (var i = 0; i < length; i++) {
                    proposals[i].url = url.article.get(proposals[i].id);
                }
                var template = _self.proposalsTemplate.jq.html();
                Mustache.parse(template);
                var rendered = Mustache.render(template, { props: proposals });
                _self.proposalsTemplate.jq.after(rendered);
            });
        });
    }
    return ProposalsGui;
})(Gui);
exports.ProposalsGui = ProposalsGui;

if (guiName == 'ProposalsGui') {
    gui = new ProposalsGui();
}
//# sourceMappingURL=proposals-gui.js.map
