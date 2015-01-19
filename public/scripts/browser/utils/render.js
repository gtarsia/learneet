function toKatex(s) {
    var output = '';
    var occurenceIndex = 0;
    var openKatex = false;
    var startIndex = 0;
    var length = s.length;
    while (occurenceIndex != -1 && startIndex < length) {
        occurenceIndex = s.indexOf('$$', startIndex);

        var endIndex = (occurenceIndex == -1 ? length : occurenceIndex);

        var section = s.substring(startIndex, endIndex);

        if (openKatex)
            section = katex.renderToString("\\displaystyle {" + section + "}");

        output += section;

        startIndex = endIndex + 2;

        if (occurenceIndex != -1) {
            openKatex = !openKatex;
        }
    }
    return output;
}
exports.toKatex = toKatex;

function toMarked(s) {
    return marked(s);
}
exports.toMarked = toMarked;

function toMarkedKatex(s) {
    return exports.toMarked(exports.toKatex(s));
}
exports.toMarkedKatex = toMarkedKatex;
//# sourceMappingURL=render.js.map
