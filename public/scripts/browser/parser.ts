
export interface ParsedHtml {
    divId: string;
    content: string;
}

export function writeLineDiv(html, number, targetId) {
    var div = $('#line' + number);
    if (!(div.length)) {
        $("#" + targetId).append("<div id='line" + number + "'></div>");
    }
    $("#line" + number).html(html);
}

export function translateLine(line) {
    var html = "";
    if (line.substr(0, 7) == '@katex ') {
        line = line.substr(7);
        html = katex.renderToString("\\displaystyle " + line);
    }
    else {
        html = line;
    }
    return html;
}

export function parseToDiv(line, lineNumber, targetId) {
    var html = translateLine(line);
    writeLineDiv(html, lineNumber, targetId);
}

