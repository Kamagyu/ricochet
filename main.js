const PORT = 8080 || process.env.port;

const express = require('express');

let app = express();
let server = app.listen(PORT);

app.use(express.static('public'));

let io = require('socket.io').listen(server);

import {User, Reflector, Vector} from './public/depend.js';

let users = {};

let reflectors = [];

for(i = 0; i < 100; i++)
{
	reflectors.push( new Reflector((Math.random()-.5)*1400, (Math.random()-.5)*1400) );
}

io.sockets.on('connection',
	(socket) =>
	{
		//socket.emit('reflectors', reflectors);
		
		socket.on('play',
			data =>
			{
				users[socket.id] = new User(data.name, data.pos);
				
				socket.broadcast.emit('user', {id: socket.id, name: data.name, pos: data.pos});
			}
		);
		
		socket.on('disconnect',
			() =>
			{
				if(users[socket.id])
				{
					delete users[socket.id];
				}
			}
		);
	}
);