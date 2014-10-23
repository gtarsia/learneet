import Promise = require('bluebird');
import redis = require("redis");

var fakeredis : any = require("fakeredis");

//var client = fakeredis.createClient();
var client = redis.createClient(15855, 
	'pub-redis-15855.us-east-1-2.1.ec2.garantiadata.com');
client.auth('compadrito25', err => {
	if (err) throw err;
})

function isOk(err, reject) { if (err) { reject(err); return false;} else return true;}

function isNumber(n)
{
   return n == parseFloat(n);
}

function objectToRedisArray(object: any): string[] {
	var array: string[] = [];
	for (var key in object) {
        if (!object.hasOwnProperty(key)) {
            throw new Error;
        }
        else {
            array.push(key);
            array.push(object[key]);
        }
	}
	return array;
}
/*
function redisArrayToObject(array: string[]): any {
	var length = array.length;
	var obj = {};
	if (!(isNumber(length) && (length % 2 == 0))) throw new Error('redis array not good');
	while (length > 0) {
		var propName = array.shift();
		var value = array.shift();
		if (typeof propName != 'string' || typeof value != 'string')
			throw new Error('redis array not good');
		obj[propName] = value;
	}
	return obj;
}
*/	
function genericPromise(redisCommand, args) {

}

export function hmset(key: string, object: any) : Promise<string> {
	return new Promise<string>(
	function(resolve: (result: string) => any, 
             reject: (error: any) => void) {
		var array: string[] = objectToRedisArray(object);
		client.hmset([key].concat(array), function(err, reply) {
			if (!isOk(err, reject)) return;
			resolve(reply);
		});
	});
}

export function incr(key: string) : Promise<string> {
	return new Promise<string>(
	function(resolve: (result: string) => any,
			 reject: (error: any) => void) {
		client.incr([key], function(err, result) {
			if (!isOk(err, reject)) return;
			resolve(result);
		});
	});
}

export function hgetall(key: string) : Promise<any> {
	return new Promise<string>(
	function(resolve: (result: string) => any,
			 reject: (error: any) => void) {
		console.log(key);
		client.hgetall([key], function(err, result) {
			if (!isOk(err, reject)) result;
			resolve(result);
		});
	});
}