/*
 * GET home page.
 */
import url = require('./../scripts/common/url');
import express = require('express');

function renderCb(url: string, title: string, 
	fn? : (req: express.Request, res: express.Response) => void) {
    return function (req: express.Request, res: express.Response) {
    	if (fn != null) {
    		fn(req, res);	
    	}
        res.render(url, { title: title });
    };
}

export function set(app) {
    app.get('/', renderCb('index', 'Express'));
    app.get('/browse', renderCb('browse', 'Browse'));
    app.get(url.article.get(), renderCb('article', 'Article'));
    app.get(url.article.create(), renderCb('create_article', 'Create Article'));
    app.get(url.article.edit(), renderCb('edit_article', 'Edit Article'));
    app.get('/login', renderCb('login', 'Login'));
    app.get('/register', renderCb('register', 'Register'));
    app.get('/register_finished', renderCb('register_finished', 'Register Finished'));
}

/*export function index(req: express.Request, res: express.Response) {
    res.render('index', { title: 'Express' });
};*/