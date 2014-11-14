function baseArticle(articleId) {
    return "article:" + articleId;
}
exports.baseArticle = baseArticle;

function article(args) {
    return exports.baseArticle(args.articleId);
}
exports.article = article;

function articleIdCounter(args) {
    return exports.baseArticle(args.articleId) + ":idCounter";
}
exports.articleIdCounter = articleIdCounter;

function articleIdSet(args) {
    return exports.baseArticle(args.articleId) + ":ids";
}
exports.articleIdSet = articleIdSet;

function baseVersion(articleId) {
    return "article:" + articleId + ":version:";
}
exports.baseVersion = baseVersion;

function version(args) {
    return exports.baseVersion(args.articleId) + args.versionId;
}
exports.version = version;

function versionIdCounter(args) {
    return exports.baseVersion(args.articleId) + "idCounter";
}
exports.versionIdCounter = versionIdCounter;

function versionIdSet(args) {
    return exports.baseVersion(args.articleId) + "idSet";
}
exports.versionIdSet = versionIdSet;
//# sourceMappingURL=redis_keys.js.map
