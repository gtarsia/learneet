/*
 * GET home page.
 */
import express = require('express');

function createRenderFn(url: string, title: string, 
	fn? : (req: express.Request, res: express.Response) => void) {
    return function (req: express.Request, res: express.Response) {
    	if (fn != null) {
    		fn(req, res);	
    	}
        res.render(url, { title: title });
    };
}

export var index = createRenderFn('index', 'Express');
export var browse = createRenderFn('browse', 'Browse');
export var create_article = createRenderFn('create_article', 'Create Article');
export var edit_article = createRenderFn('edit_article', 'Edit Article');
export var article = createRenderFn('article', 'Article');
export var register = createRenderFn('register', 'Register');
export var register_finished = createRenderFn('register_finished', 'Register Finished');
export var login = createRenderFn('login', 'Login');
export var test = createRenderFn('test', 'Test');

/*export function index(req: express.Request, res: express.Response) {
    res.render('index', { title: 'Express' });
};*/