export module m {
    function _redirect(url: string) {
        throw new Error('Not Implemented Exception');
    }
    export var redirect = {
        to: {
            index: function () {
                _redirect('/index');
            }
        }
    }
}