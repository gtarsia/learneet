function createRenderFn(url, title, fn) {
    return function (req, res) {
        if (fn != null) {
            fn(req, res);
        }
        res.render(url, { title: title });
    };
}

exports.index = createRenderFn('index', 'Express');
exports.browse = createRenderFn('browse', 'Browse');
exports.create_article = createRenderFn('create_article', 'Create Article');
exports.edit_article = createRenderFn('edit_article', 'Edit Article');
exports.article = createRenderFn('article', 'Article');
exports.register = createRenderFn('register', 'Register');
exports.register_finished = createRenderFn('register_finished', 'Register Finished');
exports.login = createRenderFn('login', 'Login');
exports.test = createRenderFn('test', 'Test');
//# sourceMappingURL=index.js.map
