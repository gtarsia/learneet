import baseAjax = require('./../common/base-ajax');
import Promise = require('bluebird');
import baseArticle = baseAjax.article;
import FieldsWithId = baseArticle.FieldsWithId;
import TitleWithId = baseArticle.TitleWithId;
import create = baseArticle.create;
import get = baseArticle.get;
import getTitleWithId = baseArticle.getTitleWithId;
import update = baseArticle.update;
import addDependency = baseArticle.addDependency;
import getDependencies = baseArticle.getDependencies;
import remDeps = baseArticle.remDependency;
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

export function create(args: create.ParamsType) : Promise<create.ReturnType> {
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

export function update(args: update.ParamsType) : Promise<update.ReturnType> {
    debugger;
	var oldTitle;
	var article = args.article;
	if (!article.title && !article.content) {
		return notOkObj('Title or content was null or empty')
	}
	return get(args)
	.then((res) => {
    	debugger;
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

export function get(args: get.ParamsType) : Promise<get.ReturnType> {
	var article = args.article;
	return db.hgetall(keys.article(args))
	.then<get.ReturnType>((result: any) => {
		var ok = result != null;
		var why = (result == null ? 'Article with id ' + article.id + ' not found' : '');
		var r : get.ReturnType = {
			ok: ok,
			why: why,
			result: result
		}
		return r;
	})
}

export function getTitleAndId(args: getTitleWithId.ParamsType)
: Promise<getTitleWithId.ReturnType> {
	var article = args.article;
	return db.hmget(keys.article(args), "id", "title")
}

export function getAll() : Promise<getAll.ReturnType> {
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
	.then<getAll.ReturnType>((result: any) => {
		debugger;
		var ok = result != null;
		var why = (result == null ? 'Couldn\'t get articles' : '');
		var r : getAll.ReturnType = {
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

	export function query(args: queryTitle.ParamsType) : Promise<queryTitle.ReturnType> {
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
			debugger;
			var length = result.length;
			var articles: baseArticle.TitleWithId[] = [];
			for(var i = 0; i < length; i++) {
                var article: string[] = result.shift();
				var id = article.shift();
				var title = article.shift();
				articles.push({id: id, title: title});
			}
			return {
				ok: true,
				why: '',
				result: articles
			}
		})
	}
}


export function addDependency(args: addDependency.ParamsType)
: Promise<addDependency.ReturnType> {
	var dependent = args.dependent;
	var dependency = args.dependency;
	return db.sadd(keys.dependency(args))
	.then((res: string) => {
		debugger;
		return {
			ok: true,
			why: '',
			result: (res == '1')
		}
	});
}

export function getDependencies(args: getDependencies.ParamsType)
: Promise<getDependencies.ReturnType> {
	var article = args.article;
	return db.sort('article:' + article.id + ':dependencies', 'by', 'nosort', 'GET', 'article:*->id',
	    'GET', 'articles:*->title')
	.then((array: string[]) => {
		var articles : TitleWithId[] = [];
		while (array.length > 0) {
			var id = array.shift();
			var title = array.shift();
			articles.push({ id: id, title: title});
		}
		return {
			ok: true,
			why: '',
			result: articles
		};
	});
}

export function remDependency(args: remDeps.ParamsType)
: Promise<remDeps.ReturnType> {
	var dependent = args.dependent;
	var dependency = args.dependency;
	return db.srem(keys.dependency(args))
	.then(res => {
		return {
			ok: true,
			why: '',
			result: res == '1'
		}	
	})
}