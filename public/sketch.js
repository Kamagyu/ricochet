/// <reference path="./p5.global-mode.d.ts" />

import {Reflector, User, Vector, lerp3} from './depend.js';

let socket;

let state = 0;

let username = "";

/** @type {Object.<string, User>} */
let users = {};

let colorTime = 0;

let pos = new Vector();
let vel = new Vector(0, 0);
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
	
	pos.set(Math.random()*width, Math.random()*height);
	
	nameInput = createInput(username);
	nameInput.attribute('name', 'bla');
	nameInput.position(width/2 - 50, height/2 + 10);
	
	playButton = createButton("Play")
	playButton.class("button");
	playButton.position(width/2, height/2 + 50);
	playButton.mouseClicked(startGame);
	
	socket = io.connect();
	
	socket.on('user',
		data =>
		{
			users[data.id] = new User(data.name, data.pos);
		}
	);
}

function startGame()
{
	state = 1;
	username = nameInput.value();
	
	socket.emit('play', {name: username, pos: pos});
	users[socket.id] = new User(username, pos);
	
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
	
	let dify = pos.y % 96;
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
			//Colors : #7FFF00 #FF1493 #8A2BE2  127,255,0 255,20,147 138,43,226
			
			colorTime += 0.01;
			let _t = sin(colorTime);
			
			for(let u of users)
			{
				stroke(lerp3(127, 255, 138, _t), lerp3(255, 20, 43, _t), lerp3(0, 147, 226, _t));
				strokeWeight(5);

				fill(10);
				ellipse(pos.x, height / 2, size);
			}
			
			
			
			// beginShape();
			// for(i = 0; i < 30; i++)
			// {
			// 	let _rad = radians(i*12);
			// 	let _h = size + (Math.random()-.5)*3;
				
			// 	vertex(width / 2 + cos(_rad) * _h, height / 2 + sin(_rad) * _h);
			// }
			// endShape()
			
			if(mouseIsPressed)
			{
				stroke(180);
				strokeWeight(3);
				
				line(width/2, height/2, mouseX, mouseY);
			}
			
			pos.add(vel);
			vel.mult(0.975);
			break;
	}
}

function mouseReleased()
{
	let _mPos = new Vector(width/2 - mouseX, height/2 - mouseY);
	_mPos.div(20);
	
	vel.add(_mPos);
}