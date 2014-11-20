import clientAjax = require("./client-ajax");
//import parser = require('./parser');
//import RenderedArticle = require('./templates/rendered-article');
import Gui = require("./gui");
import url = require("./../common/url");
declare function marked(s);

export class ProposalsGui extends Gui {
}

declare var guiName;
declare var gui;

if (guiName == 'ProposalsGui') {
    gui = new ProposalsGui();
}