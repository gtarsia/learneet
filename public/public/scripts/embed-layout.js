var gui;

/*
var exports = {};
var customExports = {};

var require = function(importStr) {
	return exports;
};

function getScriptName() {
	var scripts = document.getElementsByTagName('script');
	var lastScript = scripts[scripts.length-1];
	var scriptName = lastScript.src;
	return scriptName.substr(scriptName.lastIndexOf('/') + 1);
}
*/

function startGui(gui) {
	$(document).ready(function () {
    	gui = new gui();
	});
}

var guiName = '';