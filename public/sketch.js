/// <reference path="./p5.global-mode.d.ts" />

let socket;

let state = 0;

let username = "";

/** @type {Map.<string, User>} */
let users = new Map();

let colorTime = 0;

let pos = new Vector(0, 0);
let vel = new Vector(0, 0);

/** @type {p5.Element} */
let nameInput;

/** @type {p5.Element} */
let playButton;

let cnv;

function setup()
{
	cnv = createCanvas(windowWidth - 100, windowHeight - 100);
	cnv.position(50, 50);
	
	nameInput = createInput(username);
	nameInput.attribute('name', 'bla');
	nameInput.position(width/2 - 50, height/2 + 10);
	
	playButton = createButton("Play")
	playButton.class("button");
	playButton.position(width/2, height/2 + 50);
	playButton.mouseClicked(startGame);
	
	socket = io.connect();
	
	socket.on('users',
		data =>
		{
			data.forEach(
				s =>
				{
					users.set(s[0], new User(s[1].name, s[1].pos));
				}
			)
			
			console.log(users);
		}
	);
	
	socket.on('user',
		data =>
		{
			users.set(data.id, new User(data.user.name, data.user.pos));
			console.log(users);
		}
	);
	
	socket.on('userDelete',
		data =>
		{
			if(users.has(data))
				users.delete(data);
				
			console.log(users);
		}
	);
}

function startGame()
{
	state = 1;
	username = nameInput.value();
	
	socket.emit('play', {'name': username, 'pos': pos});
	users.set(socket.id, new User(username, pos));
	
	playButton.hide();
	nameInput.hide();
}

function mouseReleased()
{
	if(mouseButton !== LEFT) return;

	switch(state)
	{
		case 1:
			let _mPos = new Vector(width / 2 - mouseX, height / 2 - mouseY);
			_mPos.div(20);

			vel.add(_mPos);
			break;

	}
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
		
			ellipseMode(RADIUS);
			
			users.forEach(
				u =>
				{
					stroke(lerp3(127, 255, 138, _t), lerp3(255, 20, 43, _t), lerp3(0, 147, 226, _t));
					strokeWeight(5);
					
					let _x = pos.x - u.pos.x + width / 2;
					let _y = pos.y - u.pos.y + height / 2;
					
					fill(10);
					ellipse(_x, _y, u.size);
					
					stroke(0);
					strokeWeight(2);
					fill(255);
					
					textAlign(CENTER, TOP);
					text(u.name, _x, _y + u.size + 5);
				}
			)
			
			
			if(mouseIsPressed)
			{
				stroke(180);
				strokeWeight(3);
				
				line(width/2, height/2, mouseX, mouseY);
			}
		
			if(Math.abs(pos.x) > width) pos.x *= -1;
			if(Math.abs(pos.y) > height) pos.y *= -1;
			
			pos.add(vel);
			vel.mult(0.975);
			break;
	}
}