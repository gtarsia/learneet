import ajax = require("./client-ajax");
import parser = require('./parser');
import RenderedArticle = require('./templates/rendered-article');
import ArticleChangePreviewTemplate = require('./templates/article-change-preview-template');
import Gui = require("./gui");
import url = require("./../common/url");
import Arrows = require('./utils/score-arrow');
import LoggedHeaderGui = require('./header/logged-header-gui');
declare function marked(s);

declare var layoutGui;
declare var singlePageApp;
declare var userId;
declare var header;

class LayoutGui extends Gui {
    logo = this.propertize('#logo');
    constructor() {
        super();
        var _self = this;
        if (userId)
            header = new LoggedHeaderGui();
        $(document).ready(() => {
            if (singlePageApp.started)
                _self.logo.transitionURL('/');
        });
    }
} 

layoutGui = new LayoutGui();

export = LayoutGui;