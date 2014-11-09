import baseAjax = require('./../common/base-ajax');
import Promise = require('bluebird');
import article = baseAjax.article;
import FieldsWithId = article.FieldsWithId;
import TitleWithId = article.TitleWithId;
import create = article.create;
import get = article.get;
import getTitleWithId = article.getTitleWithId;
import update = article.update;
import addDependency = article.addDependency;
import getDependencies = article.getDependencies;
import remDeps = article.remDependency;
import getAll = article.getAll;
import redis = require("redis");
import queryTitle = article.queryTitle;
import db = require('./db');

function isOk(err, reject) { if (err) { reject(err); return false;} else return true;}

export function create(args: create.ParamsType) : Promise<create.ReturnType> {
	var id;
	return db.incr("article:idCounter")
	.then((_id: string) => {
		id = _id;
		return db.rpush("article:ids", id);
	})
	.then(() => {
		return update(article.WrapFieldWithId(args, id));
	})
	.then<update.ReturnType>((result: update.ReturnType) => {
		var r : create.ReturnType = {
			ok: true,
			why: '',
			result: {
				id: id
			}
		}
		return r;
		/*
		return new Promise<Create.ReturnType>(
		function(resolve: (result: Get.ReturnType) => any, 
                 reject: (error: any) => void) {

		})
		*/
	})
}

export function get(args: get.ParamsType) : Promise<get.ReturnType> {
	return db.hgetall("article:" + args.id.toString())
	.then<get.ReturnType>((result: any) => {
		var ok = result != null;
		var why = (result == null ? 'Article with id ' + args.id + ' not found' : '');
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
	return db.hmget("article:" + args.id, "id", "title")
}

export function getAll() : Promise<getAll.ReturnType> {
	function arrayToArticles(array: string[]) : FieldsWithId[] {
		var articles : FieldsWithId[] = [];
		while (array.length > 0) {
			var id = array.shift();
			var title = array.shift(); var content = array.shift();
			articles.push({ id: id, title: title, content: content });
		}
		return articles;
	}
	return db.sort('article:ids', 'by', 'nosort', 'GET', 'article:*->id',
	    'GET', 'article:*->title', 'GET', 'article:*->content')
	.then<getAll.ReturnType>((result: any) => {
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
				multi.hmget(["article:" + ids[i], "id", "title"])
			}
			var promise: any = Promise.promisify(multi.exec, multi);
			return promise();
		})
		.then((result: any[]) => {
			debugger;
			var length = result.length;
			var articles: article.TitleWithId[] = [];
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

export function update(args: update.ParamsType) : Promise<update.ReturnType> {
	var oldTitle;
	return get(args)
	.then((res) => {
		oldTitle = res.result.title;
		return db.hmset("article:" + args.id, args)
	})
	.then((result: string) => {
		TitleSearch.update(args.id, oldTitle, args.title);
		var ok = result != null;
		var why = (result == null ? 'Article with id ' + args.id + ' not found' : '');
		var r : update.ReturnType = {
			ok: ok,
			why: why,
			result: {
				id: args.id
			}
		}
		return r;
	})
}

export function addDependency(args: addDependency.ParamsType)
: Promise<addDependency.ReturnType> {
	debugger;
	return db.sadd('article:' + args.dependentId + ':dependencies', args.dependencyId)
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
	return db.sort('article:' + args.id + ':dependencies', 'by', 'nosort', 'GET', 'article:*->id',
	    'GET', 'article:*->title')
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
    debugger;
	return db.srem('article:' + args.dependentId + ':dependencies', args.dependencyId)
	.then(res => {
		return {
			ok: true,
			why: '',
			result: res == '1'
		}	
	})
}