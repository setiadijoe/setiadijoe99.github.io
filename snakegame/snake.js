// setting of the game
var snakeX	= 2;
var snakeY	= 2;
var height	= 30;
var width 	= 30;
var interval = 100;
var increment = 1;

// variables of the game
var length = 0;
var tailX = [snakeX];
var tailY = [snakeY];
var fX;
var fY;
var running = false;
var gameover = false;
var direction = -1 ;// up = 0. down = -1, left = 1, right = 2
var int;

// Entry point of the game
function run() {
	init();
	int = setInterval(gameloop, interval);
}

function init() {
	createMap();
	createSnake();
	createFood();
}

// Genenrate the map of snake

function createMap() {
	document.write('<table>');
	for ( y = 0; y < height; y++) {
		document.write('<tr>');
		for( x = 0; x <width; x++) {
			if (x === 0|| x === width-1 || y === 0 || y === height-1) {
				document.write("<td class='wall' id='"+x+"-"+y+"'></td>");	
			} else {
				document.write("<td class='blank' id='"+x+"-"+y+"'></td>");
			}
		}
		document.write('</tr>');
	}
	document.write('</table>');
}

function createSnake() {
	set(snakeX, snakeY, 'snake');
}

function get(x, y){
	return document.getElementById(x+"-"+y);
}

function set(x, y, value) { 
	if (x !== null && y !== null)
		get(x,y).setAttribute('class', value);
}

function rand(min, max) {
	return Math.floor(Math.random()*(max-min)+min);
}

function getType(x, y) {
	return get(x, y).getAttribute('class');
}

function createFood() {
	var found = false;
	while(!found && (length < (width-2)*(height-2)+1)) {
		var foodX = rand(1, width-1);
		var foodY = rand(1, height-1);
		if (getType(foodX, foodY) === 'blank')
			found = true;
	}
	set(foodX, foodY, 'food');
	fX = foodX;
	fy = foodY; 
}

window.addEventListener('keypress', function key() {
	//if key is W set direction up
	var key = event.keyCode;
	if (direction != -1 && (key === 119 || key === 87)){
		direction = 0;
	}
	// if key is S set direction down;
	else if (direction != 0 && (key === 115 || key === 83)){
		direction = -1;
	}
	// if key is A set direction left
	else if (direction != 1 && (key === 97 || key ===65)){
		direction = 1;
	}
	// if key is D set direction left
	else if (direction != 2 && (key === 100 || key ===68)){
		direction = 2;
	}

	if(!running){
		running = true;
	}
	else if (key === 32){
		running = false;
	}
});

function gameloop() {
	if (running && !gameover) {
		update();
	}else if(gameover){
		clearInterval(int);
	}
}

function update() {
	set(fX, fY, 'food');
	updateTail();
	set(tailX[length], tailY[length], 'blank');
	if (direction === 0) 
		snakeY --;
	else if (direction === -1)
		snakeY ++;
	else if (direction === 1)
		snakeX --;
	else if (direction === 2)
		snakeX ++;
	set(snakeX, snakeY, 'snake');
}

function updateTail() {
	for (var i = length; i > 0; i--){
		tailX[i] = tailX[i-1];
		tailY[i] = tailY[i-1];
	}
	tailX[0] = snakeX;
	tailY[0] = snakeY;
}

run();