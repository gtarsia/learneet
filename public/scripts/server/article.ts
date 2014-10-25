import commonAjax = require('./../common/common-ajax');
import Promise = require('bluebird');
import Article = commonAjax.Article;
import FieldsWithId = Article.FieldsWithId;
import Create = Article.Create;
import Get = Article.Get;
import GetAll = Article.GetAll;
import db = require('./db');

function isOk(err, reject) { if (err) { reject(err); return false;} else return true;}

export function create(args: Create.ParamsType) : Promise<Create.ReturnType> {
	var id;
	return db.incr("articleId")
	.then((_id: string) => {
		debugger;
		id = _id;
		return db.rpush("article:ids", id);
	})
	.then(() => {
		debugger;
		return db.hmset("article:" + id, Article.WrapFieldWithId(args, id));
	})
	.then<Create.ReturnType>((result: string) => {
		debugger;
		var r : Create.ReturnType = {
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

export function get(args: Get.ParamsType) : Promise<Get.ReturnType> {
	return db.hgetall("article:" + args.id.toString())
	.then<Get.ReturnType>((result: any) => {
        debugger;
		var ok = result != null;
		var why = (result == null ? 'Article with id ' + args.id + ' not found' : '');
		var r : Get.ReturnType = {
			ok: ok,
			why: why,
			result: result
		}
		return r;
	})
}

export function getAll() : Promise<GetAll.ReturnType> {
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
	.then<GetAll.ReturnType>((result: any) => {
        debugger;
		var ok = result != null;
		var why = (result == null ? 'Couldn\'t get articles' : '');
		var r : GetAll.ReturnType = {
			ok: ok,
			why: why,
			result: arrayToArticles(result)
		}
		return r;
	})
}