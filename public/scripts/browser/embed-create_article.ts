import utils = require("./Utils");
import ClientAjax = require("./client-ajax");

class Gui {
    getContent(): string {
        return $("#content").val();
    }
    getTitle(): string {
        throw new Error('Not implemented yet');
    }
    constructor() {
        $("#create").click(() => {
            console.log('Creando artículo');
            /*
            ClientAjax.Article.Create(
                { content: this.getContent(), title: this.getTitle() }, 1)
                .then(function (value) {
                    
                }, function (reason) {

                });
            */
        });
    }
}

$(document).ready(function () {
    console.log("ready!");
    
})

