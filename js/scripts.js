var canvas = null, ctx = null;
var x = 50;
var y = 50;
var dir = 0;
var pause = true;
var lastPress = null;
var KEY_ENTER = 13,
	KEY_LEFT = 65,
	KEY_UP = 87,
	KEY_RIGHT = 68,
	KEY_DOWN = 83;

window.requestAnimationFrame = (function () { 
	return window.requestAnimationFrame || 
	window.mozRequestAnimationFrame || 
	window.webkitRequestAnimationFrame || 
	function (callback) { 
		window.setTimeout(callback, 17); 
	}; 
}());


document.addEventListener('keydown', function (evt) {
	lastPress = evt.which;
}, false);

function paint(ctx) { 

	ctx.fillStyle = '#000'; 
 	ctx.fillRect(0, 0, canvas.width, canvas.height); 

 	ctx.fillStyle = '#0f0'; 
 	ctx.fillRect(x, y, 10, 10);

 	ctx.fillStyle = '#fff';
 	// ctx.fillText('Last Press: ' + lastPress, 0, 20); // PARA SABER QUE TECLA SE PULSÓ POR ÚLTIMA VEZ 
 	
 	// DIBUJAR EL BOTÓN PAUSA
 	if (pause) {
 		ctx.textAlign = 'center';
 		ctx.fillText = ('PAUSE', 150, 75);
 		ctx.textAlign = 'left';
 	}
} 

function act() {
	// CONDICIONAL: SI EL JUEGO NO ESTÁ EN PAUSA
	if (!pause) {
		// CAMBIAR LA DIRECCIÓN
		if (lastPress == KEY_UP) {
			dir = 0;
		}
		if (lastPress == KEY_RIGHT) {
			dir = 1;
		}
		if (lastPress == KEY_DOWN) {
			dir = 2;
		}
		if (lastPress == KEY_LEFT) {
			dir = 3;
		}
		// MOVER RECTÁNGULO
		if (dir == 0) {
			y -= 10;
		}
		if (dir == 1) {
			x += 10;
		}
		if (dir == 2) {
			y += 10;
		}
		if (dir == 3) {
			x -= 10;
		}
		// SI EL RECTÁNGULO SE SALE DE LA PANTALLA LO DEVOLVEMOS A LA MISMA
		if (x > canvas.width) {
			x = 0;
		}
		if (y > canvas.height) {
			y = 0;
		}
		if (x < 0) {
			x = canvas.width;
		}
		if (y < 0) {
			y = canvas.height;
		}
	}

	// PAUSAR / REANUDAR
	if (lastPress == KEY_ENTER) {
		pause = !pause;
		lastPress = null;
	}
}

function repaint() {
	window.requestAnimationFrame(repaint);
	paint(ctx);
}

function run() {
	//window.requestAnimationFrame(run);
	setTimeout(run, 50);
	act();
}

function init() { 
	canvas = document.getElementById('canvas'); 
	ctx = canvas.getContext('2d'); 
	// INICIAR EL JUEGO
	run();
	repaint(); 
} 

window.addEventListener('load', init, false);