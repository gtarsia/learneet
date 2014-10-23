(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ClientAjax = require("./client-ajax");

var Gui = (function () {
    function Gui() {
        var href = $(location).attr("href");
        var id = href.substr(href.lastIndexOf('/') + 1);
        new ClientAjax.Article.Get().ajax({ id: parseInt(id) }).done(function () {
            console.log('Success');
        });
    }
    Gui.prototype.getContent = function () {
        return $("#content").val();
    };
    Gui.prototype.getTitle = function () {
        throw new Error('Not implemented yet');
    };
    return Gui;
})();

$(document).ready(function () {
    var gui = new Gui();
    console.log("ready!");
});
//# sourceMappingURL=embed-article.js.map

},{"./client-ajax":"/client-ajax.js"}]},{},[1]);
