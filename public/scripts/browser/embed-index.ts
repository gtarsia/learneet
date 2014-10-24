import ClientAjax = require("./client-ajax");

//$.template('<div><img src="${url}" />${name}</div>');

class EmbedIndexGui {
    constructor() {
        $(document).ready(function() {
            new ClientAjax.Article.GetAll().ajax({})
            .done(function(res) {
                if (!res.ok) {
                    console.log(res.why);
                    return;
                }
                var result = res.result
            });
        });
    }
}

declare var guiName;
declare var gui;

if (guiName == 'EmbedIndexGui') {
    gui = new EmbedIndexGui();
}