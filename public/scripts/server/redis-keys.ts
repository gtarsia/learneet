export interface Id {
    id: string;
}
export interface ArticleWithId {
    article: {id: string};
}
export interface ArticleChangeWithId extends ArticleWithId {
    change: {id: string};
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

export function articleUpScore(args: ArticleWithId) {
    return j([baseArticles(), args.article.id, 'score', 'up'])
}
export function articleDownScore(args: ArticleWithId) {
    return j([baseArticles(), args.article.id, 'score', 'down'])
}

export function changesBase(args: ArticleWithId) {
    return j([article(args), 'changes'])
}
export function change(args: ArticleChangeWithId) {
    return j([changesBase(args), args.change.id])
}
export function openedChangesSet(args: ArticleWithId) {
    return j([changesBase(args), 'openedIdSet'])
}
export function closedChangesSet(args: ArticleWithId) {
    return j([changesBase(args), 'closedIdSet']);
}
export function changesIdSet(args: ArticleWithId) {
    return j([changesBase(args), 'idSet']);
}
export function changesIdCounter(args: ArticleWithId) {
    return j([changesBase(args), 'idCounter']);
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