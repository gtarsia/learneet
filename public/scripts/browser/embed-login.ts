import UserJs = require("./../common/User");
import utils = require("./Utils");

var gui = {
    getUsername: function (): string {
        return $("#username").val();
    },
    getPassword: function (): string {
        return $("#password").val();
    },
    warnInvalidLogin: function () {
        $("#warnings").html('Could not login');
    },
    cleanWarnings: function () {
        $("#warnings").html('');
    }
}

$(document).ready(function () {
    var classes = {
        User: UserJs.UserJs.User,
        Utils: utils.m
    };

    console.log("ready!");
    $("#login").click(() => {
        console.log('Loggueando');
        gui.cleanWarnings();
        var user = new classes.User();
        user.logIn(gui.getUsername(), gui.getPassword(), (err) => {
            if (err) {
                gui.warnInvalidLogin();
            }
            else {
                classes.Utils.redirect.to.index();
            }
        });
    });
})

