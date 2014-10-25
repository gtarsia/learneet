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
    console.log("ready!");
    $("#login").click(function () {
        console.log('Loggueando');
    });
});
//# sourceMappingURL=out.js.map
