import express = require('express');
import routes = require('./routes/index');
import user = require('./routes/user');
import path = require('path');
import server_ajax = require('./scripts/server/server-ajax');
import net = require('net');
var morgan : any = require('morgan');
var bodyParser : any = require('body-parser');
var app : any = express();
import stylus = require('stylus');
var errorhandler : any = require('errorhandler');
var expressWinston : any = require('express-winston');
var winston : any = require('winston'); // for transports.Console
 
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); 
app.use(morgan('tiny'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorhandler());
    app.get('/test', routes.test);
}

app.get('/', routes.index);
app.get('/browse', routes.browse);
app.get('/articles/:id', routes.article);
app.get('/create_article', routes.create_article);
app.get('/edit_article', routes.edit_article);
app.get('/login', routes.login);
app.get('/register', routes.register);
app.get('/register_finished', routes.register_finished);
app.get('/users', user.list);

var ajaxList = server_ajax.getServerAjaxList();
ajaxList.forEach(ajax => ajax.setExpressAjax(app));
/*
app.post('/api/create_article', function (req, res, next) {
    server_ajax.Article.Create(req.params, function (err) {
        if (err) {
            throw err;
        }
    });
});
*/
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
return;
//db.setConnectionConfig({});
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});
/*
db.connect((err, client) => {
    expect(err).to.not.eql(null);
});
*/