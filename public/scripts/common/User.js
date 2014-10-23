(function (UserJs) {
    var User = (function () {
        function User() {
        }
        User.prototype.logIn = function (username, password, fn) {
            console.log('Loggueando al usuario: ' + username + ', password: ' + password);
            fn(new Error('Not Implemented Exception'));
        };
        User.prototype.isLogged = function () {
            throw new Error('Not implemented');
        };
        return User;
    })();
    UserJs.User = User;
})(exports.UserJs || (exports.UserJs = {}));
var UserJs = exports.UserJs;
//# sourceMappingURL=User.js.map
