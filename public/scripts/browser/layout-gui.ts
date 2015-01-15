import ajax = require("./client-ajax");
import parser = require('./parser');
import RenderedArticle = require('./templates/rendered-article');
import ArticleChangePreviewTemplate = require('./templates/article-change-preview-template');
import Gui = require("./gui");
import SinglePageGui = require("./single-page-gui");
import url = require("./../common/url");
import Arrows = require('./utils/score-arrow');
declare function marked(s);

declare var layoutGui;

class LayoutGui extends Gui {
    logo = this.propertize('#logo');
    constructor() {
        super();
        var _self = this;
        $(document).ready(() => {
            _self.logo.transitionURL('/');
        });
    }
} 

layoutGui = new LayoutGui();

export = LayoutGui;