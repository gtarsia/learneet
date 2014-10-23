var UserJs = require("./../common/User");
var utils = require("./Utils");
 
var gui = { 
    getUsername: function () {
        return $("#username").val();
    },
    getPassword: function () {
        return $("#password").val();
    },
    warnInvalidLogin: function () {
        $("#warnings").html('Could not login');
    },
    cleanWarnings: function () {
        $("#warnings").html('');
    }
};

$(document).ready(function () {
    var classes = {
        User: UserJs.UserJs.User,
        Utils: utils.m
    };

    console.log("ready!");
    $("#login").click(function () {
        console.log('Loggueando');
        gui.cleanWarnings();
        var user = new classes.User();
        user.logIn(gui.getUsername(), gui.getPassword(), function (err) {
            if (err) {
                gui.warnInvalidLogin();
            } else {
                classes.Utils.redirect.to.index();
            }
        });
    });
});
//# sourceMappingURL=embed-login.js.map
