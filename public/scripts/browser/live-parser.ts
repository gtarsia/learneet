import parser = require("./parser");

export var previousNumberOfLines = 0;

function getSourceDom(id: string): any {
	return $("#" + id)[0];
}

function reparse(sourceId: string, targetId: string) {
    var source : any = $("#" + source)[0];
    var lines = source.value.split("\n");
    var length = lines.length;
    for (var i = 0; i < length; i++) {
        parser.parseToDiv(lines[i], i, targetId);
    }
    return length;
}

function parseLine(currentLine, lineNumber, targetId) {
	parser.parseToDiv(currentLine, lineNumber, targetId);
}

export function bind(sourceId: string, targetId: string) {
	reparse(sourceId, targetId);
    $('#source').bind('input propertychange', function() {
        var source: any = $("#" + sourceId);
        var lines = source.value.split("\n");
        var length = lines.length;
        if (length - previousNumberOfLines != 0) {
            console.log('Number of lines changed');
            console.log('Length ' + length + 'vs previous ' + previousNumberOfLines);
            reparse(sourceId, targetId);
            return;
        }
        var sourceTilCursor = source.value.substr(0, source.selectionStart);
        var lineNumber = sourceTilCursor.split("\n").length - 1;
        var currentLine = lines[lineNumber];
        parseLine(currentLine, lineNumber, targetId);
    });
}