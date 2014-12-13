//THIS IS AN EXAMPLE OF A STARTING POINT

include('js/BlindedByRage.js');

var engine;

var FRAMERATE = 1000/30;
var lastLoop = new Date().getTime();
window.onload = init;

function init() {
	engine = new BlindedByRage('engine-container', false, true);
	engine.init();
	loop();
}

function loop() {
	var newLoop = new Date().getTime();
	interval = newLoop - lastLoop;
	engine.loop(interval);
	
	lastLoop = new Date().getTime();
	setTimeout(loop, FRAMERATE);
}