var ClientAjax = require("./client-ajax");

var EmbedIndexGui = (function () {
    function EmbedIndexGui() {
        $(document).ready(function () {
            new ClientAjax.Article.GetAll().ajax({}).done(function (res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result;
            });
        });
    }
    return EmbedIndexGui;
})();

if (guiName == 'EmbedIndexGui') {
    gui = new EmbedIndexGui();
}
//# sourceMappingURL=embed-index.js.map
