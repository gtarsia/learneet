var express = require('express');
var routes = require('./routes');
var path = require('path');
var server_ajax = require('./scripts/server/server-ajax');

var dbUser = require('./scripts/server/user');
var passport = require('passport');
var session = require('express-session');
var local = require('passport-local');
var LocalStrategy = local.Strategy;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var stylus = require('stylus');
var errorhandler = require('errorhandler');
var expressWinston = require('express-winston');
var winston = require('winston');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ resave: true, saveUninitialized: true, secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(function (username, password, done) {
    dbUser.auth({ username: username, password: password }).then(function (res) {
        if (!res.ok)
            done(null, false, { message: res.why });
        done(null, res.result);
    }).catch(function (err) {
        done(err);
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    dbUser.get(username).then(function (res) {
        done(null, res);
    }).catch(function (e) {
        done(e, null);
    });
});

if ('development' == app.get('env')) {
    app.use(errorhandler());
}
app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});
routes.set(app);

app.post('/api/auth', passport.authenticate('local', {}), function (req, res) {
    res.send({ ok: true, why: '' });
});
var ajaxList = server_ajax.getServerAjaxList();
ajaxList.forEach(function (ajax) {
    return ajax.setExpressAjax(app);
});
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});
//# sourceMappingURL=app.js.map
