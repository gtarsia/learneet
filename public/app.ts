import express = require('express');
import routes = require('./routes/routes');
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
}

routes.set(app);

var ajaxList = server_ajax.getServerAjaxList();
ajaxList.forEach(ajax => ajax.setExpressAjax(app));
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});
