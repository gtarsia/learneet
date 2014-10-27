import baseAjax = require('./../common/base-ajax');
import Promise = require('bluebird');
import article = baseAjax.article;
import FieldsWithId = article.FieldsWithId;
import create = article.create;
import get = article.get;
import update = article.update;
import getAll = article.getAll;
import db = require('./db');

function isOk(err, reject) { if (err) { reject(err); return false;} else return true;}

export function create(args: create.ParamsType) : Promise<create.ReturnType> {
	var id;
	return db.incr("article:idCounter")
	.then((_id: string) => {
		debugger;
		id = _id;
		return db.rpush("article:ids", id);
	})
	.then(() => {
		debugger;
		return db.hmset("article:" + id, article.WrapFieldWithId(args, id));
	})
	.then<create.ReturnType>((result: string) => {
		debugger;
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
        debugger;
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

export function update(args: update.ParamsType) : Promise<update.ReturnType> {
	return db.hmset("article:" + args.id, args)
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