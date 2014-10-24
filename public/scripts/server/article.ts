import commonAjax = require('./../common/common-ajax');
import Promise = require('bluebird');
import Article = commonAjax.Article;
import Create = Article.Create;
import Get = Article.Get;
import db = require('./db');

function isOk(err, reject) { if (err) { reject(err); return false;} else return true;}

export function create(args: Create.ParamsType) : Promise<Create.ReturnType> {
	var idOuter;
	return db.incr("articleId")
	.then((id: string) => {
		idOuter = id;
		return db.hmset("article:" + id, args);
	})
	.then<Create.ReturnType>((result: string) => {
		var r : Create.ReturnType = {
			ok: true,
			why: '',
			result: {
				id: idOuter
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