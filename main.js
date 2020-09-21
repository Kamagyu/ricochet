const PORT = 8080 || process.env.port;

const express = require('express');

let app = express();
let server = app.listen(PORT);

app.use(express.static('public'));

let io = require('socket.io').listen(server);

let {User, Reflector} = require('./module.js');

/** @type {Map.<string, User>} */
let users = new Map();

/** @type {Reflector[]} */
let reflectors = [];

//Creates randomly places reflectors
for(let i = 0; i < 100; i++)
{
	reflectors.push( new Reflector((Math.random()-.5)*1400, (Math.random()-.5)*1400) );
}

console.log("Server loaded!");

io.sockets.on('connection',
	(socket) =>
	{
		
		socket.on('play',
			data =>
			{
				//Transform the map to an array
				socket.emit('users', Array.from(users));
				
				//Add the new user to the list
				users.set(socket.id, new User(data.name, data.pos));
				
				//Emit it to the other users
				socket.broadcast.emit('user', {'id': socket.id, 'user': users.get(socket.id)});
				
				//Emit the reflectors to the user
				socket.emit('reflectors', reflectors);
			}
		);
		
		socket.on('disconnect',
			() =>
			{
				socket.broadcast.emit('userDelete', socket.id);
				if(users.has(socket.id))
					users.delete(socket.id);
			}
		);
	}
);