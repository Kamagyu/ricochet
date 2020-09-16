/// <reference path="./p5.global-mode.d.ts" />

let socket;

let state = 0;
let username = "";

/** @type {p5.Element} */
let nameInput;

/** @type {p5.Element} */
let playButton;

let cnv;

function setup()
{
	cnv = createCanvas(windowWidth, windowHeight);
	
	nameInput = createInput(username);
	nameInput.attribute('name', 'bla');
	nameInput.position(width/2 - 100, height/2 - 40);
	
	playButton = createButton("Play")
	playButton.class("button");
	playButton.position(width / 2 - 50, height/2 + 20);
	
	socket = io.connect();
}

function draw()
{
	background(230);
	
	noStroke();
	fill(255);
	
	rectMode(CENTER);
	rect(width/2, height/2, 300, 150);
}