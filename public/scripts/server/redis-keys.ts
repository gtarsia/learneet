
export function baseArticle(articleId: string) {
    return "article:" + articleId;
}

export function article(args: {articleId: string}) {
    return baseArticle(args.articleId);
}

export function articleIdCounter(args: {articleId: string}) {
    return baseArticle(args.articleId) + ":idCounter";
}

export function articleIdSet(args: {articleId: string}) {
    return baseArticle(args.articleId) + ":ids";
}

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
