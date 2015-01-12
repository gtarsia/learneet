import baseAjax = require('./../common/base-ajax');
import Promise = require('bluebird');
import baseArticle = baseAjax.article;
import FieldsWithId = baseAjax.FieldsWithId;
import TitleWithId = baseAjax.TitleWithId;
import create = baseArticle.create;
import get = baseArticle.get;
import getTitleWithId = baseArticle.getTitleWithId;
import update = baseArticle.update;
import getAll = baseArticle.getAll;
import redis = require("redis");
import queryTitle = baseArticle.queryTitle;
import db = require('./db');
import keys = require('./redis-keys');
//import version = require('./version');

function isOk(err, reject) { if (err) { reject(err); return false;} else return true;}

export function notOkObj(reason: string): any {
	return {
		ok: false,
		why: reason
	}
}

export function okObj<T>(obj: T): any {
	return {
		ok: true,
		why: '',
		result: obj
	}
}

export function create(args: create.Params) : Promise<create.Return> {
	var id;
	var article = args.article;
	if (!article.title || !article.content) {
		return notOkObj('Title or content was null or empty');
	}
	return db.incr(keys.articlesIdCounter())
	.then((_id: string) => {
		id = _id;
		return db.hmset(keys.article({article: {id: id}}), baseArticle.WrapFieldWithId(args, id));
	})
	.then((result) => {
		if (result != 'OK') return notOkObj('Could\'t create object');
		db.sadd(keys.articlesIdSet(), id)
		.then(() => {
			TitleSearch.update(id, "", article.title);
		})
		return okObj({id: id});
	})
}

export function update(args: update.Params) : Promise<update.Return> {
	var oldTitle;
	var article = args.article;
	if (!article.title && !article.content) {
		return notOkObj('Title or content was null or empty')
	}
	return get(args)
	.then((res) => {
		if (!res.ok) {
			return notOkObj('Can\'t upload article, because we couldn\'t find it');
		}
		else {
			var versionId;
			oldTitle = res.result.title;
		    return db.hmset(keys.article(args), article)
			.then((res: string) => {
				if (!res) notOkObj('Article update wasn\'t succesful');
				TitleSearch.update(article.id, oldTitle, article.title);
				return okObj({id: article.id});
			})
		}
	})
}

export function get(args: get.Params) : Promise<get.Return> {
	var article = args.article;
	return db.hgetall(keys.article(args))
	.then<get.Return>((result: any) => {
		var ok = result != null;
		var why = (result == null ? 'Article with id ' + article.id + ' not found' : '');
		var r : get.Return = {
			ok: ok,
			why: why,
			result: result
		}
		return r;
	})
}

export function getTitleWithId(args: getTitleWithId.Params)
: Promise<getTitleWithId.Return> {
	var article = args.article;
	return db.hmget(keys.article(args), "id", "title")
	.then(res => {
		if (res == null) return notOkObj('Couldn\'t get article title');
		return okObj({id: res[0], title: res[1]})
	})
}

export function getAll() : Promise<getAll.Return> {
	function arrayToArticles(array: string[]) : FieldsWithId[] {
		var articles : FieldsWithId[] = [];
		var length = array.length;
		while (length > 0) {
			var id = array.shift();
			var title = array.shift(); var content = array.shift();
			length -= 3;
			articles.push({ id: id, title: title, content: content });
		}
		return articles;
	}
	return db.sort(keys.articlesIdSet(), 'by', 'nosort', 'GET', 'articles:*->id',
	    'GET', 'articles:*->title', 'GET', 'articles:*->content')
	.then<getAll.Return>((result: any) => {
		var ok = result != null;
		var why = (result == null ? 'Couldn\'t get articles' : '');
		var r : getAll.Return = {
			ok: ok,
			why: why,
			result: arrayToArticles(result)
		}
		return r;
	})
}

export module TitleSearch {
	export function remove(multi: any, id: string, oldTitle: string) {
		var words = oldTitle.split(' ');
		var length = words.length;
		for (var i = 0; i < length; i++) {
			multi = multi.srem(["search_words:" + words[i], id], redis.print);
		}
		return multi;
	}

	export function add(multi: any, id: string, newTitle: string) {
		var words = newTitle.split(' ');
		var length = words.length;
		for (var i = 0; i < length; i++) {
			multi = multi.sadd(["search_words:" + words[i], id], redis.print);
		}
		return multi;
	}

	export function update(id: string, oldTitle: string, newTitle: string) {
		var multi = db.multi();
		multi = remove(multi, id, oldTitle);
		multi = add(multi, id, newTitle);
		multi.exec();
	}

	export function query(args: queryTitle.Params) : Promise<queryTitle.Return> {
		var words = args.query.split(' ');
		var length = words.length;
		for (var i = 0; i < length; i++) {
			words[i] = "search_words:".concat(words[i]);
		}
		return db.sinter.apply(db, words)
		.then((ids: any) => {
			if (ids == null) return [];
			var multi = db.multi();
			var length = ids.length;
			for (var i = 0; i < length; i++) {
				multi.hmget([keys.article({ article: {id: ids[i]}}), "id", "title"])
			}
			var promise: any = Promise.promisify(multi.exec, multi);
			return promise();
		})
		.then((result: any[]) => {
			var length = result.length;
			var articles: TitleWithId[] = [];
			for(var i = 0; i < length; i++) {
                var article: string[] = result.shift();
				var id = article.shift();
				var title = article.shift();
				articles.push({id: id, title: title});
			}
			return okObj(articles)
		})
	}
}