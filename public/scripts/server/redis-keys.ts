export interface Id {
    id: string;
}
export interface ArticleWithId {
    article: {id: string};
}

export function j(array: any[]) {
    return array.join(":");
}

export function baseArticles() {
    return "articles";
}
export function article(args: ArticleWithId) {
    return j([baseArticles(), args.article.id]);
}
export function articlesIdCounter() {
    return j([baseArticles(), "idCounter"]);
}
export function articlesIdSet() {
    return j([baseArticles(), "idSet"]);
}

export function articleScore(args: ArticleWithId) {
    return j([baseArticles(), args.article.id, 'score'])
}

//Proposals

export function baseProposals(args: ArticleWithId) {
    return j([article(args), "proposals"]);
}
export function proposal(args: {article: Id; proposal: Id}) {
    return j([baseProposals(args), args.proposal.id])
}
export function proposalsIdCounter(args: ArticleWithId) {
    return j([baseProposals(args), "idCounter"]);
}
export function proposalsIdSet(args: ArticleWithId) {
    return j([baseProposals(args), "idSet"]);
}
export function proposalsNoSortField(args: 
    { proposal: { article: {id: string}}; }, field: string ) {
    return j([baseProposals(args.proposal), '*->' + field]);
}

export function baseDependencies(args: ArticleWithId) {
    return j([article(args), 'dependencies']);
}
export function dependency(args: {dependent: Id; dependency: Id}) {
    return j([baseDependencies({article: args.dependent}), args.dependency.id]);
}
export function dependenciesIdCounter(args: ArticleWithId) {
    return j([baseDependencies(args), "idCounter"]);
}
export function dependenciesIdSet(args: ArticleWithId) {
    return j([baseDependencies(args), "idSet"]);
}



//Version
/*
export function baseVersion(articleId: string) {
    return "article:" + articleId + ":version:";
}

export function version(args: {articleId: string; versionId: string;}) {
    return baseVersion(args.articleId) + args.versionId;
}

export function versionIdCounter(args: {articleId: string}) {
    return baseVersion(args.articleId) + "idCounter";
}

export function versionIdSet(args: {articleId: string}) {
    return baseVersion(args.articleId) + "idSet";
}
*/