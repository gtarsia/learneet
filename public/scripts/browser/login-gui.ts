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
    console.log("ready!");
    $("#login").click(() => {
        console.log('Loggueando');
    });
})

