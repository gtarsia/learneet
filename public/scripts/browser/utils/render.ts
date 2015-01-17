declare var marked:any;

export function toKatex(s: string) {
    var output = '';
    var occurenceIndex = 0;
    var openKatex = false;
    var startIndex = 0;
    var length = s.length;
    while(occurenceIndex != -1 && startIndex < length) {
        // find next occurence of $$
        occurenceIndex = s.indexOf('$$', startIndex);
        // the end index should be the end of string if no symbol was found
        var endIndex = (occurenceIndex == -1 ? length : occurenceIndex);
        // get section to be added
        var section = s.substring(startIndex, endIndex);
        // if it's a katex block, parse it as such
        if (openKatex)
            section = katex.renderToString("\\displaystyle {" + section + "}");
        // add that section
        output += section;
        // point startIndex to endIndex so we reference the next section in the next iteration
        // we also skip the two characters of the symbol
        startIndex = endIndex + 2;
        // if an occurence has been found
        if (occurenceIndex != -1) {
            openKatex = !openKatex;
        }
    }
    return output;
}

export function toMarked(s: string) {
    return marked(s);
}

export function toMarkedKatex(s: string) {
    return toMarked(toKatex(s));
}
