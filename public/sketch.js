/// <reference path="./p5.global-mode.d.ts" />

class Vector
{
	/**
	 * 
	 * @param {Number} x 
	 * @param {Number} y 
	 */
	
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
	}
	
	/**
	 * 
	 * @param {Number} x 
	 * @param {Number} y 
	 */
	set(x, y)
	{
		this.x = x;
		this.y = y;
	}
}

let socket;

let state = 0;

let username = "";

let pos = new Vector();
let size = 16;

/** @type {p5.Element} */
let nameInput;

/** @type {p5.Element} */
let playButton;

let cnv;

function setup()
{
	cnv = createCanvas(windowWidth - 100, windowHeight - 100);
	cnv.position(50, 50);
	
	pos.set(width/2, height/2);
	
	nameInput = createInput(username);
	nameInput.attribute('name', 'bla');
	nameInput.position(width/2 - 50, height/2 + 10);
	
	playButton = createButton("Play")
	playButton.class("button");
	playButton.position(width/2, height/2 + 50);
	playButton.mouseClicked(startGame);
	
	socket = io.connect();
}

function startGame()
{
	state = 1;
	username = nameInput.value();
	
	socket.emit('play', username);
	
	playButton.hide();
	nameInput.hide();
}

function draw()
{
	background(50);
	
	stroke(180);
	strokeWeight(2);
	
	let difx = pos.x % 96;
	
	for(let i = 0; i < width; i += 96)
	{
		
		line(i+difx, 0, i+difx, height);
	}
	
	let dify=pos.y%96;
	for(let j = 0; j < height; j += 96)
	{
		line(0, j+dify, width, j+dify);
	}
	
	switch(state)
	{
		case 0:
			noStroke();
			fill(255);
			
			rectMode(CENTER);
			rect(width/2, height/2, 300, 140);
			
			break;
		case 1:
			
			break;
	}
}