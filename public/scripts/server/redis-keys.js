function j(array) {
    return array.join(":");
}
exports.j = j;

function baseArticles() {
    return "articles";
}
exports.baseArticles = baseArticles;
function article(args) {
    return exports.j([exports.baseArticles(), args.article.id]);
}
exports.article = article;
function articlesIdCounter() {
    return exports.j([exports.baseArticles(), "idCounter"]);
}
exports.articlesIdCounter = articlesIdCounter;
function articlesIdSet() {
    return exports.j([exports.baseArticles(), "idSet"]);
}
exports.articlesIdSet = articlesIdSet;

function baseProposals(args) {
    return exports.j([exports.article(args), "proposals"]);
}
exports.baseProposals = baseProposals;
function proposal(args) {
    return exports.j([exports.baseProposals(args), args.proposal.id]);
}
exports.proposal = proposal;
function proposalsIdCounter(args) {
    return exports.j([exports.baseProposals(args), "idCounter"]);
}
exports.proposalsIdCounter = proposalsIdCounter;
function proposalsIdSet(args) {
    return exports.j([exports.baseProposals(args), "idSet"]);
}
exports.proposalsIdSet = proposalsIdSet;

function baseDependencies(args) {
    return exports.j([exports.article(args), 'dependencies']);
}
exports.baseDependencies = baseDependencies;
function dependency(args) {
    return exports.j([exports.baseDependencies({ article: args.dependent }), args.dependency.id]);
}
exports.dependency = dependency;
function dependenciesIdCounter(args) {
    return exports.j([exports.baseDependencies(args), "idCounter"]);
}
exports.dependenciesIdCounter = dependenciesIdCounter;
function dependenciesIdSet(args) {
    return exports.j([exports.baseDependencies(args), "idSet"]);
}
exports.dependenciesIdSet = dependenciesIdSet;
//# sourceMappingURL=redis-keys.js.map
