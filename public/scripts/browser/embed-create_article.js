var Gui = (function () {
    function Gui() {
        $("#create").click(function () {
            console.log('Creando artículo');
        });
    }
    Gui.prototype.getContent = function () {
        return $("#content").val();
    };
    Gui.prototype.getTitle = function () {
        throw new Error('Not implemented yet');
    };
    return Gui;
})();

$(document).ready(function () {
    console.log("ready!");
});
//# sourceMappingURL=embed-create_article.js.map
