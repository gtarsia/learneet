var express = require('express');
var routes = require('./routes');
var path = require('path');
var server_ajax = require('./scripts/server/server-ajax');

var dbUser = require('./scripts/server/user');
var passport = require('passport');
var multer = require('multer');
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

var done = false;
app.use(multer({
    dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path);
        done = true;
    }
}));
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
    dbUser.get({ user: { username: username } }).then(function (res) {
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
app.post('/api/auth', passport.authenticate('local', {}), function (req, res) {
    res.redirect('/');
});
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
app.post('/api/photo', function (req, res) {
    if (done == true) {
        console.log(req.files);
        res.end("File uploaded.");
    }
});
routes.set(app);

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
